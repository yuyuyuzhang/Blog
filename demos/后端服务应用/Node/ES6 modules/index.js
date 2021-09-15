import { URL, URLSearchParams } from 'url'

// const url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1')
// const searchParams1 = url.searchParams

let urlSearch = new URLSearchParams({'f2': 2, 'f1': 1})

urlSearch.append('f2', 3);
console.log(urlSearch.toString());   //"f2=2&f1=1&f2=3"
console.log(urlSearch.get('f3'));    //null
console.log(urlSearch.get('f2'));    //"2"
console.log(urlSearch.getAll('f2')); //Array ["2", "3"]

urlSearch.set('f2', 4); 
urlSearch.set('f2', 5); 
urlSearch.set('f1', 1); 
console.log(urlSearch.toString());   //"f2=5&f1=1",重复设置则覆盖

urlSearch.sort();
console.log(urlSearch.toString());   //"f1=1&f2=5",同名键则顺序不变

for(let item of urlSearch.keys()){
  console.log(item); //"f1" "f2"
}
for(let item of urlSearch.values()){
  console.log(item); //"1" "5"
}
for(let item of urlSearch.entries()){
  console.log(item); //Array ["f1", "1"] ["f2", "5"]
}









