# 四、IndexedDB

[[_TOC_]]

## 1. IndexedDB

### (1) IndexedDB 的诞生

① IndexedDB 是浏览器提供的 `NoSQL` 数据库，IndexedDB 数据库将数据存储在`客户端本地磁盘`

② IndexedDB 允许存储大量数据，提供查找接口，还能建立索引，IndexedDB 可以通过 `JS 脚本`创建和操作

### (2) IndexedDB 的特点

#### ① 存储空间大

IndexedDB 的数量和大小受到不同的浏览器限制，`单个源 (协议、域名、端口)` 下可以新建任意多个 IndexedDB 数据库，每个数据库的大小一般来说没有上限

#### ② 键值对存储

IndexedDB 内部采用`对象仓库`存放数据，所有类型的数据都可以直接存入，数据以`键值对`的形式保存，每个数据记录都有对应的主键，`主键独一无二`不能有重复，否则会抛出一个错误

#### ③ 二进制存储

IndexedDB 可以储存`二进制数据`，ArrayBuffer 对象和 Blob 对象

#### ④ 同源限制

IndexedDB 受到`同源限制`，每个数据库对应创建它的源，网页只能访问自身域名下的数据库，而不能访问跨域的数据库

#### ⑤ 异步

IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，异步设计是为了防止大量数据的读写，拖慢网页的表现

#### ⑥ 支持事务

IndexedDB 支持事务，这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况

### (3) IndexedDB

#### ① 版本

* IndexedDB 数据库有版本的概念，`同一时刻只能有一个版本的数据库存在`，版本必须是`大于 1 的整数`
* IndexedDB 数据库`不允许在同一版本中发生数据库结构的变化`，因此`新增或删除对象仓库、索引、主键`的操作，只能通过升级数据库版本实现，因此必须在数据库版本更新事件 `upgradeneeded` 的监听函数中完成

#### ② 对象仓库

* 每个数据库包含若干对象仓库
* 对象仓库保存的是数据记录，数据记录只有`主键和数据体`两部分
* 一个对象仓库只能有一个主键，`主键值可以重复`，主键用来建立默认的索引
* 主键可以是`数据记录的一个属性`，也可以是`一个递增的整数编号`
* 数据体可以是`任意数据类型`

#### ③ 事务

* 对象仓库中数据记录的操作要通过事务完成，也就是说，`只有针对对象仓库新建事务之后，才能操作指定对象仓库中的数据记录`
* 针对一个对象仓库可以创建多个事务，`多个事务按照创建顺序执行`
* 事务的一系列操作步骤中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况

#### ④ 索引

* 索引的目的是为了`检索数据记录`
* 索引需要根据`数据记录的某个属性`创建，只能通过被设为索引的属性检索数据记录，不能通过没有被设为索引的属性检索数据记录
* 如果不建立任何索引，就只能通过主键检索数据记录

#### ⑤ 请求

* IndexedDB 数据库的任何操作都是`异步`的，返回一个操作数据库的请求
* 通过在返回的请求上监听各种事件，来判断操作的状态

## 2. IndexedDB 对象

浏览器原生提供 IndexexDB 对象，作为开发者操作 IndexedDB 数据库的接口

```javascript
定义：window.indexedDB
方法：indexedDB.open(name,version)  //返回IDBRequest实例,发起一个打开指定名称和版本数据库的请求
     indexedDB.deleteDatabase(name) //返回IDBRequest实例,发起一个删除指定名称数据库的请求
```

### (1) 新建数据库

① 如果要打开的数据库不存在，就会`新建指定版本的数据库`

② 如果要打开的数据版版本大于当前版本，就会触发数据库升级，也就是`新建指定版本的数据库`

③ 新建数据库会先在请求上触发 upgradeneeded 事件，再触发 success 事件，因为数据库版本从无到有/升级

④ 新建数据库之后对数据库的操作都必须在 `upgradeneeded` 事件监听函数中完成

### (2) 打开数据库

① 打开一个已存在的数据库只会在请求上触发 success 事件

② 打开一个已存在的数据库之后对数据库的操作都必须在 `success` 事件监听函数中完成

## 3. IDBRequest 对象

IDBRequest 对象表示`一个操作数据库的请求`

```javascript
定义：const request = indexedDB.open(name,version)   //打开数据库的请求
     const request = indexedDB.deleteDatabase(name) //删除数据库的请求
     //操作数据记录的请求
属性：request.source      //返回当前请求的来源
     request.readyState  //返回当前请求的操作状态(pending:进行中,done:完成)
     request.result      //返回IDBDatabase对象,表示当前请求成功后连接的数据库？？？
     request.error       //返回当前请求失败时的错误对象
     request.transaction //返回当前请求正在进行的事务
```

```javascript
事件：
request.onupgradeneeded //数据库版本变化时触发(包含新建数据库,版本从无到有)
request.onblocked       //数据库被锁定时触发(上次的数据库连接还未关闭)
request.onsuccess       //打开/删除数据库成功时触发,数据记录操作成功时触发
request.onerror         //打开/删除数据库失败时触发,数据记录操作失败时触发
```

## 4. IDBDatabase 对象

IDBDatabase 对象表示`连接的数据库`

```javascript
定义：const db = IDBRequest.result
属性：db.name                           //返回当前数据库的名称
     db.version                        //返回当前数据库的版本
     db.objectStoreNames               //返回当前数据库所有对象仓库的名称
方法：db.close()                        //无返回值,关闭当前数据库的连接(等待所有事务完成后)
     db.createObjectStore(name,config) //返回IDBObjectStore实例,在当前数据库新建一个对象仓库
     db.deleteObjectStore(name)        //无返回值,删除当前数据库的指定对象仓库
     db.transaction(stores,mode)       //返回IDBTransaction实例,在当前数据库针对指定对象仓库数组新建一个事务,
                                       //创建事务之后才能操作指定对象仓库中的数据记录

config：keyPath      //指定对象仓库的主键使用数据记录的哪个属性,默认null
       autoIncrement //指定对象仓库是否使用自动递增的整数作为主键,默认false
```

```javascript
事件：
db.onversionchange //数据库版本变化时触发
db.onerror         //访问数据库失败时触发
db.onclose         //数据库意外关闭时触发
db.onabort         //事务终止时触发
```

## 5. IDBTransaction 对象

IDBTransaction 对象表示`一个操作指定对象仓库中数据记录的事务`

```javascript
定义：const transaction = IDBDatabase.transaction(stores,type) //当前数据库针对指定对象仓库数组创建一个事务
     const transaction = IDBObjectStore.transaction           //当前对象仓库所属的事务
     const transaction = IDBRequest.transaction()             //当前请求所在的事务
属性：transaction.db                //返回当前事务所在的数据库
     transaction.mode              //返回当前事务的模式(默认只读readonly,读写readwrite)
     transaction.error             //返回当前事务的错误
     transaction.objectStoreNames  //返回当前事务针对的对象仓库数组的名称
方法：transaction.objectStore(name) //返回当前事务针对的对象仓库数组中指定名称的对象仓库
     transaction.abort()           //无返回值,终止当前事务,回滚所有已经进行的变更
```

```javascript
事件：
transaction.oncomplete //当前事务成功时触发
transaction.onerror    //当前事务失败时触发
transaction.onabort    //当前事务终止时触发
```

### (1) 多个事务的运行

① IndexedDB 数据库中，可以同时运行多个`作用范围不重叠的读写事务`，也可以同时运行多个`作用范围重叠的只读事务`，多个事务按照`创建顺序`运行

② 数据库中同时存在 storeA、storeB 两个对象仓库
* 如果事务 A 的作用范围为 storeA，事务 B 的作用范围为 storeB，那么事务 A 和事务 B 可以同时运行
* 如果事务 A 的作用范围为 storeA，事务 B 的作用范围为 storeA 和 storeB，当事务 A 和事务 B 都是只读事务时两个事务可以同时运行，否则必须等先创建的事务运行完才能运行下一个事务

## 6. IDBObjectStore 对象

IDBObjectStore 对象表示`对象仓库`

```javascript
定义：const storeNames = IDBDatabase.objectStoreNames          //当前数据库所有对象仓库的名称
     const store = IDBDatabase.createObjectStore(name,config) //当前数据库新建一个对象仓库
     const store = IDBTransaction.objectStore(name)           //当前事务针对的指定对象仓库
属性：store.name                           //返回当前对象仓库的名称
     store.keyPath                        //返回当前对象仓库的主键
     store.autoIncrement                  //返回布尔值,当前对象仓库的主键是否会自动递增
     store.indexNames                     //返回当前对象仓库所有索引的名称
     store.transaction                    //返回当前对象仓库所属的事务
方法：数据记录方法：
     store.get(key)                       //返回IDBRequest实例,获取指定主键值对应的第一条数据记录(主键值可重复)
     store.getAll()                       //返回IDBRequest实例,获取所有数据记录
     store.count(key/range)               //返回IDBRequest实例,获取指定主键值或一组主键值对应的数据记录数量
     store.add(value,key)                 //返回IDBRequest实例,添加一条数据记录
     store.put(value,key)                 //返回IDBRequest实例,更新某个主键值对应的数据记录
     store.delete(key)                    //返回IDBRequest实例,删除指定主键值的数据记录
     store.clear()                        //返回IDBRequest实例,删除所有数据记录
     主键方法：
     store.getKey(key)                    //返回IDBRequest实例,获取指定主键值或一组主键值对应的主键
     store.getAllKeys(query)              //返回IDBRequest实例,获取所有符合条件的主键
     索引方法：
     store.createIndex(name,attr,config)  //返回IDBIndex实例,根据数据记录的属性attr新建一个索引
     store.index(name)                    //返回IDBIndex实例,获取指定名称的索引
     store.deleteIndex(name)              //返回IDBIndex实例,删除指定名称的索引
     指针方法：
     store.openCursor(range,direction)    //返回IDBCursor实例,获取指定主键值范围指定遍历方向的遍历数据记录的指针
     store.openKeyCursor(range,direction) //返回IDBCursor实例,获取指定主键值范围指定遍历方向的遍历主键的指针

config：unique    //指定索引键值是否唯一(索引键=索引所在的属性)
       multiEntry //索引键类型为数组时,true则将数组的每个值添加到索引,默认false则将数组作为整体添加到索引
```

## 7. IDBIndex 对象

IDBIndex 对象表示`对象仓库的索引`

```javascript
定义：const index = IDBObjectStore.createIndex(name,attr,config) //根据当前对象仓库数据记录的属性attr新建一个索引
     const index = IDBObjectStore.index(name)                   //获取当前对象仓库指定名称的索引
     const index = IDBObjectStore.deleteIndex(name)             //删除当前对象仓库指定名称的索引
属性：index.objectStore                    //返回索引所在的对象仓库
     index.name                           //返回索引的名称
     index.keyPath                        //返回索引键(索引所在的属性)
     index.unique                         //返回布尔值,索引键值是否唯一
     index.multiEntry                     //返回布尔值,索引键类型为数组时,是否将数组的每个值添加到索引
方法：数据记录方法
     index.get(key)                       //返回IDBRequest实例,获取指定索引键值对应的第一条数据记录
     index.getAll()                       //返回IDBRequest实例,获取所有数据记录
     index.count(key/range)               //返回IDBRequest实例,获取指定索引键值或一组索引键值对应的数据记录数量
     主键方法：
     index.getKey(key)                    //返回IDBRequest实例,获取指定索引键值或一组索引键值对应的主键
     index.getAllKeys(query)              //返回IDBRequest实例,获取所有符合条件的主键
     指针方法：
     index.openCursor(range,direction)    //返回IDBCursor实例,获取指定索引键值范围指定遍历方向的遍历数据记录的指针
     index.openKeyCursor(range,direction) //返回IDBCursor实例,获取指定索引键值范围指定遍历方向的遍历索引键的指针
```

### (1) 索引键为数组

```javascript
//以下为对象仓库的一条数据记录，将属性tags设为索引
//该索引的multiEntry属性值为true时，可以通过HTML、JS、PHP、中的任意一个值检索出该条数据记录
//该索引的multiEntry属性值为false时，只能通过['HTML', 'JS', 'PHP']这个整体检索出该条数据记录

{
  id: 1,
  title: '文章标题',
  body: '文章正文',
  tags: ['HTML', 'JS', 'PHP']
}
```

### (2) 复合索引

可以将索引设为数据记录的`多个属性`组成的复合索引

## 8. IDBCursor 对象

IDBCursor 对象表示`对象仓库/索引的指针`，用来遍历对象仓库/索引

```javascript
定义：const cursor = store.openCursor(range,direction)    //获取指定主键值范围指定遍历方向的遍历数据记录的指针
     const cursor = store.openKeyCursor(range,direction) //获取指定主键值范围指定遍历方向的遍历主键的指针
     const cursor = index.openCursor(range,direction)    //获取指定索引键值范围指定遍历方向的遍历数据记录的指针
     const cursor = index.openKeyCursor(range,direction) //获取指定索引键值范围指定遍历方向的遍历索引键的指针
属性：cursor.source                             //返回正在遍历的对象仓库/索引
     cursor.direction                          //返回遍历方向
     cursor.primaryKey                         //返回当前数据记录的主键
     cursor.key                                //返回当前数据记录的主键/索引键
     cursor.value                              //返回当前数据记录的数据体
方法：cursor.continue()                         //指针向前移动一个位置,读取下一条数据
     cursor.advance(n)                         //指针向前移动n个位置
     cursor.continuePrimaryKey(key,primaryKey) //指针移动到符合两个参数的位置
     cursor.update()                           //返回IDBRequest实例,更新当前指针指向的数据记录
     cursor.delete()                           //返回IDBRequest实例,删除当前指针指向的数据记录
```

```javascript
事件：
cursor.onsuccess //获取指针成功时触发
cursor.onerror   //获取指针失败时触发
```

### (1) 指针遍历方向

新建指针时参数 direction 指明了指针的遍历方向

**① next**：按键值升序遍历

**② nextunique**：按键值升序遍历，键值相等时只读取第一条数据

**③ prev**：按键值降序遍历

**④ prevunique**：按键值降序遍历，键值相等时只读取第一条数据

## 9. IDBKeyRange 对象

IDBKeyRange 对象表示`一组主键/索引键`，根据这组主键/索引键，可以获取一组数据记录

```javascript
定义：const range = IDBKeyRange.bound(lower,upper,lowerOpen,upperOpen) //指定下限和上限的一批键值范围
     const range = IDBKeyRange.lowerBound(lower,lowerOpen)            //指定下限的一批键值范围
     const range = IDBKeyRange.upperBound(upper,upperOpen)            //指定上限的一批键值范围
     const range = IDBKeyRange.only(key)                              //指定具体键值的一批键值范围
属性：静态属性：
     range.lower           //返回当前键值范围的下限
     range.lowerOpen       //返回布尔值,当前键值范围的下限是否为开区间
     range.upper           //返回当前键值范围的上限
     range.upperOpen       //返回布尔值,当前键值范围的上限是否为开区间
方法：range.includes(key)  //返回布尔值,当前键值范围是否包含指定键值
```

### (1) 键值范围

#### ① IDBKeyRange.bound(lower,upper,lowerOpen,upperOpen)

指定键值下限和上限的一批键值范围，参数 lowerOpen 表示下限是否为开区间，参数 upperOpen 表示上限是否为开区间

#### ② IDBKeyRange.lowerBound(lower,lowerOpen)

指定键值下限的一批键值范围，参数 lowerOpen 表示下限是否为开区间

#### ③ IDBKeyRange.upperBound(upper,upperOpen)

指定键值上限的一批键值范围，参数 upperOpen 表示上限是否为开区间

#### ④ IDBKeyRange.only(key)

指定具体键值的一批键值范围，该范围只包含指定的这一个键值

## 10. 实例

### (1) 简易留言本

```html
<button id="createBtn">新建数据库和对象仓库</button>
<button id="connectBtn">打开数据库连接</button>
<button id="closeBtn">关闭数据库连接</button><hr/>

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
const createBtn = document.getElementById('createBtn')
const connectBtn = document.getElementById('connectBtn')
const closeBtn = document.getElementById('closeBtn')
const addBtn = document.getElementById('addBtn')
const clearBtn = document.getElementById('clearBtn')

createBtn.addEventListener('click', createDB)
connectBtn.addEventListener('click', connectDB)
closeBtn.addEventListener('click', closeDB)
addBtn.addEventListener('click', add)
clearBtn.addEventListener('click', clear)

function createDB(){
  const dbRequest = window.indexedDB.open('demo', 1)
  dbRequest.addEventListener('upgradeneeded', function(e){
    console.log('数据库版本更新，当前版本为 ' + e.target.result.version)

    //获取连接的数据库
    db = e.target.result

    //新建对象仓库
    const messageStore = db.createObjectStore('message', {keyPath: 'time'})
  })
}

function connectDB(){
  const dbRequest = window.indexedDB.open('demo')

  dbRequest.addEventListener('success', function(e){
    console.log('数据库连接成功')

    //获取连接的数据库
    db = e.target.result
  })
  dbRequest.addEventListener('error', function(e){
    console.log('数据库连接失败')
  })
}

function closeDB(){
  db.close()
  console.log('数据库连接已关闭')
}

function add(){
  const time = new Date()
  const txt = document.getElementById('txt').value

  //保存留言
  const addRequest = db.transaction(['message'], 'readwrite')
    .objectStore('message')
    .add({ time: time, txt: txt })
  addRequest.addEventListener('success', function(e){
    console.log('数据保存成功')

    //显示保存的留言
    getAllMessage()
  })
  addRequest.addEventListener('error', function(e){
    console.log('数据保存失败')
  })
}

function clear(){
  const clearRequest = db.transaction(['message'], 'readwrite')
    .objectStore('message')
    .clear()
  clearRequest.addEventListener('success', function(e){
    console.log('清空成功')
  })
  clearRequest.addEventListener('error', function(e){
    console.log('清空失败')
  })
}

function getAllMessage(){
  const getRequest = db.transaction(['message'])
    .objectStore('message')
    .getAll()
  getRequest.addEventListener('success', function(e){
    console.log('显示留言成功')
    showAllMsg(e.target.result)
  })
  getRequest.addEventListener('error', function(e){
    console.log('显示留言失败')
  })
}

function showAllMsg(arr){
  const tbody = document.getElementById('tbody')
  let result = ''
  for(let i=0; i<arr.length; i++){
    const time = arr[i].time
    const txt = arr[i].txt
    result += '<tr><td>'+time+'</td><td>'+txt+'</td></tr>'
  }
  tbody.innerHTML = result
}

```

### (2) 简易数据库

```html
<button id="createBtn">新建数据库和对象仓库</button>
<button id="connectBtn">打开数据库连接</button>
<button id="closeBtn">关闭数据库连接</button><hr/>

<div>
  姓名：<input type="text" id="name"><br/>
  手机：<input type="text" id="phone"><br/>
  邮箱：<input type="text" id="email"><br/>
  备注：<input type="text" id="remarks">数组每项以逗号分割<br/>
  <button id="saveBtn" style="margin:10px 0 0 48px">保存</button>
</div><hr/>

<div>
  姓名：<input type="text" id="findName">
  <button id="findNameBtn">检索</button>
</div>
<div>
  备注：<input type="text" id="findRemarks">
  <button id="findRemarksBtn">单一数组索引键检索</button>
</div><hr/>

<div>
  姓名：<input type="text" id="findCdxName"><br/>
  手机：<input type="text" id="findCdxPhone"><br/>
  <button id="findCdxBtn" style="margin:10px 0 0 48px">复合索引键检索</button>
</div><hr/>

<button id="iteratorStoreBtn">主键循环遍历数据记录</button>
<button id="iteratorIndexBtn">单一数组索引键循环遍历数据记录</button><hr/>

<button id="cursorStoreBtn">主键指针遍历数据记录</button>
<button id="cursorStoreKeyBtn">主键指针遍历主键</button><hr/>

<button id="countBtn">统计数据记录数量</button><hr/>

<p id="msg"></p>
```

```javascript
let db

const createBtn = document.getElementById('createBtn')
const connectBtn = document.getElementById('connectBtn')
const closeBtn = document.getElementById('closeBtn')
const saveBtn = document.getElementById('saveBtn')
const findNameBtn = document.getElementById('findNameBtn')
const findRemarksBtn = document.getElementById('findRemarksBtn')
const findCdxBtn = document.getElementById('findCdxBtn')
const iteratorStoreBtn = document.getElementById('iteratorStoreBtn')
const iteratorIndexBtn = document.getElementById('iteratorIndexBtn')
const cursorStoreBtn = document.getElementById('cursorStoreBtn')
const cursorStoreKeyBtn = document.getElementById('cursorStoreKeyBtn')
const countBtn = document.getElementById('countBtn')

createBtn.addEventListener('click', createDB)
connectBtn.addEventListener('click', connectDB)
closeBtn.addEventListener('click', closeDB)
saveBtn.addEventListener('click', saveData)
findNameBtn.addEventListener('click', findDataByName)
findRemarksBtn.addEventListener('click', findDataByRemarks)
findCdxBtn.addEventListener('click', findDataByCdx)
iteratorStoreBtn.addEventListener('click', iteratorStore)
iteratorIndexBtn.addEventListener('click', iteratorIndex)
cursorStoreBtn.addEventListener('click', cursorStore)
cursorStoreKeyBtn.addEventListener('click', cursorStoreKey)
countBtn.addEventListener('click', count)

function createDB(){
  const dbRequest = window.indexedDB.open('demo', 1)
  dbRequest.addEventListener('upgradeneeded', function(e){
    console.log('数据库版本更新，当前版本为 ' + e.target.result.version)

    //获取连接的数据库
    db = e.target.result

    //新建对象仓库
    const personStore = db.createObjectStore('person', {keyPath: 'name'})

    //新建单一索引,备注索引值为数组,可通过数组中任意值检索
    personStore.createIndex('remarks', 'remarks', {multiEntry: true})

    //新建复合索引
    personStore.createIndex('cdx', ['name', 'phone'])
  })
}

function connectDB(){
  const dbRequest = window.indexedDB.open('demo')

  dbRequest.addEventListener('success', function(e){
    console.log('数据库连接成功')

    //获取连接的数据库
    db = e.target.result
  })
  dbRequest.addEventListener('error', function(e){
    console.log('数据库连接失败')
  })
}

function closeDB(){
  db.close()
  console.log('数据库连接已关闭')
}

function saveData(){
  const person = {}
  person.name = document.getElementById('name').value
  person.phone = document.getElementById('phone').value
  person.email = document.getElementById('email').value
  person.remarks = document.getElementById('remarks').value.split('，')
  console.log(person)

  //新建一个读写事务
  const addRequest = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .add(person)
  addRequest.addEventListener('success', function(e){
    console.log('数据保存成功')
  })
  addRequest.addEventListener('error', function(e){
    console.log('数据保存失败')
  })
}

function findDataByName(){
  const findName = document.getElementById('findName').value

  //新建一个只读事务
  const getRequest = db.transaction(['person'])
    .objectStore('person')
    .get(findName)
  getRequest.addEventListener('success', function(e){
    console.log('检索数据成功')
    if(e.target.result !== null && e.target.result !== undefined){
      showMsg(e.target.result)
    } else{
      showKey('未检索到数据')
    }
  })
  getRequest.addEventListener('error', function(e){
    console.log('检索数据失败')
  })
}

function findDataByRemarks(){
  const findRemarks = document.getElementById('findRemarks').value

  const getRequest = db.transaction(['person'])
    .objectStore('person')
    .index('remarks') //索引检索
    .get(findRemarks)
  getRequest.addEventListener('success', function(e){
    console.log('检索数据成功')
    if(e.target.result !== null && e.target.result !== undefined){
      showMsg(e.target.result)
    } else{
      showKey('未检索到数据')
    }
  })
  getRequest.addEventListener('error', function(e){
    console.log('检索数据失败')
  })
}

function findDataByCdx(){
  const findName = document.getElementById('findCdxName').value
  const findPhone = document.getElementById('findCdxPhone').value

  //新建一个只读事务
  const getRequest = db.transaction(['person'])
    .objectStore('person')
    .index('cdx')
    .get([findName, findPhone])
  getRequest.addEventListener('success', function(e){
    console.log('检索数据成功')
    if(e.target.result !== null && e.target.result !== undefined){
      showMsg(e.target.result)
    } else{
      showKey('未检索到数据')
    }
  })
  getRequest.addEventListener('error', function(e){
    console.log('检索数据失败')
  })
}

function iteratorStore(){
  const iteratorRequest = db.transaction(['person'])
    .objectStore('person')
    .getAll()
  iteratorRequest.addEventListener('success', function(e){
    console.log('遍历对象仓库成功')
    showAllMsg(e.target.result)
  })
}

function iteratorIndex(){
  const iteratorRequest = db.transaction(['person'])
    .objectStore('person')
    .index('remarks') //遍历索引
    .getAll()
  iteratorRequest.addEventListener('success', function(e){
    console.log('遍历索引成功')
    showAllMsg(e.target.result)
  })
}

function cursorStore(){
  //新建主键范围
  const range = IDBKeyRange.bound('李四', '王五')

  const cursorRequest = db.transaction(['person'])
    .objectStore('person')
    .openCursor(range, 'next')
  cursorRequest.addEventListener('success', function(e){
    console.log('获取主键指针成功')

    //获取指针
    const cursor = e.target.result
    console.log(cursor)

    //显示当前指针指向的数据记录
    if(cursor){
      showMsg(e.target.result.value)
      cursor.continue()
    } else{
      console.log('指针遍历结束')
    }
  })
  cursorRequest.addEventListener('error', function(e){
    console.log('获取主键指针失败')
  })
}

function cursorStoreKey(){
  //新建主键范围
  const range = IDBKeyRange.bound('李四', '王五')

  const cursorRequest = db.transaction(['person'])
    .objectStore('person')
    .openKeyCursor(range, 'next')
  cursorRequest.addEventListener('success', function(e){
    console.log('获取主键指针成功')

    //获取指针
    const cursor = e.target.result
    console.log(cursor)

    //显示当前指针指向的数据记录
    if(cursor){
      showKey(e.target.result.key)
      cursor.continue()
    } else{
      console.log('指针遍历结束')
    }
  })
  cursorRequest.addEventListener('error', function(e){
    console.log('获取主键指针失败')
  })
}

function count(){
  const countRequest = db.transaction(['person'])
    .objectStore('person')
    .count()
  countRequest.addEventListener('success', function(e){
    console.log('统计成功')
    if(e.target.result !== null && e.target.result !== undefined){
      showKey(e.target.result)
    } else{
      showKey(0)
    }
  })
  countRequest.addEventListener('error', function(e){
    console.log('统计失败')
  })
}

function showAllMsg(arr){
  let result = ''
  for(let i=0; i< arr.length; i++){
    result += '姓名：' + arr[i].name + '，' +
    '手机：' + arr[i].phone + '，' +
    '邮箱：' + arr[i].email + '，' +
    '备注：' + arr[i].remarks + '<br/>'
  }
  const msg = document.getElementById('msg')
  msg.innerHTML = result
}

function showMsg(person){
  console.log(person)
  const result = '姓名：' + person.name + '，' +
    '手机：' + person.phone + '，' +
    '邮箱：' + person.email + '，' +
    '备注：' + person.remarks + '<br/>'
  const msg = document.getElementById('msg')
  msg.innerHTML = result
}

function showKey(key){
```

①②③④⑤⑥⑦⑧⑨⑩
