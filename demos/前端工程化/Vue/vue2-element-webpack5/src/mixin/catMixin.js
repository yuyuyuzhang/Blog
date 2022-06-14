export default {
    name: 'resource',
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        getTableData() {
            this.tableData = [
                { name: '三胖', gender: 'male', age: 2, weight: 17 },
                { name: '四旁', gander: 'female', age: 1.5, weight: 9 }
            ]
        }
    }
};