# 九、Node 缓存系统

## 1. 缓存

缓存是临时的一块存储空间，用于存放访问频次较高的数据，用空间换取响应速度，核心是减少用户对数据库的查询压力

* **临时**：为了避免存储空间的浪费，应该尽量设置数据缓存的时间，过期时自动销毁
* **存储空间**：一般选择读写性能较高的本地内存或共享内存，有些会应用 SSD 进一步提高性能
* **数据库的查询压力**：需要将一些复杂的数据库查询进行缓存，减少数据库的访问压力，从而提升对用户的响应速度

## 2. 缓存问题

如果没有应用好缓存，将会导致一些`不可见或很难定位的现网事故`

### (1) 缓存雪崩

在上面的概念中，有一个关键词是`临时`，因此大部分缓存数据都有一个`过期时间`的概念，假设一批数据通过定时服务从数据库写入缓存，然后统一设置了过期时间，当这个时间节点到了，但由于某种原因数据没有从数据库写入缓存，这时候获取这些数据只能前往数据库查询最新数据，从而引起数据库查询压力，导致数据库并发过大而瘫痪无法正常提高服务

那么应该如何应对缓存雪崩呢？

* 避免所有数据都设置同一个过期时间，应该按照数据类型、数据更新时效性来设置
* 数据过期时间应大于数据更新时间，并考虑更新时长，同时增加更新失败异常告警提示
* 对于访问频次较高或数据库查询压力较大的数据，可不设置过期时间，主动从程序上控制该数据的移除或更替

### (2) 缓存击穿

在上面的概念中，有一个关键词是`访问频次较高的数据`，类似于缓存雪崩但并非大面积的失效，如果某个访问频次较高的数据缓存失效了，导致这一刻的所有高并发请求都穿透到了数据库，从而数据库并发压力较高，响应较慢，进一步导致数据库异常，影响其他业务

那么应该如何应对缓存击穿呢？

* 对于访问频次较高或数据库查询压力较大的数据，可不设置过期时间，主动从程序上控制该数据的移除或更替
* 对于访问频次较高或数据库查询压力较大的数据，如果需要设置缓存过期时间，必须大于缓存更新时间，避免过期无法找到键
* 使用原子操作方案，当多个数据都需要前往数据库查询同一个数据时，告知程序缓存正在生成中，并且告知其他程序可以读取上一次缓存数据，避免同时读取同一份数据

### (3) 缓存穿透

在上面的概念中，有一个关键词是`访问频次较高的数据`，这就可能出现查询信息是`空数据`的情况，空数据按理不属于访问频次较高的数据，因此从缓存中查询，但是没有缓存空数据，所以直接穿透进入了数据库，虽然数据库查询也是空数据，但还是要经过数据库的查询，这种现象就是击穿了缓存直接前往数据库查询

那么应该如何应对缓存击穿呢？

* **过滤非正常请求数据**：例如从一些参数就知道为空的请求，可以直接从程序上处理
* **缓存空数据**：为了提升性能，可以将一些查询出的空数据缓存起来，这样用户下次访问时可以直接从缓存中判断返回，但是空数据较多时会浪费内存空间，可以将这些空数据的键名，使用`布隆过滤器`来缓存，这种可以尽可能减少内存占用，且更加高效

## 3. 多级缓存

### (1) 多级缓存实现

基于`本地缓存`和`共享内存`实现一个 Node 缓存库，关于本地缓存，可以借助第三方库 `node-cache`，关于共享内存，可以借助第三方库 `node-redis`，

* npm i node-cache redis
* util/cache.js

```js
import redis from 'redis'
import NodeCache from 'node-cache'
import { promisify } from 'util'

class Cache {
    constructor(localCacheEnable=true, redisEnable=true) {
        this.localCacheEnable = localCacheEnable;
        this.redisEnable = redisEnable;
        if(localCacheEnable){
            this.myCache = new NodeCache();
        }

        if(redisEnable) {
            this.client = redis.createClient({
                host: 'redis-17353.c245.us-east-1-3.ec2.cloud.redislabs.com',
                port: 17353,
                password: 'nodejs@2021',
                db: 0
            });
        }
    }

    /**
     * 
     * @description 获取缓存信息
     * @param {string} key 
     */
    async get(key) {
        let value;
        if(this.localCacheEnable) {
            value = this.myCache.get(key);
            console.log(`local value is ${value}`);
        }
        if(!value && this.redisEnable) {
            try {
                value = await promisify(this.client.get).bind(this.client)(key);
                console.log(`redis value is ${value}`)
            } catch (err){
                console.log(err);
            }
        }
        return value;
    }

    /**
     * 
     * @description 保存缓存信息
     * @param {string} key 缓存key
     * @param {string} value 缓存值
     * @param {int} expire 过期时间/秒
     * @param {boolean} cacheLocal 是否本地缓存
     */
    async set(key, value, expire=10, cacheLocal=false) {
        let localCacheRet, redisRet;
        if(this.localCacheEnable && cacheLocal) {
            localCacheRet = this.myCache.set(key, value, expire);
        }
        if(this.redisEnable) { 
            try {
                redisRet = await promisify(this.client.set).bind(this.client)(key, value, 'EX', expire);
            } catch (err){
                console.log(err);
            }
        }
        return localCacheRet || redisRet;
    }
}

export default Cache;
```

* controller/cache.js

```js
import Controller from '../core/controller.js';
import Cache from '../util/cache.js';

const localCache = new Cache(true, false);
const redisCache = new Cache(false, true);
const bothCache = new Cache(true, true);

class LocalCache extends Controller {
    async local() {
        const cacheKey = 'sum_result';
        let result = await localCache.get(cacheKey);
        if(!result){ // result 为函数本地内存缓存
            result = 0;
            for(let i=0; i<1000000000; i++){
                result = result + i;
            }
            localCache.set(cacheKey, result, 10, true).then();
        }
        return this.resApi(true, 'success', `sum 0 - 1000000000 is ${result}`);
    }

    async redis(){
        const cacheKey = 'sum_result';
        let result = await redisCache.get(cacheKey);
        if(!result){ // result 为函数本地内存缓存
            result = 0;
            for(let i=0; i<1000000000; i++){
                result = result + i;
            }
            redisCache.set(cacheKey, result, 10).then();
        }
        return this.resApi(true, 'success', `sum 0 - 1000000000 is ${result}`);
    }

    async both() {
        const cacheKey = 'sum_result';
        let result = await bothCache.get(cacheKey);
        if(!result){ // result 为函数本地内存缓存
            result = 0;
            for(let i=0; i<1000000000; i++){
                result = result + i;
            }
            bothCache.set(cacheKey, result, 600, true).then();
        }
        return this.resApi(true, 'success', `sum 0 - 1000000000 is ${result}`);
    }
}

export default LocalCache;
```

### (2) 实际效果演示

①②③④⑤⑥⑦⑧⑨⑩
