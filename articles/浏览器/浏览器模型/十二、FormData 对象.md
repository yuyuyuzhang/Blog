# 十二、FormData 对象

## 1. 表单元素

```html
<form id="form">
  <!-- 下拉选择框 -->
  <select>
    <optgroup label="四川">
      <option value="成都">成都</option>
      <option value="广元">广元</option>
    </optgroup>
    <optgroup label="江苏">
      <option value="南京">南京</option>
      <option value="镇江">镇江</option>
    </optgroup>
  </select>

  <!-- 单选框 -->
  <input type="radio" checked>

  <!-- 复选框 -->
  <input type="checkbox" checked>
  
  <!-- 文本框 -->
  <input type="text" maxlength="20">
  <textarea rows="3" maxlength="100"></textarea>
  <input type="password">
  <input type="search">
  
  <!-- 文件上传 -->
  <input type="file" accept="" multiple>

  <!-- 数字 -->
  <input type="number" min="0" max="10" step="2">
  <input type="range" min="0" max="10" step="1">

  <!-- 日期 -->
  <input type="week"> <!-- week、year -->
  <input type="month"> <!-- month、year -->
  <input type="time">
  <input type="date">
  <input type="datetime"> <!-- 基于 UTC 时区 -->
  <input type="datetime-local"> <!-- 不带时区 -->
  
  <!-- 其他 -->
  <input type="hidden">
  <input type="color">
  <input type="image" src="cat.jpg" width="20px" height="20px">
  <input type="tel" pattern="">
  <input type="email" pattern="">
  <input type="url" pattern="">

  <!-- 按钮 -->
  <input type="button" value="按钮">
  <input type="submit" value="提交">
  <input type="reset" value="重置">
  <button type="button">按钮</button>
  <button type="submit">提交</button>
  <button type="reset">重置</button>
</form>
```

## 2. 表单内置验证

### (1) 自动校验

浏览器允许开发者指定一些条件，`表单提交时`浏览器会自动校验各个表单控件的值是否符合条件

```js
<form id="form">
  <input type="text" maxlength="20">
  <input type="number" min="0" max="10" step="2">
  <input type="tel" pattern="">

  <button type="submit">提交</button>
  <button type="reset">重置</button>
</form>
```

可以通过 `:valid :invalid` CSS 伪类控制表单控件是否通过校验时的样式

```css
input,
input:valid {
    border-color: #ccc;
}

input:invalid {
    border-color: red;
}
```

```js
const form = document.getElementById('form')
form.addEventListener('submit', e => {
  e.preventDefault() //阻止默认操作
})
```

### (2) 手动校验

还可以通过表单元素和表单控件的 `checkValidity()` 方法手动触发校验

```js
//触发整个表单/单个表单控件的校验
form/formControl.checkValidity() 
```

提交表单可以封装成以下函数

```js
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

> 目前 invalid 事件有 bug，一旦校验失败，就无法再次校验成功，不建议使用该事件

```html
<form id="form">
  <div>
    <label for="name">用户名：</label>
    <input type="text" name="userName" id="name" required />
  </div>
  <div>
    <label for="password">密码</label>
    <input type="password" name="userPassword" id="password" minlength="6" maxlength="6" />
  </div>

  <button type="submit">提交</button>
</form>
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

```js
const form = document.getElementById('form')
const name = document.getElementById('name')
form.addEventListener('submit', e => {
  e.preventDefault() //阻止默认操作

  if(form.checkValidity()){
    console.log('校验成功')
  }
})
name.addEventListener('invalid', e => {
  e.target.setCustomValidity('invalid');
}, true)
```

## 3. 表单事件

```js
formControl.onselect      //鼠标选取表单控件的文本时,在表单控件上触发

form/formControl.oninput  //表单控件值改变时,在表单控件上触发,会冒泡到 form 元素
form/formControl.onchange //表单控件值改变并且失去焦点时,在表单控件上触发,会冒泡到 form 元素

form.onsubmit             //提交表单时,在 form 元素上触发
form.onreset              //重置表单时,在 form 元素上触发
```

### (1) select 事件

select 事件仅限于以下 3 中情形，选中控件文本时会触发

* `<input type="text">`
* `<input type="password">`
* `<textarea></textarea>`

```html
<input type="text" id="textInput" value="haaa还是水水水水水水水水">
<input type="password" id="passwordInput" value="111222">
<textarea id="textarea">是否合格看大家都看开</textarea>
```

```js
const textInput = document.getElementById('textInput')
const passwordInput = document.getElementById('passwordInput')
const textarea = document.getElementById('textarea')
textInput.addEventListener('select', e => {
  const selectVal = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd)
  console.log('textInput:', selectVal)
})
passwordInput.addEventListener('select', e => {
  const selectVal = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd)
  console.log('passwordInput:', selectVal)
})
textarea.addEventListener('select', e => {
  const selectVal = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd)
  console.log('textarea:', selectVal)
})
```

### (2) input/change 事件

* **select/radio/checkbox**：对于 select 元素和 type=radio/checkbox/file 的 input 元素，input&change 事件都是在`值改变`时触发
* **input/textarea**：对于 type=text 的 input 元素和 textarea 元素，input 事件是在`值改变`时触发，change 事件是在`值改变并且表单控件失去焦点`时触发

```html
<form id="form">
  <select id="select">
    <optgroup label="四川">
      <option value="成都">成都</option>
      <option value="广元">广元</option>
    </optgroup>
    <optgroup label="江苏">
      <option value="南京">南京</option>
      <option value="镇江">镇江</option>
    </optgroup>
  </select>

  <input type="radio" id="radio">
  <input type="checkbox" id="checkbox">
  <input type="file" id="file">

  <input type="text" id="text"/>
  <textarea id="textarea"></textarea>
</form>
```

```js
const form = document.getElementById('form')
const select = document.getElementById('select')
const radio = document.getElementById('radio')
const checkbox = document.getElementById('checkbox')
const file = document.getElementById('file')
const text = document.getElementById('text')
const textarea = document.getElementById('textarea')
select.addEventListener('input', e => {
  console.log('select input')
})
select.addEventListener('change', e => {
  console.log('select change')
})
radio.addEventListener('input', e => {
  console.log('radio input')
})
radio.addEventListener('change', e => {
  console.log('radio change')
})
checkbox.addEventListener('input', e => {
  console.log('checkbox input')
})
checkbox.addEventListener('change', e => {
  console.log('checkbox change')
})
file.addEventListener('input', e => {
  console.log('file input')
})
file.addEventListener('change', e => {
  console.log('file change')
})
text.addEventListener('input', e => {
  console.log('text input')
})
text.addEventListener('change', e => {
  console.log('text change')
})
textarea.addEventListener('input', e => {
  console.log('textarea input')
})
textarea.addEventListener('change', e => {
  console.log('textarea change')
})
form.addEventListener('input', e => {
  console.log('form input')
})
form.addEventListener('change', e => {
  console.log('form change')
})
```

### (3) submit/reset 事件

```html
<form id="form">
  <input type="text">

  <button type="submit">提交</button>
  <button type="reset">重置</button>
</form>
```

```js
const form = document.getElementById('form')
form.addEventListener('submit', e => {
  console.log('submit')
  e.preventDefault() // 阻止表单提交的默认操作
})
form.addEventListener('reset', e => {
  console.log('reset')
})
```

## 4. 表单数据编码

表单用来收集用户提交的数据发送到服务器，每个表单控件都会生成一个`键值对`，键名是控件的 `name` 属性，键值是控件的 `value` 属性，键名和键值之间通过`等号`连接，例如 userName=张三，键值如果不是 `URL 合法字符`，提交时浏览器会自动对其进行`编码`

```html
<form id="form">
  <div>
    <label for="name">用户名：</label>
    <input type="text" id="name" name="userName" required />
  </div>
  <div>
    <label for="password">密码</label>
    <input type="password" id="password" name="userPassword" required />
  </div>
  <button type="submit" id="submitBtn">提交</button>
  <button type="reset" id="resetBtn">重置</button>
</form>
```

表单元素的 `enctype` 属性决定`表单数据的编码格式`，反应在 HTTP 请求头的 `Content-Type` 字段 ，表单可以通过以下 3 种编码向服务器提交数据

### (1) GET

如果表单使用 `GET` 方法发送数据，enctype 属性无效

* 所有键值对以 `URL 查询字符串`格式提交到服务器

```html
<form action="/handling-page" method="get"></form>
```

```http
GET /handling-page?userName=张三&userPassword=123
Host: example.com
```

### (2) POST：application/x-www-form-urlencoded

如果表单使用 `POST` 方法发送数据，并且省略 enctype 属性，表单数据以 `application/x-www-form-urlencoded` 格式提交到服务器

* 所有键值对`连成一行作为 HTTP 请求的数据体`发送到服务器

```html
<form action="/handling-page" method="post"></form>
```

```http
POST /handling-page HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 74

userName=张三&userPassword=123
```

### (3) POST：multipart/form-data（文件上传）

如果表单使用 `POST` 方法发送数据，并且 enctype 属性为 `multipart/form-data`，表单数据以`混合格式`提交到服务器，`文件上传`必须是这种编码格式

* 每个键值对都有一个 `Content-Disposition`，值为 `form-data` 或者 `file`

```html
<form action="/handling-page" method="post" enctype="multipart/form-data"></form>
```

```http
Content-Type: multipart/form-data; boundary=---------------------------314911788813839

-----------------------------314911788813839
Content-Disposition: form-data; userName="张三"

-----------------------------314911788813839
Content-Disposition: form-data; userPassword="123"
```

## 5. FormData 对象

`浏览器自动`将表单数据以`键值对`的形式发送到服务器，但是有时候我们希望通过 `JS 脚本`构造或编辑表单的键值对，然后通过 JS 脚本发送到服务器，浏览器原生提供了 FormData 对象完成这项工作

FormData 构造函数的参数是一个 DOM 的 `form 元素`，浏览器会自动处理表单的键值对，如果参数为空代表一个空表单

```js
定义：const formData = new FormData(form)
方法：formData.has(key)          //返回布尔值,是否存在键名key
     formData.get(key)          //返回第一个键名key对应的键值字符串
     formData.getAll(key)       //返回所有键名key对应的键值数组
     formData.set(key,value)    //无返回值,删除同名键值对后设置键名key对应的键值为value,键名不存在则添加
     formData.append(key,value) //无返回值,表单最后添加一个键值对key,value
     formData.delete(key)       //无返回值,删除键名key对应的所有键值对
     遍历器方法
     formData.keys()            //返回键名的遍历器对象
     formData.values()          //返回键值的遍历器对象
     formData.entries()         //返回键值对的遍历器对象
```

### (1) 有参

```html
<form id="form">
  <label for="birth">籍贯</label>
  <select name="birth" id="birth">
    <optgroup label="四川">
      <option value="成都">成都</option>
      <option value="广元">广元</option>
    </optgroup>
    <optgroup label="江苏">
      <option value="南京">南京</option>
      <option value="镇江">镇江</option>
    </optgroup>
  </select><br>

  <label for="woman">女</label><input type="radio" name="gender" id="woman" value="woman" checked>
  <label for="man">男</label><input type="radio" name="gender" id="man" value="man"><br>

  <label for="study">学习</label><input type="checkbox" name="likes" id="study" value="study" checked>
  <label for="draw">绘画</label><input type="checkbox" name="likes" id="draw" value="draw" checked>
  <label for="sleep">睡觉</label><input type="checkbox" name="likes" id="sleep" value="sleep"><br>

  <label for="file">文件</label><input type="file" name="file" id="file" multiple><br>

  <button type="submit">提交</button>
  <button type="reset">重置</button>
</form>
```

```js
const form = document.getElementById('form')
form.addEventListener('submit', e => {
  e.preventDefault() //阻止默认操作

  const formData = new FormData(form)
  for(let item of formData.entries()){
    console.log(item)
  }
})
```

### (2) 无参

```html
<form id="form">
  <input type="file" name="file" id="fileInput" multiple>

  <button type="submit">提交</button>
  <button type="reset">重置</button>
</form>
```

```js
let file = null;
const form = document.getElementById('form')
const fileInput = document.getElementById('fileInput')

fileInput.addEventListener('input', function(e){
  file = e.target.files[0]
  // console.log(file)

  //读取文件内容
  const reader = new FileReader()
  reader.addEventListener('load', function(e){
    console.log(e.target.result)
  })
  reader.readAsText(file)
})

form.addEventListener('submit', e => {
  e.preventDefault() //阻止默认操作

  //将文件封装到表单数据
  const formData = new FormData()
  formData.set(file.name, file)

  formData.set('userName', '张三')
  formData.append('userName', '李四')
  formData.set('userPassword', 123456)

  console.log(formData.get('userName'))    //'张三'
  console.log(formData.getAll('userName')) //Array ['张三', '李四']

  //删除同名键值对后设置键名key对应的键值为value,键名不存在则添加
  formData.set('userName', '王五') 
  console.log(formData.getAll('userName')) //Array ['王五']

  for(let item of formData.entries()){
    console.log(item) //Array ["relation-default.zip", File] ["userName", "王五"] ["userPassword", "123456"]
  }  
}) 
```

## 6. 将上传文件封装成表单数据提交到服务器

```html
<form id="form" method="post" enctype="multipart/form-data">
  <input type="file" id="fileInput" name="file" multiple>
  
  <button type="submit">上传</button>
</form>
```

```js
let file = null;
const form = document.getElementById('form')
const fileInput = document.getElementById('fileInput')

fileInput.addEventListener('change', function(e){
  file = e.target.files[0]

  //读取文件内容
  const reader = new FileReader()
  reader.addEventListener('load', function(e){
    console.log(e.target.result)
  })
  reader.readAsText(file)
})

form.addEventListener('submit', function(e){
  e.preventDefault() //阻止默认操作
  
  //将文件封装成表单数据
  const formData = new FormData()
  formData.set(file.name, file)
  console.log(formData.get(file.name))

  //将文件上传到服务器
  // const xhr = new XMLHttpRequest()
  // xhr.open('POST', 'handler.php', true);
  // xhr.onload = function(){
  //   if(xhr.status === 200){
  //     console.log('上传成功');
  //   }
  // };
  // xhr.send(formData)
})
```
