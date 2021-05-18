# 二十、Intl.RelativeTimeFormat API

## 1. Intl.RelativeTimeFormat 对象

很多日期库都支持`相对时间`，例如昨天、5 分钟前等等，由于各国语言不同，相关时间中`相关词语及日期显示格式`不同，造成这些日期库的体积非常大

现在浏览器提供内置 Intl.RelativeTimeFormat 对象直接显示相对时间而无需使用这些日期库，浏览器原生提供 Intl.RelativeTimeFormat() 构造函数，构造函数参数 lang 指定显示相对时间的语言，例如 zh、en 等

```javascript
定义：const rtf = new Intl.RelativeTimeFormat(lang);
方法：rtf.format(num,unit)        //返回相对时间字符串,指定时间间隔的数值num和单位unit
```

时间间隔的单位 unit 有如下 8 个值

* second：秒
* miunte：分
* hour：时
* day：天
* week：周
* month：月
* quarter：季
* year：年

```javascript
const rtfEn = new Intl.RelativeTimeFormat('en');
const rtfZh = new Intl.RelativeTimeFormat('zh');

console.log(rtfEn.format(-5, 'month')) //5 months ago
console.log(rtfZh.format(-5, 'month')) //5 个月前
```
