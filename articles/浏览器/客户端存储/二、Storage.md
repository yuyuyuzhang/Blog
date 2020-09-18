# 二、Storage

[[_TOC_]]

## 1. Storage

### (1) Storage 的由来

Storage 接口用于 JS 脚本保存数据，不同浏览器对`单个源 (协议、域名、端口) 下` Storage 接口的大小限制是不一样的，Chrome 是 2.5MB，Firefox 和 Opera 是 5MB，IE 是 10MB

### (2) Storage 的特点

#### ① 存储空间小

Storage 接口的存储空间受到不同的浏览器限制，一般`不超过 5MB`

#### ② 键值对存储

Storage 接口保存的数据都以`键值对`的形式存在，所有的数据都以`文本格式`保存

#### ③ 同源限制

Storage 接口受到`同源限制`，网页只能访问自身源下的 Storage 接口存储的数据，而不能访问跨域的 Storage 接口

#### ④ 同步

Storage 接口操作是`同步`的，进行大量操作时会锁死浏览器

## 2. Storage 的分类

### (1) SessionStorage

① session 是用户浏览器某个网站时，从进入网站到关闭网站的这段时间，也就是用户浏览这个网站花费的时间，也叫做浏览器的一次会话

② session 对象可以保存浏览器的一次会话内要求保存的任何数据，存储在`浏览器内存`

③ SessionStorage 接口将数据保存在 `session 对象`中，数据的有效期仅限于`浏览器的一次会话`，会话结束后（浏览器加载文档的窗口关闭），数据被清空

```javascript
window.sessionStorage   //指向SessionStorage对象
```

### (2) LocalStorage

LocalStorage 接口将数据保存在`客户端本地磁盘`，除非主动清除保存的数据，否则数据的有效期为`永久存在`，下一次访问该网站的时候网页可以直接读取以前保存的数据

```javascript
window.localStorage     //指向LocalStorage对象
```

## 3. Storage 的属性和方法

```javascript
定义：const ls = window.localStorage     //指向LocalStorage对象
     const ss = window.sessionStorage   //指向SessionStorage对象
属性：s.length             //返回保存的键值对个数
方法：s.getItem(key)       //返回指定键名的键值
     s.setItem(key,value) //无返回值,添加指定键值对
     s.removeItem(key)    //无返回值,删除指定键名对应的键值
     s.clear()            //返回undefined,清除保存的所有键值对
     s.key(index)         //返回指定索引处对应的键值
```

### (1) Storage 接口操作

#### ① s.getItem(key)

* 如果键名不存在，方法返回 `null`

#### ② s.setItem(key,value)

* 如果键名已存在，则更新键值
* 如果浏览器给 Storage 接口的存储空间已满，方法报错

#### ③ s.removeItem(key)

* 如果键名不存在，方法不做任何事情

#### ④ s.clear()

* 清除保存的所有键值对，返回undefined

#### ⑤ s.key(index)

* 结合使用 s.length 属性和 s.key(index) 方法，可以遍历所有键值对
* Storage 接口保存的键值对的索引并不是固定的，新增一个键值对后，索引并不是顺序加 1

```javascript
const ss = window.sessionStorage

ss.setItem('name', '张三')
ss.setItem('name', '小可爱')
ss.setItem('age', 20)
ss.setItem('job', 'doctor')
ss.removeItem('age')

console.log(ss.getItem('name')) //'小可爱'
console.log(ss.getItem('age'))  //null

for(let i=0; i < ss.length; i++){
  console.log(ss.key(i))
}
//输出：'name'  
//     'job'
```

### (2) 简易留言本

如何使用 Storage 接口保存和读取大量数据，简单 Web 留言本以内容作为键值，日期时间作为键名，可以保证键名不重复

```html
<textarea id="txt" rows="6" cols="30" ></textarea>
<button id="addBtn">追加</button>
<button id="clearBtn">清空</button>

<table>
  <thead>
    <th>日期时间</th><th>内容</th>
  </thead>
  <tbody id="tbody"></tbody>
</table>
```

```javascript
const addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function(e){
  const time = new Date()
  const txt = document.getElementById('txt').value
  localStorage.setItem(time, txt)
  showLocalStorage()
})

const clearBtn = document.getElementById('clearBtn')
clearBtn.addEventListener('click', function(e){
  localStorage.clear()
  showLocalStorage()
})

showLocalStorage()
function showLocalStorage(){
  const tbody = document.getElementById('tbody')
  let result = ''
  for(let i=0; i<localStorage.length; i++){
    const time = localStorage.key(i)
    const value = localStorage.getItem(time)
    result += '<tr><td>'+time+'</td><td>'+value+'</td></tr>'
  }
  tbody.innerHTML = result
}
```

### (3) 简易数据库

① 将 Storage 接口作为简易数据库来使用，需要考虑`如何对列进行管理`，以客户联系信息为例，客户的联系信息分为姓名、手机、邮箱、备注这四列，以客户的姓名作为键名保存，方便获取客户的其他信息，那么如何将客户的其他信息分三列保存呢

② 答案是将客户作为一个对象，所有信息都是客户的属性，然后将`客户对象转换成 JSON 字符串`后保存包 Storage 接口

```html
<div>
  姓名：<input type="text" id="name"><br/>
  手机：<input type="text" id="phone"><br/>
  邮箱：<input type="text" id="email"><br/>
  备注：<input type="text" id="remarks"><br/>
  <button id="saveBtn" style="margin:10px 0 0 48px">保存</button>
  <button id="clearBtn">清空</button>
</div><hr/>
<div>
  姓名：<input type="text" id="findName">
  <button id="findBtn">检索</button>
</div>
<p id="msg"></p>
```

```javascript
const saveBtn = document.getElementById('saveBtn')
saveBtn.addEventListener('click', function(e){
  const person = {}
  person.name = document.getElementById('name').value
  person.phone = document.getElementById('phone').value
  person.email = document.getElementById('email').value
  person.remarks = document.getElementById('remarks').value
  localStorage.setItem(person.name, JSON.stringify(person))
})

const clearBtn = document.getElementById('clearBtn')
clearBtn.addEventListener('click', function(e){
  localStorage.clear()
})

const findBtn = document.getElementById('findBtn')
findBtn.addEventListener('click', function(e){
  const findName = document.getElementById('findName').value
  const person = JSON.parse(localStorage.getItem(findName))

  let result = '检索的客户不存在'
  if(person !== null){
    result = '姓名：' + person.name + '<br/>' +
      '手机：' + person.phone + '<br/>' +
      '邮箱：' + person.email + '<br/>' +
      '备注：' + person.remarks + '<br/>'
  }
  const p = document.getElementById('msg')
  p.innerHTML = result
})
```

## 4. Storage 的事件

① Storage 接口存储的键值对发生变化时，会在 `window 对象`上触发 storage 事件

② storage 事件不在导致数据变化的当前页面触发，而是在`相同源 (协议、域名、端口) 下的在浏览器打开的其他页面`触发，也就是说，当浏览器同时打开多个窗口，每个窗口加载的文档同属一个源，其中一个窗口的文档的 Storage 接口存储的键值对发生变化时，可以在其他窗口的文档观察到监听函数的执行

③ StorageEvent 事件对象继承了 Event 对象，StorageEvent 事件对象的几个特有的只读属性如下

```javascript
e.url         //返回原始触发storage事件的那个网页网址
e.storageArea //返回键值对所在的整个对象
e.key         //返回变动的键名
e.oldValue    //返回变动键名的旧键值(键值对新增返回null)
e.newValue    //返回变动键名的新键值(键值对删除返回null)
```

```javascript
window.addEventListener('storage', function(e){
  console.log(e.url)
  console.log(e.storageArea)
  console.log(e.key)
  console.log(e.oldVlaue)
  console.log(e.newValue)
})
```
