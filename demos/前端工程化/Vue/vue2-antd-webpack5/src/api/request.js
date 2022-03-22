import axios from 'axios'

// 创建 axios 实例
const instance = axios.create({
    baseURL: '/api', 
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken();
        // }
        config.headers.post['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        const { code, data, message } = response.data;

        if (code !== 200) {
            this.$message.error({
                content: message || 'request error',
                duration: 5 * 1000
            })

            // 50008: 非法 token，50012: 其他客户端登录，50014: Token 过期
            if (code === 50008 || code === 50012 || code === 50014) {
                this.$confirm({
                    content: '你已被登出，可以取消继续留在该页面，或者重新登录',
                    okText: '重新登录',
                    cancelText: '取消',
                }).then(() => {
                    location.reload()
                })
            }

            return Promise.reject('error')
        } else {
            return data
        }
    },
    error => {
        console.log('err' + error);
        this.$message.error({
            content: error.message,
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

const requestInstance = result => {
    const { url, method, data, config } = result;

    if (!method) return instance.all(result);

    const params = method === 'post' ? data : { params: data };
    return instance[method](url, params, config || {});
}

export default {
    install(vm) {
        vm.prototype.$http = requestInstance;
    }
};