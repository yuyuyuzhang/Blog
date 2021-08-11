const a = 1;
const f = () => console.log(a);

export * as all from './person.js'; //输出 person 模块除默认接口以外的所有其他接口
export { a };                //输出自定义接口
export default f;            //输出默认接口