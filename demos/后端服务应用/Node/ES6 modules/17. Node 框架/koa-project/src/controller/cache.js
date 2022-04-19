import Controller from '../core/controller.js';
import UtilCache from '../util/cache.js';

const localCache = new UtilCache(true, false);
const redisCache = new UtilCache(false, true);
const bothCache = new UtilCache(true, true);

class ControllerCache extends Controller {
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

export default ControllerCache;