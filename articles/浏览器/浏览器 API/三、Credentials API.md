# 三、Credentials API

## 1. Credential API

Credential API 允许网站存储和检索，账户密码、联合账户、公钥证书，这些功能允许用户在不输入密码的情况下登录，查看曾经登录到的站点的联合帐户，并且在会话过期且没有显式的登录流程的情况下恢复会话

### (1) 子域共享凭据（Subdomain-shared credentials）

Credential API 允许从不同的子域检索凭证，例如存储在 login.example.com 中的密码可用于登录 www.example.com，要利用这一点，必须通过调用 CredentialsContainer.store() 显式存储密码，这有时被称为公共后缀列表匹配（PSL），但是规范仅建议使用 PSL 来确定凭证的有效范围，子域共享凭据不需要它，因此浏览器的实现可能会有所不同

### (2) Web 身份验证（Web authentication）

## 2. CredentialsContainer 对象

CredentialsContainer 对象表示

```js
定义：const credentialsContainer = navigator.credentials
方法：credentials.get()                 //返回 Promise 实例,
     credentials.create()              //返回 Promise 实例,
     credentials.store()               //返回 Promise 实例,
     credentials.preventSilentAccess() //返回 Promise 实例,
```

## 3. Credential 对象

Credential 对象表示`凭据`，可以是以下 3 种类型

* PasswordCredential：密码凭据
* FederatedCredential：联合凭据
* PublicKeyCredential：公钥凭据

```js
定义：const passwordCredentials = new PasswordCredential()
     const publicKeyCredentials = new PublicKeyCredential()
     const federatedCredential = new FederatedCredential()
属性：credentials.id   //返回当前凭据的ID
     credentials.type //返回当前凭据的类型(password,public-key,federated)
```

### (1) PasswordCredential 对象

PasswordCredential 对象表示`密码凭据`，继承了 Credential 对象

```js
定义：const passwordCredentials = new PasswordCredential()
属性：passwordCredentials.name     //
     passwordCredentials.password //
     passwordCredentials.iconURL  //
```

### (2) FederatedCredential 对象

FederatedCredential 对象表示`联合凭据`，继承了 Credential 对象

```js
定义：const federatedCredential = new FederatedCredential()
属性：federatedCredential.provider //
     federatedCredential.protocol //
```

### (3) PublicKeyCredential 对象

PublicKeyCredential 对象表示`公钥凭据`，继承了 Credential 对象

```js
定义：const publicKeyCredentials = new PublicKeyCredential()
属性：publicKeyCredentials.rawId    //
     publicKeyCredentials.response //
方法：publicKeyCredentials.getClientExtensionResults()                     //
     publicKeyCredentials.isUserVerifyingPlatformAuthenticatorAvailable() //返回Promise实例,
```

## 4. 实例

```html

```

```js

```
