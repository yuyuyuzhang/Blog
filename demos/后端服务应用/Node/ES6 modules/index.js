const target1 = new EventTarget();
target1.addEventListener('MOUSE_DOWN', event => {
  console.log('MOUSE_DOWN:', event)
});
// target.dispatchEvent(e)

const target2 = new EventTarget();
target2.addEventListener('foo', event => {
  console.log('foo:', event);
});
target2.dispatchEvent('foo')


