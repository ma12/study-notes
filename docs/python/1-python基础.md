# Python 基础入门

## 一、Python 是什么

Python 是一门**解释型、高级、通用编程语言**，语法简洁，适合新手入门。

## 二、环境搭建

### 1. 安装 Python

从 [Python 官网](https://www.python.org/) 下载安装包，安装时勾选 **Add Python to PATH**。

验证安装：

```bash
python --version
pip --version
```

### 2. 推荐编辑器

- **VS Code**：轻量，插件丰富
- **PyCharm**：专业 Python IDE

## 三、基础语法

### 变量与数据类型

```python
# 整数
age = 20

# 浮点数
price = 9.99

# 字符串
name = "张三"

# 布尔值
is_student = True

# 列表
fruits = ["apple", "banana", "orange"]

# 字典
person = {"name": "张三", "age": 20}
```

### 条件判断

```python
score = 85

if score >= 90:
    print("优秀")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

### 循环

```python
# for 循环
for i in range(5):
    print(i)  # 输出 0,1,2,3,4

# while 循环
count = 0
while count < 3:
    print(count)
    count += 1
```

### 函数

```python
def add(a, b):
    """两个数相加"""
    return a + b

result = add(3, 5)
print(result)  # 8
```

## 四、常用数据结构操作

### 列表操作

```python
nums = [1, 2, 3, 4, 5]

# 追加
nums.append(6)

# 切片
print(nums[1:3])  # [2, 3]

# 列表推导式
squares = [x**2 for x in nums]
print(squares)  # [1, 4, 9, 16, 25, 36]
```

### 字典操作

```python
student = {"name": "小明", "score": 90}

# 访问
print(student["name"])  # 小明

# 遍历
for key, value in student.items():
    print(f"{key}: {value}")
```

## 五、文件操作

```python
# 写入文件
with open("test.txt", "w", encoding="utf-8") as f:
    f.write("Hello, Python!")

# 读取文件
with open("test.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)
```

## 六、学习建议

1. **多写代码**：光看不练等于没学
2. **做小项目**：用项目驱动学习
3. **查官方文档**：[Python 官方文档](https://docs.python.org/zh-cn/3/)
4. **善用搜索引擎**：遇到报错先搜索

---

> 持续更新中...
