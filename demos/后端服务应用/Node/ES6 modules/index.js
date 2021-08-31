const target = new EventTarget()

target.addEventListener('open', function(e) {
    console.log(e)
})
target.dispatchEvent('open')


