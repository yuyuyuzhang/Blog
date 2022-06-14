import Vue from 'vue'
import Confirm from './Confirm.vue'

// 创建子类构造器
const confirmStructor = Vue.extend(Confirm)  

const theConfirm = options => {
    // 实例化子类构造器并挂载到指定节点
    const confirmDom = new confirmStructor({
        el: document.createElement('div')
    })
    document.body.appendChild(confirmDom.$el)

    // 初始化组件参数
    options.title && (confirmDom.options.title = options.title)
    options.msg && (confirmDom.options.msg = options.msg)
    options.btn_ok_name && (confirmDom.options.btn_ok_name = options.btn_ok_name)
    options.btn_no_name && (confirmDom.options.btn_no_name = options.btn_no_name)
    confirmDom.options.ok_cb = options.ok_cb
    confirmDom.options.no_cb = options.no_cb
}

export default theConfirm