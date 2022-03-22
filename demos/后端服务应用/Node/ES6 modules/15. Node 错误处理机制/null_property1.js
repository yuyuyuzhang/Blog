import _ from 'lodash'

const data = {
    'userinfo' : {
        'nick' : 'node',
        'name' : 'nodejs',
        'age'  : 10
    }
};
const nick = data.userinfo.nick;
data.userinfo = null; // 中间经过一系列处理，userinfo 被设置为了 null

// const name = data.userinfo.name; // data.userinfo 出现异常
// const name = data && data.userinfo && data.userinfo.name; // 先判断 data 再判断 data.userinfo
const name = _.get(data, 'userinfo.name', ''); // 使用 lodash._get 方法简化判断逻辑
console.log("name:", name); // 0