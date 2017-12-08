import Tween from './tween.js'

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60)
          }
})()

export function animate ({
  target,
  style,
  from = 0,
  to,
  time = 20,
  timingFun = 'Quad.InOut'
}) {
  return new Promise((resolve, reject)=>{
    let t = 0, b = from > to ? to : from, c = from > to ? from : to, d = time
    let step = function () {
      let split = timingFun.indexOf('.') !== -1 ? timingFun.split('.') : null
      let value = 0
      if (split) {
        value = Tween[split[0]][split[1]](t, b, c, d)
      } else {
        value = Tween[timingFun](t, b, c, d)
      }
      if (from > to) {
        value = from - value
        value = value > to ? value : to
        target.style[style] = value + 'px'
      } else {
        target.style[style] = value === to ? (to + 'px') : (value + 'px')
      }
      t++
      if (t <= d) {
        requestAnimFrame(step)
      } else {
        cancelAnimationFrame(step)
        resolve()
      }
    }
    step()  
  })  
}

