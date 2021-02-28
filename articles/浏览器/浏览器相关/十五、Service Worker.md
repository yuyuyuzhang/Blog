# 十五、Service Worker

## 1. Service Worker

Service Worker 本质上是`浏览器和服务器间的代理服务器`，如果网站注册了 Service Worker，那么 Service Worker 就可以`拦截当前网站的所有请求`，如果需要向服务器发起请求就转发给服务器，如果可以直接使用缓存就直接返回缓存，从而大大提高浏览体验

Service Worker 基于 `Web Worker`
Service Worker 在 Web Worker 的基础上增加了`离线缓存`的能力，创建了有效的离线体验，将不常更新的内容缓存在服务器，提高浏览体验
Service Worker 可以让开发者自己管理缓存的内容及版本
Service Worker 完全`异步`，无法访问同步 API：XHR、Storage，可以访问异步 API：IndexedDB
Service Worker 只能由 `HTTPS` 承载，毕竟将修改网络请求的能力暴露给中间人攻击十分危险
Service Worker 由事件驱动，具有`生命周期：下载、安装、激活`
Service Worker 支持`推送`

①②③④⑤⑥⑦⑧⑨⑩
