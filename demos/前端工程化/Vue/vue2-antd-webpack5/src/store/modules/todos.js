const todos = {
    state: {
        todos: [
            { id: 1, text: 'he', done: true },
            { id: 2, text: 'ha', done: false }
        ]
    },
    getters: {
        //getters 返回属性，会缓存结果，只有依赖项改变才会重新计算
        doneTodos: state => state.todos.filter(item => item.done),
        doneTodosCount: (state, getters, rootState) => getters.doneTodos.length,
        //getters 返回函数，每次都会调用不会缓存结果
        getTodoById: state => id => state.todos.find(item => item.id === id)
    },
    mutations: {
        //同步函数
        addTodoNewProp(state, { id, newPropName, newPropValue }, rootState) {
            const currIndex = state.todos.findIndex(item => item.id === id)
            const currTodo = state.todos[currIndex]
            const newTodo = { ...currTodo, [newPropName]: newPropValue }
            this.$set(state.todos, state.todos[currIndex], newTodo)
        }
    },
    actions: {
        //异步函数，actions 只能提交 mutations
        async getTodoNewPropValue({ state, commit, dispatch, rootState }, { id, newPropName }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        id,
                        newPropName,
                        newPropValue: '小可爱'
                    })
                }, 1000)
            })
        },
        async AddTodoNewPropValue({ state, commit, dispatch, rootState }, { id, newPropName }) {
            //提交 mutation
            commit('addTodoProp', state, await this.getTodoNewPropValue({ id, newPropName }))
        }
    }
}
export default todos