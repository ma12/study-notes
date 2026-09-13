# Day 01 - Python / HTTP / API 基础

> 学习日期：2026-09-13
> 所属路线：AI Security 24周就业路线 · Week 01
> 学习目标：理解 Python 如何发送 HTTP 请求，掌握 API、HTTP、JSON 的基本关系，并开始建立安全测试思维。

---

## 一、Day01 学习目标

Day01 主要学习：

- Python 基础
- HTTP 基础
- GET / POST
- HTTP Request / Response
- Status Code
- Content-Type
- JSON
- API 基础
- 客户端可控数据
- 认证与授权
- 401 / 403
- 基础越权安全思维

核心学习原则：

> **先理解正常请求 → 再理解客户端能控制什么 → 最后思考服务器是否正确验证。**

---

## 二、HTTP、API、JSON 的关系

```text
Python程序
    ↓
HTTP请求
    ↓
API
    ↓
服务器
    ↓
JSON响应
    ↓
Python程序
```

三个概念不要混淆：

| 概念 | 含义 |
|---|---|
| HTTP | 客户端和服务器进行通信的一种协议 |
| API | 服务器对外提供的接口/功能 |
| JSON | 一种常用于 API 请求和响应的数据交换格式 |

> **API ≠ 端口**

---

## 三、HTTP Request 请求结构

```text
HTTP Request
│
├── Method
├── URL
├── Query Parameters
├── Headers
├── Cookie（如果有）
└── Body（如果有）
```

例如：

```http
POST /api/user?id=123 HTTP/1.1
Content-Type: application/json
Authorization: Bearer xxx

{
    "name": "Tom"
}
```

- `POST` → Method
- `/api/user` → URL 路径
- `id=123` → Query 参数
- `Content-Type` → Header
- `Authorization` → Header
- `{...}` → Request Body

---

## 四、HTTP Response 响应

```text
HTTP Response
│
├── Status Code
├── Headers
└── Body
```

例如：

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": 1,
    "name": "Tom"
}
```

- `200` → Status Code
- `Content-Type` → Response Header
- `{...}` → Response Body

---

## 五、Status Code

| 状态码 | 含义 |
|---|---|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求错误 |
| 401 | 未认证 |
| 403 | 已认证但没有权限 |
| 404 | 资源不存在 |
| 429 | 请求过多/触发限流 |
| 500 | 服务器内部错误 |

### 401 vs 403

- **401** → 当前请求没有通过身份认证
- **403** → 身份已经被识别/认证，但是没有权限执行这个操作

安全测试中：

```text
401 → 重点观察认证是否存在/是否正确
403 → 重点观察权限控制是否正确
```

---

## 六、Content-Type

`Content-Type` 是 HTTP Header，用于告诉接收方当前数据是什么类型。

例如：

```http
Content-Type: application/json
```

表示数据是 JSON。

常见类型：

```text
application/json
text/html
text/plain
image/png
application/xml
```

Python 中：

```python
response.headers.get("Content-Type")
```

---

## 七、GET 和 POST

### GET

通常用于获取数据：

```http
GET /users/1
```

### POST

通常用于向服务器提交数据、创建资源或触发某种操作：

```http
POST /users
```

请求体：

```json
{
    "name": "Tom"
}
```

---

## 八、JSON

JSON 是一种数据交换格式。

Python：

```python
data = {
    "name": "Tom",
    "age": 20
}
```

JSON：

```json
{
    "name": "Tom",
    "age": 20
}
```

API 经常使用 JSON 来传递：

- 请求数据
- 响应数据

因此：

```text
Python
  ↓
数据
  ↓
JSON
  ↓
HTTP/API
  ↓
服务器
```

> JSON 不是"连接 API 的端口"。

更准确的理解：

> **API 是通信接口，HTTP 是通信协议，JSON 是经常用于传输的数据格式。**

---

## 九、Day01 Python GET 实验

使用 VS Code：

```python
import requests

url = "https://jsonplaceholder.typicode.com/users/1"

response = requests.get(url)

print("状态码：", response.status_code)
print("Content-Type：", response.headers.get("Content-Type"))
print("响应内容：")
print(response.json())
```

实验结果：

```text
状态码：200
Content-Type：application/json; charset=utf-8
响应内容：
{
    ...
}
```

---

## 十、为什么 API 返回这么多数据？

API 返回的 JSON 可能包含：

```json
{
    "id": 1,
    "name": "...",
    "username": "...",
    "email": "...",
    "address": {
        "street": "...",
        "city": "...",
        "zipcode": "..."
    },
    "phone": "...",
    "website": "...",
    "company": {
        "name": "..."
    }
}
```

安全上需要开始思考：

> **服务器到底返回了哪些数据？有没有返回用户本来不应该看到的数据？**

---

## 十一、客户端可控数据

安全测试中非常重要：

> **凡是客户端能够提交给服务器的数据，都不能默认相信。**

客户端可能控制：

- URL
- URL 路径参数
- Query 参数
- Request Body
- 部分 Headers
- Cookie
- HTTP Method

例如：

```http
POST /api/user
Content-Type: application/json

{
    "username": "test",
    "role": "admin"
}
```

这里：

- `username` → 客户端提交
- `role` → 客户端提交
- `Content-Type` → 请求头
- `200/401/403` → 服务器返回
- Response Body → 服务器返回

---

## 十二、为什么不能相信 role=admin？

假设 API 接收：

```json
{
    "username": "test",
    "role": "admin"
}
```

如果服务器直接：

```python
if role == "admin":
    give_admin_permission()
```

攻击者可能修改请求中的 `role`，导致：

- 权限提升
- 越权
- 敏感数据泄露
- 未授权操作

真正的问题是：

> **服务器错误地相信了客户端提交的权限信息。**

记住：

> **客户端说自己是管理员，不代表他真的拥有管理员权限。**

---

## 十三、为什么不能只看前端页面？

前端页面只是 API 的一个调用者。

例如网页上有：

```text
[查看我的订单]
```

实际可能发送：

```http
GET /api/orders/1001
```

安全测试需要观察真实 HTTP 请求。

在**自己拥有或明确授权的测试环境**中，可以观察修改对象 ID 后服务器是否正确进行权限检查。

核心思想：

> **安全测试不能只看前端按钮和页面，还要看真实 HTTP 请求以及服务器实际返回的结果。**

---

## 十四、BOLA 安全思维

BOLA：

```text
Broken Object Level Authorization
```

中文通常称：

> 对象级授权失效

简单理解：

```text
用户 A
  ↓
请求自己的对象
  ↓
/api/orders/1001
```

如果在授权测试环境中把对象 ID 改成另一个对象：

```text
/api/orders/1002
```

服务器却没有检查当前用户是否有权限访问 `1002`，就可能存在对象级授权问题。

核心问题：

> **服务器有没有检查"这个用户是否真的有权限访问这个对象"？**

---

## 十五、为什么 AI Security 必须学习 API？

典型 AI 应用：

```text
用户
 ↓
前端
 ↓
HTTP/API
 ↓
AI 后端
 ├── LLM
 ├── 数据库
 ├── RAG
 ├── Agent
 └── 外部工具
```

AI Security 中很多问题都会涉及：

```text
HTTP
API
JSON
Headers
Authentication
Authorization
Request
Response
```

后续学习：

- Prompt Injection
- RAG Security
- Agent Security
- MCP Security
- API Security
- AI Red Team

都需要这些基础。

因此：

> **Day01 学的 API 是 AI Security 的基础，不是与 AI 无关的杂项。**

---

## 十六、Day01 安全观察复盘

### 1. 哪些数据来自用户输入？

正确理解：

> URL 参数、Query 参数、Headers、Cookie、Request Body 等客户端提交的数据，都可能受到客户端控制。

而：

```text
Status Code
Response Body
Response Fields
```

属于服务器返回的数据。

### 2. 哪些字段是客户端可控的？

通常包括：

```text
HTTP Method
URL
Query Parameters
Headers
Cookie
Request Body
```

具体哪些字段可以修改，要根据实际应用判断。

### 3. 如果服务端直接信任 role=admin，会有什么风险？

> 攻击者可能修改客户端提交的 role 字段，从而获得本不应该拥有的权限，导致权限提升、越权、敏感数据泄露或未授权操作。

### 4. 401 和 403 为什么重要？

```text
401 → 未认证
403 → 已认证/已识别身份，但没有权限
```

可以帮助判断：

> 身份认证和权限控制是否正常工作。

### 5. 为什么不能只看前端页面？

因为：

> 前端只是 API 的一个调用者，真正的数据处理和权限判断通常发生在后端。

所以安全测试需要观察：

```text
真实 HTTP Request
        ↓
服务器处理
        ↓
真实 HTTP Response
```

---

## 十七、Day01 今日复盘题

### 1. HTTP 请求由哪些主要部分组成？

```text
Method
URL
Query Parameters
Headers
Cookie（如果有）
Body（如果有）
```

### 2. GET 和 POST 的主要用途有什么不同？

> GET 通常用于获取数据，POST 通常用于向服务器提交数据、创建资源或触发某种操作。

### 3. JSON 在 API 中扮演什么角色？

> JSON 是一种数据交换格式，经常用于 API 的 Request Body 和 Response Body。

### 4. 401 与 403 的区别是什么？

```text
401 → 未认证
403 → 已认证但没有权限
```

### 5. 如果 API 接收 `{"role": "admin"}`，为什么不能直接相信？

> 因为这个字段可能由客户端控制，攻击者可以修改它。如果服务器直接相信，就可能导致权限提升或越权。

### 6. 为什么 AI Security 学习必须先掌握 API？

> AI 应用大量依赖 API 进行用户输入、模型调用、数据库访问、RAG、Agent 和工具调用。安全测试时需要理解和分析真实 HTTP/API 请求，因此 API 是学习 AI Security 的重要基础。

---

## 十八、Day01 最重要的安全思维

```text
看到一个 API
      ↓
谁发起请求？
      ↓
客户端能控制什么？
      ↓
服务器接收到什么？
      ↓
服务器有没有验证？
      ↓
服务器相信了哪些客户端数据？
      ↓
返回了什么？
      ↓
有没有越权 / 数据泄露 / 未授权操作？
```

最终形成一个核心问题：

> **"客户端能控制什么？服务器有没有正确验证？"**

---

## 十九、Day01 当前完成情况

| 知识点 | 状态 |
|---|---|
| Python requests | ✅ |
| GET 请求 | ✅ |
| POST 基础概念 | 🟡 |
| HTTP Request | 🟡 |
| HTTP Response | 🟢 |
| Status Code | 🟢 |
| Content-Type | 🟢 |
| JSON | 🟡 |
| API 基础 | 🟡 |
| 401 / 403 | 🟢 |
| 客户端可控数据 | 🟡 |
| BOLA 基础思维 | 🟡 |
| AI Security 与 API 的关系 | 🟡 |

> 🟢 = 基本掌握
> 🟡 = 已理解，但需要通过实验巩固

---

## 二十、Day01 下一步：Task C

Day01 还没有正式结束。

接下来完成 **Task C：POST 实验**。

实验目标：

```text
Python
  ↓
POST
  ↓
https://httpbin.org/post
  ↓
发送 JSON
  ↓
观察服务器返回的数据
```

请求体：

```json
{
    "message": "day1",
    "purpose": "learning"
}
```

Python：

```python
import requests

url = "https://httpbin.org/post"

data = {
    "message": "day1",
    "purpose": "learning"
}

response = requests.post(url, json=data)

print("请求方法：POST")
print("请求体：", data)
print("响应状态码：", response.status_code)
print("响应内容：")
print(response.json())
```

需要重点观察：

```text
1. 请求方法
2. 请求体
3. 状态码
4. 返回 JSON
5. json 字段
6. data 字段
7. headers
8. url
```

---

## Day01 结论

Day01 的核心不是"学会写一个 requests 程序"。

真正需要建立的是：

> **客户端 → HTTP → API → 服务器 → Response**

以及安全思维：

> **客户端提交的数据不可信，服务器必须进行身份、权限和数据校验。**

这套思维将贯穿后面的：

```text
API Security
      ↓
Prompt Injection
      ↓
RAG Security
      ↓
Agent Security
      ↓
MCP Security
      ↓
AI Red Team
```

**Day01 未完成前，不进入 Day02。**

---

## 📎 参考资料与附件

- 微信公众号文章：[AI Security 学习路线相关](https://mp.weixin.qq.com/s/3tPOU6nA5-pcM8-v2qDlKg)
- JSONPlaceholder 测试 API：https://jsonplaceholder.typicode.com/
- httpbin 请求测试工具：https://httpbin.org/
- OWASP API Security Top 10：https://owasp.org/www-project-api-security/

> 注：微信公众号文章因平台限制无法自动抓取全文，可点击链接在微信中查看完整内容。
