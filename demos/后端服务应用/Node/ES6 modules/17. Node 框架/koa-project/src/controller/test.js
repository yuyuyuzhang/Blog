import Controller from '../core/controller.js'

class Content extends Controller {
    list() {
        return this.resApi(true, [
            { name: '张三', age: 20 },
            { name: '李四', age: 22 }
        ]);
    }
}

export default Content;