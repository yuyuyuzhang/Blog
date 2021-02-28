# 十三、表单 API

## 1. 表单

表单用来收集用户提交的数据发送到服务器，每个表单控件都会生成一个`键值对`，键名是控件的 `name` 属性，键值是控件的 `value` 属性，键名和键值之间通过`等号`连接，例如 userName=张三，键值如果不是 `URL 合法字符`，提交时浏览器会自动对其进行`编码`

```html
<form action="" method="post">
  <div>
    <label for="name">用户名：</label>
    <input type="text" id="name" name="userName" />
  </div>
  <div>
    <label for="password">密码</label>
    <input type="text" id="password" name="userPassword" />
  </div>
  <button id="submitBtn">提交</button>
</form>
```

* **GET**：所有键值对都以 `URL 查询字符串`的形式提交到服务器

  ```http
  GET /handling-page?userName=张三&userPassword=123
  Host: example.com
  ```

* **POST**：所有键值对`连成一行作为 HTTP 请求的数据体`发送到服务器

  ```http
  POST /handling-page HTTP/1.1
  Host: example.com
  Content-Type: application/x-www-form-urlencoded
  Content-Length: 74

  userName=张三&userPassword=123
  ```

## 2. 表单控件

## 3. FormData 对象

`浏览器自动`将表单数据以`键值对`的形式发送到服务器，但是有时候我们希望通过 `JS 脚本`构造或编辑表单的键值对，然后通过 JS 脚本发送到服务器，浏览器原生提供了 FormData 对象完成这项工作

FormData 构造函数的参数是一个 DOM 的 `form 元素`，浏览器会自动处理表单的键值对，如果参数为空代表一个空表单

```javascript
定义：const formData = new FormData(form)
方法：formData.has(key)          //返回布尔值,是否存在键名key
     formData.get(key)          //返回第一个键名key对应的键值字符串
     formData.getAll(key)       //返回所有键名key对应的键值数组
     formData.set(key,value)    //无返回值,删除同名键值对后设置键名key对应的键值为value,键名不存在则添加
     formData.append(key,value) //无返回值,表单最后添加一个键值对key,value
     formData.delete(key)       //无返回值,删除所有键名key对应的键值对
     遍历器方法
     formData.keys()            //返回键名的遍历器对象
     formData.values()          //返回键值的遍历器对象
     formData.entries()         //返回键值对的遍历器对象
```

```javascript
const formData = new FormData()
formData.set('userName', '张三')
formData.append('userName', '李四')
formData.set('userPassword', 123456)

console.log(formData.get('userName'))    //'张三'
console.log(formData.getAll('userName')) //Array ['张三', '李四']

//删除同名键值对后设置键名key对应的键值为value,键名不存在则添加
formData.set('userName', '王五') 
console.log(formData.getAll('userName')) //Array ['王五']

for(let item of formData.entries()){
  console.log(item) //Array ["userName", "王五"]  Array ["userPassword", "123456"]
}   
```

## 4. 表单内置验证

### (1) 自动校验

浏览器允许开发者指定一些条件，表单提交时浏览器会自动验证各个表单控件的值是否符合条件

```html
<!-- 必填 -->
<input required>

<!-- 必须符合正则表达式 -->
<input pattern="banana|cherry">

<!-- 字符串长度必须为 6 个字符 -->
<input minlength="6" maxlength="6">

<!-- 数值必须在 1 到 10 之间 -->
<input type="number" min="1" max="10">

<!-- 必须填入 Email 地址 -->
<input type="email">

<!-- 必须填入 URL -->
<input type="URL">
```

通过 `:valid :invalid` CSS 伪类控制表单控件是否通过校验时的样式

```css
input,
input:valid {
    border-color: #ccc;
}

input:invalid {
    border-color: red;
}
```

### (2) 手动校验

还可以通过表单控件和表单元素的 `checkValidity()` 方法手动触发校验

```javascript
//触发单个表单控件的校验
formControl.checkValidity() 

//触发整个表单的校验
form.checkValidity()
```

提交表单可以封装成以下函数

```javascript
function submitForm(action) {
  const form = document.getElementById('form');
  form.action = action;
  if (form.checkValidity()) {
    form.submit();
  }
}
```

### (3) 定制校验信息

表单控件的 `setCustomValidity()` 方法用来在该控件的 `invalid 事件回调函数`中定制该控件校验失败时`浏览器显示的提示信息`

```html
<form>
  <div>
    <label for="name">用户名：</label>
    <input type="text" id="name" name="userName" required />
  </div>
  <div>
    <label for="password">密码</label>
    <input type="number" id="password" name="userPassword" minlength="6" maxlength="6" />
  </div>
</form>
<button id="submitBtn">提交</button>
```

```css
input,
input:valid {
    border-color: #ccc;
}

input:invalid {
    border-color: red;
}
```

```javascript
const name = document.getElementById('name')
name.addEventListener('invalid', function(e){
  event.target.setCustomValidity('hahah ');
  console.log(e.target.validationMessage)
})
```

## 5. 表单编码

表单元素的 `enctype` 属性决定`表单数据的编码格式`，表单可以通过以下 4 种编码向服务器提交数据

### (1) GET

如果表单使用 `GET` 方法发送数据，enctype 属性无效，表单数据始终以 `URL 查询字符串`格式提交到服务器

```html
<form action="register.php" method="get"></form>
```

```html
<!-- URL 查询字符串 -->
register.php?foo=bar&baz=The%20first%20line
```

### (2) application/x-www-form-urlencoded

如果表单使用 `POST` 方法发送数据，并且省略 enctype 属性，表单数据以 `application/x-www-form-urlencoded` 格式提交到服务器

```html
<form action="register.php" method="post"></form>
```

```http
Content-Type: application/x-www-form-urlencoded

foo=bar&baz=The+first+line
```

### (3) multipart/form-data（文件上传）

如果表单使用 `POST` 方法发送数据，并且 enctype 属性为 multipart/form-data，表单数据以`混合格式`提交到服务器

文件上传的 enctype 属性必须是 multipart/form-data，其中每个键值对都有一个 `Content-Disposition`，值为 `form-data` 或者 `file`

```html
<form action="register.php" method="post" enctype="multipart/form-data"></form>
```

```http
Content-Type: multipart/form-data; boundary=---------------------------314911788813839

-----------------------------314911788813839
Content-Disposition: form-data; name="foo"

bar
-----------------------------314911788813839
Content-Disposition: form-data; name="baz"

The first line
```

## 6. 将上传文件封装成表单数据提交到服务器

```html
<form method="post" enctype="multipart/form-data">
  <input type="file" id="fileInput" name="file" multiple>
</form>
<button id="submitBtn">上传</button>
```

```javascript
let file = null;

const fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', function(e){
  file = e.target.files[0]
  console.log(file)

  //读取文件内容
  const reader = new FileReader()
  reader.addEventListener('load', function(e){
    console.log(e.target.result)
  })
  reader.readAsText(file)
})

const submitBtn = document.getElementById('submitBtn')
submitBtn.addEventListener('click', function(e){
  //将文件封装成表单数据
  const formData = new FormData()
  formData.set(file.name, file)
  console.log(formData.get(file.name))

  //将文件上传到服务器
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'handler.php', true);
  xhr.onload = function(){
    if(xhr.status === 200){
      console.log('上传成功');
    }
  };
  xhr.send(formData)
})
```
