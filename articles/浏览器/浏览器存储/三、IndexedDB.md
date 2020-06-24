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

## 2. IndexedDB 对象

浏览器原生提供 IndexexDB 对象，作为开发者操作 IndexedDB 数据库的接口

版本

* IndexedDB 数据库有版本的概念，同一时刻只能有一个版本的数据库存在
* 如果要修改数据库结构 (新增或删除对象仓库、索引、主键)，只能通过`升级数据库版本`实现

```javascript
定义：window.indexedDB
方法：indexedDB.open(name,version)  //返回IDBRequest对象,发起一个打开指定名称和版本数据库的请求
     indexedDB.deleteDatabase(name) //返回IDBRequest对象,发起一个删除指定名称数据库的请求
     indexedDB.cmp(val1,val2)       //返回整数,比较val1,val2是否为相同主键(0:val1=val2,1:val1>val2,2:val1<val2>)
```

打开数据库

* version 参数可省略，若数据库已存在，默认打开当前版本数据库；若数据库不存在，默认创建版本为 1 的数据库
* version 参数大于当前数据库版本，会触发数据库升级

删除数据库

* 调用 `indexedDB.deleteDatabase(name)` 方法时，会在数据库对象 IDBDatabase 上触发 `versionchange` 事件

## 3. IDBRequest 对象

IDBRequest 对象表示`一个操作数据库的请求`

```javascript
定义：const request = indexedDB.open(name,version)
     const request = indexedDB.deleteDatabase(name)
属性：request.source      //返回当前请求的来源
     request.readyState  //返回当前请求的操作状态(pending:进行中,done:完成)
     request.result      //返回IDBDatabase对象,表示当前请求成功后连接的数据库
     request.error       //返回当前请求失败时的错误对象
     request.transaction //返回当前请求正在进行的事务
```

```javascript
事件：
request.onupgradeneeded //第一次打开数据库,或者数据库版本变化时触发
request.onblocked       //数据库被锁定,上次的连接还未关闭时触发
request.onsuccess       //打开/删除数据库成功时触发,数据记录操作成功时触发
request.onerror         //打开/删除数据库失败时触发,数据记录操作失败时触发
```

## 4. IDBDatabase 对象

IDBDatabase 对象表示`连接的数据库`

```javascript
定义：const db = IDBRequest.result
属性：db.name                           //返回数据库名称
     db.version                        //返回数据库版本
     db.objectStoreNames               //返回DOMStringList对象,包含所有数据仓库IDBObjectStore
方法：db.close()                        //无返回值,关闭数据库连接(等所有事务完成后关闭)
     db.transaction(stores,mode)       //返回IDBTransaction对象,针对指定对象仓库数组创建一个事务(readonly、readwrite)
     db.createObjectStore(name,config) //返回并创建一个对象仓库
     db.deleteObjectStore(name)        //无返回值,删除指定对象仓库

config：keyPath      //主键,默认null
       autoIncrement //布尔值,是否使用自动递增的整数作为主键,默认false
```

```javascript
事件：
db.onversionchange //数据库版本变化时触发
db.onerror         //访问数据库失败时触发
db.onclose         //数据库意外关闭时触发
db.onabort         //事务终止时触发
```

使用 IDBDatabase.transaction(stores,type) 方法创建一个数据库事务
stores 参数表示对象仓库数组
type 参数表示事务类型，只读 readonly (默认)、读写 readwrite

## 5. IDBTransaction 对象

IDBTransaction 对象表示`一个操作数据记录的事务`

事务

* 数据记录的读写和删改，都要通过事务完成
* 事务的一系列操作步骤中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况

```javascript
定义：const transaction = IDBDatabase.transaction(stores,type) //返回并针对指定对象仓库数组创建一个事务
     const transaction = IDBRequest.transaction()             //返回当前请求所在的事务
     const transaction = IDBObjectStore.transaction           //返回当前对象仓库所属的事务
属性：transaction.db                //返回当前事务所在的数据库
     transaction.mode              //返回当前事务的模式
     transaction.error             //返回当前事务的错误
     transaction.objectStoreNames  //返回当前针对的对象仓库数组的名字
方法：transaction.objectStore(name) //返回当前事务针对的对象仓库数组中指定名称的对象仓库
     transaction.abort()           //无返回值,终止当前事务,回滚所有已经进行的变更
```

```javascript
事件：
transaction.oncomplete //当前事务成功时触发
transaction.onerror    //当前事务失败时触发
transaction.onabort    //当前事务终止时触发
```

## 6. IDBObjectStore 对象

IDBObjectStore 对象表示`对象仓库`

对象仓库

* 每个数据库包含若干对象仓库
* 对象仓库保存的是数据记录，每条记录只有主键和数据体两部分
* 一个对象仓库只有一个主键，主键用来建立默认的索引，因此主键值必须`唯一`，主键可以是数据记录的一个属性，也可以是一个递增的整数编号
* 数据体可以是`任意数据类型`

```javascript
定义：const storeNames = IDBDatabase.objectStoreNames
     const store = IDBDatabase.createObjectStore(name,config)
属性：store.indexNames        //返回DOMStringList对象,包含当前对象仓库的所有索引
     store.keyPath           //返回当前对象仓库的主键
     store.name              //返回当前对象仓库的名称
     store.autoIncrement     //返回布尔值,表示当前对象仓库的主键是否会自动递增
     store.transaction       //返回当前对象仓库所属的事务
方法：数据记录方法：
     store.add(value,key)                //返回IDBRequest对象,添加一条数据记录
     store.put(value,key)                //返回IDBRequest对象,更新某个主键值对应的数据记录
     store.delete(key)                   //返回IDBRequest对象,删除指定主键值的数据记录
     store.clear()                       //返回IDBRequest对象,删除所有数据记录
     store.getKey(key)                   //返回IDBRequest对象,获取指定主键值或IDBKeyRange对象的主键
     store.getAllKeys(query)             //返回IDBRequest对象,获取所有符合条件的主键
     store.get(key)                      //返回IDBRequest对象,获取指定主键值对应的数据记录
     store.getAll()                      //返回IDBRequest对象,获取对象仓库的所有数据记录
     store.count(key/range)              //返回IDBRequest对象,获取指定主键值或IDBKeyRange对象对应的数据记录数量
     索引方法：
     store.createIndex(name,attr,config) //返回IDBIndex对象,根据指定属性attr新建一个索引
     store.index(name)                   //返回IDBIndex对象,获取指定名称的索引
     store.deleteIndex(name)             //返回IDBIndex对象,删除指定名称的索引
     指针方法：
     store.openCursor()    //返回IDBCursor对象,
     store.openKeyCursor() //返回IDBCursor对象,

config：unique    //布尔值,true则不允许重复的值
       multiEntry //布尔值,
```

## 7. IDBIndex 对象

IDBIndex 对象表示数据库的索引，通过索引可以获取数据记录，

数据记录的主键默认带有索引，IDBIndex 对象主要用于通过其他键建立索引获取数据记录

```javascript
定义：const index = IDBObjectStore.createIndex(name,attr,config) //返回IDBIndex对象,根据指定属性attr新建一个索引
     const index = IDBObjectStore.index(name)                   //返回IDBIndex对象,获取指定名称的索引
     const index = IDBObjectStore.deleteIndex(name)             //返回IDBIndex对象,删除指定名称的索引
属性：index.objectStore       //返回索引所在的对象仓库
     index.keyPath           //返回索引的主键
     index.name              //返回索引的名称
     index.unique            //返回布尔值,
     index.multiEntry        //返回布尔值,
方法：索引方法：
     index.getKey(key)       //返回IDBRequest对象,获取指定主键值或IDBKeyRange对象的主键
     index.getAllKeys(query) //返回IDBRequest对象,获取所有符合条件的主键
     index.get(key)          //返回IDBRequest对象,获取指定主键值对应的数据记录
     index.getAll()          //返回IDBRequest对象,获取对象仓库的所有数据记录
     index.count(key/range)  //返回IDBRequest对象,获取指定主键值或IDBKeyRange对象对应的数据记录数量
     指针方法：
     index.openCursor()      //返回IDBCursor对象,
     index.openKeyCursor()   //返回IDBCursor对象,
```

## 8. IDBCursor 对象

IDBCursor 对象表示指针，用来遍历数据记录

```javascript
定义：const cursor = store.openCursor()      //返回IDBCursor对象,获取对象仓库的指针
     const cursor = store.openKeyCursor()   //返回IDBCursor对象,获取对象仓库的指针
     const cursor = index.openCursor()      //返回IDBCursor对象,获取索引的指针
     const cursor = index.openKeyCursor()   //返回IDBCursor对象,获取索引的指针
属性：cursor.source
     cursor.direction
     cursor.key
     cursor.value
     cursor.primaryKey
方法：cursor.continue()                         //指针向前移动一个位置
     cursor.advance(n)                         //指针向前移动n个位置
     cursor.continuePrimaryKey(key,primaryKey) //指针移动到符合两个参数的位置
     cursor.update()                           //返回IDBRequest对象,更新当前指针处数据记录
     cursor.delete()                           //返回IDBRequest对象,删除当前指针处数据记录
```

## 9. IDBKeyRange 对象

IDBKeyRange 对象表示对象仓库中的`一组主键范围`，

```javascript
定义：const range = IDBKeyRange.lowerBound()
     const range = IDBKeyRange.upperBound()
     const range = IDBKeyRange.bound()
     const range = IDBKeyRange.only()
属性：静态属性：
     range.lower           //返回下限
     range.lowerOpen       //返回布尔值,下限是否为开区间
     range.upper           //返回上限
     range.upperOpen       //返回布尔值,上限是否为开区间
方法：range.includes(key)  //返回布尔值,当前主键范围是否包含指定主键
```

①②③④⑤⑥⑦⑧⑨⑩
