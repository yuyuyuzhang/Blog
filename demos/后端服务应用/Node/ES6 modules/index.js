const ename = new Event('MOUSE_DOWN')
const target = new EventTarget();

target.addEventListener(ename, e => {
  console.log('foo event happened!');
  console.log(e)
});
target.dispatchEvent(ename)
