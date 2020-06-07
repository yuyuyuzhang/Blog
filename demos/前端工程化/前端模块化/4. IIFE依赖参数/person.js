var modulePerson = {}; //声明一个全局对象作为命名空间
var modulePersonJob = {};
 
//模块成员放到立即执行函数表达式中成为私有成员
(function(modulePersonJob){
  var person = {
    name: '张三',
    friends: ['王五', '赵六'],
    job: modulePersonJob.jobs[1],
    getName(){
      console.log(this.name);
    }
  };

  //将要对外暴露的私有成员挂载到命名空间上
  modulePerson.person = person;
})(modulePersonJob)

