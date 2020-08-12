(function(modulePerson){
  var jobs = ['doctor', 'teacher', 'police'];
  var person = {
    job: 'police'
  };

  window.moduleJob = {
    person: person,
    jobs: jobs,
    person1: modulePerson.person //依赖模块的对象
  }
})(modulePerson) //依赖模块作为参数传入

