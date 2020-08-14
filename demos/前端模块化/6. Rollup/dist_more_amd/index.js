define(['require'], function (require) { 'use strict';

  // 导出一个箭头函数
  var createHeading = () => {
    const element = document.createElement('h2');
    element.textContent = 'Hello Rollup';
    element.addEventListener('click', () => alert('Hello Rollup'));
    return element
  };

  var name = "张三";
  var version = "1.0";

  const heading = createHeading();
  document.body.append(heading);
  console.log(name, version);

  // from 后跟模块名导入
  // import { camelCase } from 'lodash-es'
  // console.log(camelCase('hello Rollup'))

  // 存在跨域问题
  new Promise(function (resolve, reject) { require(['./lodash-1f047adc'], resolve, reject) }).then(() => {
    console.log(camelCase('hello Rollup'));
  });

});
