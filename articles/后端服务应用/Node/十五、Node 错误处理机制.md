# 十五、Node 错误处理机制

## 1. Node 错误

### (1) Node 错误类型

Node 应用程序通常会遇到 4 类错误

* 标准 JS 代码错误
* 底层操作系统约束触发的系统错误
* Node 应用程序代码触发的用户指定错误
* AssertionError 错误类：通常由 assert 模块引发，Node 检测到不应该发生的异常逻辑违规时触发

Node 生成的所有错误都继承自`标准的 JS Error 类`

### (2) 错误的抛出和处理

Node 支持多种机制抛出和处理 Node 应用程序运行时发生的错误，如何抛出和处理这些错误完全取决于 `Error 类型和调用 API 的风格`

#### ① 标准 JS 代码错误

* **同步 API**：都使用 `throw` 机制抛出错误，`try-catch` 机制处理错误

  ```js
  try {
    const m = 1;
    const n = m + z; // z 未定义，抛出 ReferenceError
  } catch (err) {
    // 在此处理错误
  }
  ```

* **异步 API**：可以有多种方式抛出错误
  * **接受 callback 函数的异步方法**：错误优先回调，Error 对象作为`第一个参数`传递给 callback 函数

    ```js
    const fs = require('fs');
    fs.readFile('a file that does not exist',(err,data) => {
      if (err) {
        console.error('There was an error reading the file!',err);
        return;
      }
    });
    ```

  * **Node API 一些典型的异步方法**：使用 `throw` 机制抛出错误，`try-catch` 机制处理错误

```js

```

* **EventEmitter、Stream 类**：触发 `error` 事件
  * EventEmitter

    ```js
    const EventEmitter = require('events');
    const emitter = new EventEmitter();

    setImmediate(() => {
      // 这将导致 Node 进程崩溃，因为没有添加 error 事件监听
      emitter.emit('error',new Error('This will crash'));
    });
    ```

  * Stream

```js

```

#### ② 底层操作系统约束触发的系统错误

#### ③ Node 应用程序代码触发的用户指定错误

#### ④ AssertionError 错误类

## 2. Error 类

Node 生成的所有错误都继承自`标准的 JS Error 类`

### (1) Error 对象属性和方法

```js
定义：const err = new Error(msg)
属性：静态属性：
     Error.stackTraceLimit               //返回/设置堆栈跟踪收集的堆栈帧数(默认10)
     实例属性：
     err.code                            //返回错误码
     err.message                         //返回错误描述
     err.stack                           //返回错误堆栈
方法：静态方法
     Error.captureStackTrace(target,[f]) //返回调用该方法的代码位置字符串,给target添加stack属性,可选参数f为函数,给定f则f及以上的帧都将从堆栈跟踪中省略
```

### (2) Node 错误码

ABORT_ERR
ERR_AMBIGUOUS_ARGUMENT
ERR_ARG_NOT_ITERABLE
ERR_ASSERTION
ERR_ASYNC_CALLBACK
ERR_ASYNC_TYPE
ERR_BROTLI_COMPRESSION_FAILED
ERR_BROTLI_INVALID_PARAM
ERR_BUFFER_CONTEXT_NOT_AVAILABLE
ERR_BUFFER_OUT_OF_BOUNDS
ERR_BUFFER_TOO_LARGE
ERR_CANNOT_WATCH_SIGINT
ERR_CHILD_CLOSED_BEFORE_REPLY
ERR_CHILD_PROCESS_IPC_REQUIRED
ERR_CHILD_PROCESS_STDIO_MAXBUFFER
ERR_CLOSED_MESSAGE_PORT
ERR_CONSOLE_WRITABLE_STREAM
ERR_CONSTRUCT_CALL_INVALID
ERR_CONSTRUCT_CALL_REQUIRED
ERR_CONTEXT_NOT_INITIALIZED
ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED
ERR_CRYPTO_ECDH_INVALID_FORMAT
ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY
ERR_CRYPTO_ENGINE_UNKNOWN
ERR_CRYPTO_FIPS_FORCED
ERR_CRYPTO_FIPS_UNAVAILABLE
ERR_CRYPTO_HASH_FINALIZED
ERR_CRYPTO_HASH_UPDATE_FAILED
ERR_CRYPTO_INCOMPATIBLE_KEY
ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS
ERR_CRYPTO_INITIALIZATION_FAILED
ERR_CRYPTO_INVALID_AUTH_TAG
ERR_CRYPTO_INVALID_COUNTER
ERR_CRYPTO_INVALID_CURVE
ERR_CRYPTO_INVALID_DIGEST
ERR_CRYPTO_INVALID_IV
ERR_CRYPTO_INVALID_JWK
ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE
ERR_CRYPTO_INVALID_KEYLEN
ERR_CRYPTO_INVALID_KEYPAIR
ERR_CRYPTO_INVALID_KEYTYPE
ERR_CRYPTO_INVALID_MESSAGELEN
ERR_CRYPTO_INVALID_SCRYPT_PARAMS
ERR_CRYPTO_INVALID_STATE
ERR_CRYPTO_INVALID_TAG_LENGTH
ERR_CRYPTO_JOB_INIT_FAILED
ERR_CRYPTO_JWK_UNSUPPORTED_CURVE
ERR_CRYPTO_JWK_UNSUPPORTED_KEY_TYPE
ERR_CRYPTO_OPERATION_FAILED
ERR_CRYPTO_PBKDF2_ERROR
ERR_CRYPTO_SCRYPT_INVALID_PARAMETER
ERR_CRYPTO_SCRYPT_NOT_SUPPORTED
ERR_CRYPTO_SIGN_KEY_REQUIRED
ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH
ERR_CRYPTO_UNKNOWN_CIPHER
ERR_CRYPTO_UNKNOWN_DH_GROUP
ERR_CRYPTO_UNSUPPORTED_OPERATION
ERR_DEBUGGER_ERROR
ERR_DEBUGGER_STARTUP_ERROR
ERR_DLOPEN_FAILED
ERR_DIR_CLOSED
ERR_DIR_CONCURRENT_OPERATION
ERR_DNS_SET_SERVERS_FAILED
ERR_DOMAIN_CALLBACK_NOT_AVAILABLE
ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE
ERR_ENCODING_INVALID_ENCODED_DATA
ERR_ENCODING_NOT_SUPPORTED
ERR_EVAL_ESM_CANNOT_PRINT
ERR_EVENT_RECURSION
ERR_EXECUTION_ENVIRONMENT_NOT_AVAILABLE
ERR_FALSY_VALUE_REJECTION
ERR_FEATURE_UNAVAILABLE_ON_PLATFORM
ERR_FS_CP_DIR_TO_NON_DIR
ERR_FS_CP_EEXIST
ERR_FS_CP_EINVAL
ERR_FS_CP_FIFO_PIPE
ERR_FS_CP_NON_DIR_TO_DIR
ERR_FS_CP_SOCKET
ERR_FS_CP_SYMLINK_TO_SUBDIRECTORY
ERR_FS_CP_UNKNOWN
ERR_FS_EISDIR
ERR_FS_FILE_TOO_LARGE
ERR_FS_INVALID_SYMLINK_TYPE
ERR_HTTP_HEADERS_SENT
ERR_HTTP_INVALID_HEADER_VALUE
ERR_HTTP_INVALID_STATUS_CODE
ERR_HTTP_REQUEST_TIMEOUT
ERR_HTTP_SOCKET_ENCODING
ERR_HTTP_TRAILER_INVALID
ERR_HTTP2_ALTSVC_INVALID_ORIGIN
ERR_HTTP2_ALTSVC_LENGTH
ERR_HTTP2_CONNECT_AUTHORITY
ERR_HTTP2_CONNECT_PATH
ERR_HTTP2_CONNECT_SCHEME
ERR_HTTP2_ERROR
ERR_HTTP2_GOAWAY_SESSION
ERR_HTTP2_HEADER_SINGLE_VALUE
ERR_HTTP2_HEADERS_AFTER_RESPOND
ERR_HTTP2_HEADERS_SENT
ERR_HTTP2_INFO_STATUS_NOT_ALLOWED
ERR_HTTP2_INVALID_CONNECTION_HEADERS
ERR_HTTP2_INVALID_HEADER_VALUE
ERR_HTTP2_INVALID_INFO_STATUS
ERR_HTTP2_INVALID_ORIGIN
ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH
ERR_HTTP2_INVALID_PSEUDOHEADER
ERR_HTTP2_INVALID_SESSION
ERR_HTTP2_INVALID_SETTING_VALUE
ERR_HTTP2_INVALID_STREAM
ERR_HTTP2_MAX_PENDING_SETTINGS_ACK
ERR_HTTP2_NESTED_PUSH
ERR_HTTP2_NO_MEM
ERR_HTTP2_NO_SOCKET_MANIPULATION
ERR_HTTP2_ORIGIN_LENGTH
ERR_HTTP2_OUT_OF_STREAMS
ERR_HTTP2_PAYLOAD_FORBIDDEN
ERR_HTTP2_PING_CANCEL
ERR_HTTP2_PING_LENGTH
ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED
ERR_HTTP2_PUSH_DISABLED
ERR_HTTP2_SEND_FILE
ERR_HTTP2_SEND_FILE_NOSEEK
ERR_HTTP2_SESSION_ERROR
ERR_HTTP2_SETTINGS_CANCEL
ERR_HTTP2_SOCKET_BOUND
ERR_HTTP2_SOCKET_UNBOUND
ERR_HTTP2_STATUS_101
ERR_HTTP2_STATUS_INVALID
ERR_HTTP2_STREAM_CANCEL
ERR_HTTP2_STREAM_ERROR
ERR_HTTP2_STREAM_SELF_DEPENDENCY
ERR_HTTP2_TOO_MANY_INVALID_FRAMES
ERR_HTTP2_TRAILERS_ALREADY_SENT
ERR_HTTP2_TRAILERS_NOT_READY
ERR_HTTP2_UNSUPPORTED_PROTOCOL
ERR_ILLEGAL_CONSTRUCTOR
ERR_INCOMPATIBLE_OPTION_PAIR
ERR_INPUT_TYPE_NOT_ALLOWED
ERR_INSPECTOR_ALREADY_ACTIVATED
ERR_INSPECTOR_ALREADY_CONNECTED
ERR_INSPECTOR_CLOSED
ERR_INSPECTOR_COMMAND
ERR_INSPECTOR_NOT_ACTIVE
ERR_INSPECTOR_NOT_AVAILABLE
ERR_INSPECTOR_NOT_CONNECTED
ERR_INSPECTOR_NOT_WORKER
ERR_INTERNAL_ASSERTION
ERR_INVALID_ADDRESS_FAMILY
ERR_INVALID_ARG_TYPE
ERR_INVALID_ARG_VALUE
ERR_INVALID_ASYNC_ID
ERR_INVALID_BUFFER_SIZE
ERR_INVALID_CALLBACK
ERR_INVALID_CHAR
ERR_INVALID_CURSOR_POS
ERR_INVALID_FD
ERR_INVALID_FD_TYPE
ERR_INVALID_FILE_URL_HOST
ERR_INVALID_FILE_URL_PATH
ERR_INVALID_HANDLE_TYPE
ERR_INVALID_HTTP_TOKEN
ERR_INVALID_IP_ADDRESS
ERR_INVALID_MODULE
ERR_INVALID_MODULE_SPECIFIER
ERR_INVALID_PACKAGE_CONFIG
ERR_INVALID_PACKAGE_TARGET
ERR_INVALID_PERFORMANCE_MARK
ERR_INVALID_PROTOCOL
ERR_INVALID_REPL_EVAL_CONFIG
ERR_INVALID_REPL_INPUT
ERR_INVALID_RETURN_PROPERTY
ERR_INVALID_RETURN_PROPERTY_VALUE
ERR_INVALID_RETURN_VALUE
ERR_INVALID_STATE
ERR_INVALID_SYNC_FORK_INPUT
ERR_INVALID_THIS
ERR_INVALID_TRANSFER_OBJECT
ERR_INVALID_TUPLE
ERR_INVALID_URI
ERR_INVALID_URL
ERR_INVALID_URL_SCHEME
ERR_IPC_CHANNEL_CLOSED
ERR_IPC_DISCONNECTED
ERR_IPC_ONE_PIPE
ERR_IPC_SYNC_FORK
ERR_MANIFEST_ASSERT_INTEGRITY
ERR_MANIFEST_DEPENDENCY_MISSING
ERR_MANIFEST_INTEGRITY_MISMATCH
ERR_MANIFEST_INVALID_RESOURCE_FIELD
ERR_MANIFEST_INVALID_SPECIFIER
ERR_MANIFEST_PARSE_POLICY
ERR_MANIFEST_TDZ
ERR_MANIFEST_UNKNOWN_ONERROR
ERR_MEMORY_ALLOCATION_FAILED
ERR_MESSAGE_TARGET_CONTEXT_UNAVAILABLE
ERR_METHOD_NOT_IMPLEMENTED
ERR_MISSING_ARGS
ERR_MISSING_OPTION
ERR_MISSING_PASSPHRASE
ERR_MISSING_PLATFORM_FOR_WORKER
ERR_MISSING_TRANSFERABLE_IN_TRANSFER_LIST
ERR_MODULE_NOT_FOUND
ERR_MULTIPLE_CALLBACK
ERR_NAPI_CONS_FUNCTION
ERR_NAPI_INVALID_DATAVIEW_ARGS
ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT
ERR_NAPI_INVALID_TYPEDARRAY_LENGTH
ERR_NAPI_TSFN_CALL_JS
ERR_NAPI_TSFN_GET_UNDEFINED
ERR_NAPI_TSFN_START_IDLE_LOOP
ERR_NAPI_TSFN_STOP_IDLE_LOOP
ERR_NO_CRYPTO
ERR_NO_ICU
ERR_NON_CONTEXT_AWARE_DISABLED
ERR_OUT_OF_RANGE
ERR_PACKAGE_IMPORT_NOT_DEFINED
ERR_PACKAGE_PATH_NOT_EXPORTED
ERR_PERFORMANCE_INVALID_TIMESTAMP
ERR_PERFORMANCE_MEASURE_INVALID_OPTIONS
ERR_PROTO_ACCESS
ERR_REQUIRE_ESM
ERR_SCRIPT_EXECUTION_INTERRUPTED
ERR_SCRIPT_EXECUTION_TIMEOUT
ERR_SERVER_ALREADY_LISTEN
ERR_SERVER_NOT_RUNNING
ERR_SOCKET_ALREADY_BOUND
ERR_SOCKET_BAD_BUFFER_SIZE
ERR_SOCKET_BAD_PORT
ERR_SOCKET_BAD_TYPE
ERR_SOCKET_BUFFER_SIZE
ERR_SOCKET_CLOSED
ERR_SOCKET_DGRAM_IS_CONNECTED
ERR_SOCKET_DGRAM_NOT_CONNECTED
ERR_SOCKET_DGRAM_NOT_RUNNING
ERR_SRI_PARSE
ERR_STREAM_ALREADY_FINISHED
ERR_STREAM_CANNOT_PIPE
ERR_STREAM_DESTROYED
ERR_STREAM_NULL_VALUES
ERR_STREAM_PREMATURE_CLOSE
ERR_STREAM_PUSH_AFTER_EOF
ERR_STREAM_UNSHIFT_AFTER_END_EVENT
ERR_STREAM_WRAP
ERR_STREAM_WRITE_AFTER_END
ERR_STRING_TOO_LONG
ERR_SYNTHETIC
ERR_SYSTEM_ERROR
ERR_TLS_CERT_ALTNAME_INVALID
ERR_TLS_DH_PARAM_SIZE
ERR_TLS_HANDSHAKE_TIMEOUT
ERR_TLS_INVALID_CONTEXT
ERR_TLS_INVALID_PROTOCOL_METHOD
ERR_TLS_INVALID_PROTOCOL_VERSION
ERR_TLS_INVALID_STATE
ERR_TLS_PROTOCOL_VERSION_CONFLICT
ERR_TLS_PSK_SET_IDENTIY_HINT_FAILED
ERR_TLS_RENEGOTIATION_DISABLED
ERR_TLS_REQUIRED_SERVER_NAME
ERR_TLS_SESSION_ATTACK
ERR_TLS_SNI_FROM_SERVER
ERR_TRACE_EVENTS_CATEGORY_REQUIRED
ERR_TRACE_EVENTS_UNAVAILABLE
ERR_TRANSFORM_ALREADY_TRANSFORMING
ERR_TRANSFORM_WITH_LENGTH_0
ERR_TTY_INIT_FAILED
ERR_UNAVAILABLE_DURING_EXIT
ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET
ERR_UNESCAPED_CHARACTERS
ERR_UNHANDLED_ERROR
ERR_UNKNOWN_BUILTIN_MODULE
ERR_UNKNOWN_CREDENTIAL
ERR_UNKNOWN_ENCODING
ERR_UNKNOWN_FILE_EXTENSION
ERR_UNKNOWN_MODULE_FORMAT
ERR_UNKNOWN_SIGNAL
ERR_UNSUPPORTED_DIR_IMPORT
ERR_UNSUPPORTED_ESM_URL_SCHEME
ERR_VALID_PERFORMANCE_ENTRY_TYPE
ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING
ERR_VM_MODULE_ALREADY_LINKED
ERR_VM_MODULE_CACHED_DATA_REJECTED
ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA
ERR_VM_MODULE_DIFFERENT_CONTEXT
ERR_VM_MODULE_LINKING_ERRORED
ERR_VM_MODULE_LINK_FAILURE
ERR_VM_MODULE_NOT_MODULE
ERR_VM_MODULE_STATUS
ERR_WASI_ALREADY_STARTED
ERR_WASI_NOT_STARTED
ERR_WORKER_INIT_FAILED
ERR_WORKER_INVALID_EXEC_ARGV
ERR_WORKER_NOT_RUNNING
ERR_WORKER_OUT_OF_MEMORY
ERR_WORKER_PATH
ERR_WORKER_UNSERIALIZABLE_ERROR
ERR_WORKER_UNSUPPORTED_EXTENSION
ERR_WORKER_UNSUPPORTED_OPERATION
ERR_ZLIB_INITIALIZATION_FAILED
HPE_HEADER_OVERFLOW
HPE_UNEXPECTED_CONTENT_LENGTH
MODULE_NOT_FOUND

### (3) 实例

#### ① 静态属性

```js
const f1 = () => { throw new Error('error msg') }
const f2 = () => f1()
const f3 = () => f2()
f3()
```

![stackTraceLimit1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/stackTraceLimit1.png)

```js
Error.stackTraceLimit = 2

const f1 = () => { throw new Error('error msg') }
const f2 = () => f1()
const f3 = () => f2()
f3()
```

![stackTraceLimit2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/stackTraceLimit2.png)

#### ② 静态方法

```js
function ChildError1(){
    Error.captureStackTrace(this,ChildError1)
}
function ChildError2(){
    Error.captureStackTrace(this)
}
const childErr1 = new ChildError1()
const childErr2 = new ChildError2()
console.log(childErr1.stack)
console.log(childErr2.stack)
```

![captureStackTrace()](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/captureStackTrace().png)

## 3. SyntaxError 类

SyntaxError 类表示`程序不是有效的 JS 代码`

## 4. ReferenceError 类

ReferenceError 类表示`正在尝试访问未定义的变量`

## 5. TypeError 类

TypeError 类表示`参数不是允许的类型`

## 6. RangeError 类

RangeError 类表示`参数不在函数可接受值的范围内`

## 7. AssertionError 类

AssertionError 类表示`断言失败`

### (1) assert 模块

assert 模块提供了一组用于验证`常量`的断言函数 API

```js
定义：import assert from 'assert/strict'
方法：判断：
     assert.fail([msg])                               //抛出带有错误消息 msg 的 AssertionError 实例
     assert.ok(value,[msg])                           //判断 val 是否为真值
     assert.ifError(val)                              //判断 val 是否不是 undefined null
     相等：
     assert.equal(actual,expected,[msg])              //判断 actual expected 是否相等(不建议使用)
     assert.strictEqual(actual,expected,[msg])        //判断 actual expected 是否严格相等
     assert.deepEqual(actual,expected,[msg])          //判断 actual expected 是否深度相等(不建议使用)
     assert.deepStrictEqual(actual,expected,[msg])    //判断 actual expected 是否严格深度相等
     assert.notEqual(actual,expected,[msg])           //判断 actual expected 是否不相等(不建议使用)
     assert.notStrictEqual(actual,expected,[msg])     //判断 actual expected 是否不严格相等
     assert.notDeepEqual(actual,expected,[msg])       //判断 actual expected 是否不深度相等(不建议使用)
     assert.notDeepStrictEqual(actual,expected,[msg]) //判断 actual expected 是否不严格深度相等
     函数：
     assert.throws(fn,[err],[msg])                    //判断函数 f 是否抛出错误
     assert.doesNotThrow(f,[err],[msg])               //判断函数 f 是否未抛出错误
     正则：
     assert.match(string,regexp,[msg])                //判断字符串 str 与正则 regexp 是否匹配
     assert.doesNotMatch(str,regexp,[msg])            //判断字符串 str 与正则 regexp 是否不匹配
     Promise：
     assert.rejects(asyncFn,[err],[msg])              //判断 asyncFn promise 是否被拒绝
     assert.doesNotReject(asyncF,[err],[msg])         //判断 asyncFn promise 是否未被拒绝
```

### (2) assert.AssertionError 类

assert.AssertionError 类表示`断言错误`，assert 模块抛出的所有错误都是 AssertionError 类的实例

```js
定义：import assert from 'assert/strict'
     const assertErro = new assert.AssertionError(options)

options：
message      //如果提供，则错误消息将设置为此值
actual       //错误实例上的 actual 属性
expected     //错误实例上的 expected 属性
operator     //错误实例上的 operator 属性
stackStartFn //如果提供，则生成的堆栈跟踪将省略此函数之前的帧
```

## 8. SystemError 类

SystemError 类表示 `Node 运行时环境发生异常`，通常发生在 `Node 应用程序违反操作系统的约束`时

### (1) 常见的系统错误

* **ENOTFOUND 域名系统查找失败**：域名系统查找失败
* **EADDRINUSE 地址已被使用**：将服务器绑定本地地址失败，本地系统上另一台服务器已经占用该地址
* **ECONNREFUSED 连接被拒绝**：目录机器主动拒绝，无法建立连接
* **ECONNRESET 对等方重置连接**：对等方强制关闭连接，通常由于超时或重新启动导致远程套接字上的连接丢失导致
* **ETIMEDOUT 操作超时**：连接或发送请求失败，连接方在一段时间后没有正确响应
* **EPIPE 断开的管道**：对没有进程读取数据的管道、套接字、FIFO 的写操作，通常发生在写入流的远程端已关闭
* **EPERM 不允许操作**：视图执行超出当前权限的操作
* **EACCES 权限被拒绝**：以文件访问权限禁止的方式访问文件
* **EISDIR 是目录**：期望操作文件，但给定的路径是目录
* **ENOTDIR 不是目录**：期望操作目录，但给定的路径不是目录
* **ENOTEMPTY 目录不为空**：期望操作空目录，但给定的目录不为空
* **ENOENT 无此文件或目录**：给定的路径找不到文件或目录
* **EMFILE 系统打开文件过多**：已达到系统允许的文件描述符的最大数量
* **EEXIST 文件存在**：期望文件不存在，但给定的路径文件存在

### (2) SystemError 对象属性

```js
实例属性：
error.code    //返回错误码
error.message //返回错误描述
error.errno   //返回系统提供的错误号
error.info    //返回错误情况的额外细节
error.syscall //返回触发错误的系统调用名称
error.dest    //返回报告文件系统错误时的文件路径目标
error.path    //返回报告文件系统错误时的文件路径
error.address //返回网络连接失败的地址
error.port    //返回不可用的网络连接端口
```

## 9. OpenSSL 错误

OpenSSL 错误是`源自 crypto、tls 的错误`

```js
error.reason            //返回错误原因字符串
error.function          //返回错误源自的 OpenSSL 函数
error.library           //返回错误源自的 OpenSSL 库
error.opensslErrorStack //返回错误源自的 OpenSSL 库中错误源的上下文数组
```

## 10. Node 代码逻辑异常处理

在前端因为某些用户的特殊性，导致的逻辑 bug 会造成这个用户服务异常，在服务端如果没有做好异常保护，可能会导致整个进程退出，从而无法提供服务，中断所有人的请求，用户体验非常差，因此如何监控和保护进程安全就显得尤为重要，并且要`尽可能在最小处进行安全保护`，这样就能最小地影响用户，不会因为这个用户影响到整个服务的用户

以下是一个代码逻辑异常问题的部分汇总

![代码逻辑异常](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E4%BB%A3%E7%A0%81%E9%80%BB%E8%BE%91%E5%BC%82%E5%B8%B8.png)

### (1) null.property

由于 JS 是一个弱类型语言，因为如果没有对数据进行严格类型判断就进行逻辑处理，会导致代码服务异常，从而影响用户体验

```js
const data = {
    userinfo: {
        nick: 'node',
        name: 'nodejs',
        age: 10
    }
};
const nick = data.userinfo.nick;
data.userinfo = null; // 中间经过一系列处理，userinfo 被设置为了 null

const name = data.userinfo.name; // data.userinfo 出现异常
console.log("name:", name); // TypeError: Cannot read property 'name' of null
```

避免上述问题的方式非常简单，就是对每一层数据都进行校验

```js
const data = {
    userinfo: {
        nick: 'node',
        name: 'nodejs',
        age: 10
    }
};
const nick = data.userinfo.nick;
data.userinfo = null; // 中间经过一系列处理，userinfo 被设置为了 null

const name = data && data.userinfo && data.userinfo.name; // 先判断 data 再判断 data.userinfo
console.log("name:", name); // null
```

但是当数据结构非常复杂时，判断逻辑也会非常复杂，从而影响开发效率，为了解决这个问题可以使用 `lodash 库的 get 方法`

```js
const data = {
    userinfo: {
        nick: 'node',
        name: 'nodejs',
        age: 10
    }
};
const nick = data.userinfo.nick;
data.userinfo = null; // 中间经过一系列处理，userinfo 被设置为了 null

const name = _.get(data, 'userinfo.name', ''); // 使用 lodash._get 方法简化判断逻辑
console.log("name:", name); // ''
```

forEach、for 循环这类问题只需要判断是否为 null 就行了，因为 null.length 会引发报错

```js
const num = null;
const arr = [1, 2, 3];

if(num) {
    for(let i=0; i<num.length; i++) {
        console.log(num[i]);
    }
}

if(arr) {
    for(let i=0; i<arr.length; i++) {
        console.log(arr[i]);
    }
}
```

### (2) parameters error

parameters error 错误主要来源于 JSON.parse()，JSON.parse() 很多时候会比较自然地将`其他接口或第三方数据`拿来解析，但是往往会忽略非 JSON 字符串的问题

```js
const str = 'nodejs';

const obj = JSON.parse(str); // SyntaxError: Unexpected token o in JSON at position 1
```

JSON.parse() 通常需要进行 `try-catch` 判断

```js
const str = 'nodejs';

try {
    const obj = JSON.parse(str);
} catch(err) {
    console.log(err);
}
```

Node fs 模块很多时候会存在`权限不足或文件不存在`等问题，因此 fs 模块方法最好也使用 `try-catch` 进行异常处理

### (3) other errors

Node promise 应用越来越广泛，因此对于 Promise catch 处理也应该多有重视，每个 Promise 都应该进行 catch 处理

还有一些长连接服务，例如 Socket、Redis 等，需要在`连接异常`时进行处理
