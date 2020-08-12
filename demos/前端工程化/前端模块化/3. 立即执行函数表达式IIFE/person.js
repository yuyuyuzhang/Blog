//模块成员放到立即执行函数表达式中成为私有成员
(function(){
  var person = {
    name: '张三',
    friends: ['王五', '赵六'],
    getName(){
      console.log(this.name);
    }
  };

  //声明一个全局对象作为命名空间
  window.modulePerson = {
    //将要对外暴露的私有成员挂载到命名空间上
    person: person
  } 
})()
