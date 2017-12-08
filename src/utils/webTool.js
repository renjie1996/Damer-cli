;(function () {
  function webTool () {
    this.wrapper = null
    this.el = null
    this.width = 0
    this.height = 0
    this.maxW = 0
    this.maxH = 0
    this.relativeX = 0
    this.relativeY = 0
    this.cache = {
      startX: 0,
      startY: 0,
      curTX: 0,
      curTY: 0,
      curRX: 0,
      curRY: 0,
      curBX: 0,
      curBY: 0,
      curLX: 0,
      curLY: 0,
      rx: 0,
      ry: 0,
      rotate: 0
    }
    this.cacheRotate = null
    this.dragSwitch = false
    this.stretchXYTSwitch = false
    this.stretchXYRSwitch = false
    this.stretchXYBSwitch = false
    this.stretchXYLSwitch = false
    this.stretchXRSwitch = false
    this.stretchXLSwitch = false
    this.stretchYTSwitch = false
    this.stretchYBSwitch = false
    this.rotateSwitch = false
  }
  // 初始化，记录初始状态
  webTool.prototype.init = function (el) {
    let wrapper = this.wrapper = el.parentNode
    let relative = wrapper.getBoundingClientRect()
    let t = document.documentElement || document.body.parentNode
    let scrollTop = (typeof t.scrollTop == 'number' ? t : document.body).scrollTop
    let width = this.width = el.offsetWidth
    let height = this.height = el.offsetHeight
    this.el = el
    this.relativeX = +(relative.left)
    this.relativeY = +(relative.top + scrollTop)
    this.maxW = wrapper.offsetWidth - width
    this.maxH = wrapper.offsetHeight - height
    document.addEventListener('mouseup', this.clear.bind(this))
    el.addEventListener('mouseup', this.setCache.bind(this))
  }
  // 清除函数
  webTool.prototype.clear = function () {
    if (this.rotateSwitch) {
      this.cache.rotate = this.cacheRotate
    }
    this.dragSwitch = false
    this.stretchXYTSwitch = false
    this.stretchXYRSwitch = false
    this.stretchXYBSwitch = false
    this.stretchXYLSwitch = false
    this.stretchXRSwitch = false
    this.stretchXLSwitch = false
    this.stretchYTSwitch = false
    this.stretchYBSwitch = false
    this.rotateSwitch = false
  }
  webTool.prototype.destroy = function () {
    document.removeEventListener('mouseup', this.clear)
    this.el.removeEventListener('mouseup', this.setCache)
  }
  // 拖拽初始化
  webTool.prototype.dragInit = function (e) {
    let wrapper = this.wrapper
    let el = this.el
    let left = parseInt(el.style.left) || 0
    let top = parseInt(el.style.top) || 0
    let x = e.pageX - left
    let y = e.pageY - top
    this.cache.startX = x
    this.cache.startY = y
    this.dragSwitch = true
  }
  // 拖拽
  webTool.prototype.drag = function (e) {
    if (!this.dragSwitch) return
    let wrapper = this.wrapper
    let el = this.el
    let cache = this.cache
    let x = e.pageX - cache.startX
    let y = e.pageY - cache.startY
    let w = parseInt(el.offsetWidth)
    let h = parseInt(el.offsetHeight)
    let maxW = wrapper.offsetWidth - w
    let maxH = wrapper.offsetHeight - h
    /* x = x < 0 ? 0 : x > maxW ? maxW : x
    y = y < 0 ? 0 : y > maxH ? maxH : y */
    el.style.position = 'absolute'
    el.style.left = x + 'px'
    el.style.top = y + 'px'
    this.setCache()
  }
  webTool.prototype.setCache = function () {
    let el = this.el
    let cache = this.cache
    let x = parseInt(el.style.left)
    let y = parseInt(el.style.top)
    let w = this.width = parseInt(el.offsetWidth)
    let h = this.height = parseInt(el.offsetHeight)
    cache.curTX = x
    cache.curTY = y
    cache.curRX = x + w
    cache.curRY = y
    cache.curBX = x + w
    cache.curBY = y + h
    cache.curLX = x
    cache.curLY = y + h
  }
  // 拉伸初始化
  webTool.prototype.stretchXYTInit = function () {
    this.stretchXYTSwitch = true
  }
  webTool.prototype.stretchXYRInit = function () {
    this.stretchXYRSwitch = true
  }
  webTool.prototype.stretchXYBInit = function () {
    this.stretchXYBSwitch = true
  }
  webTool.prototype.stretchXYLInit = function () {
    this.stretchXYLSwitch = true
  }
  webTool.prototype.stretchXRInit = function () {
    this.stretchXRSwitch = true
  }
  webTool.prototype.stretchXLInit = function () {
    this.stretchXLSwitch = true
  }
  webTool.prototype.stretchYTInit = function () {
    this.stretchYTSwitch = true
  }
  webTool.prototype.stretchYBInit = function () {
    this.stretchYBSwitch = true
  }
  // 拉伸
  webTool.prototype.stretch = function (e) {
    if (!this.stretchXYTSwitch 
      && !this.stretchXYRSwitch 
      && !this.stretchXYBSwitch 
      && !this.stretchXYLSwitch 
      && !this.stretchXRSwitch 
      && !this.stretchXLSwitch 
      && !this.stretchYTSwitch 
      && !this.stretchYBSwitch) return
    let el = this.el
    let cache = this.cache
    let x = e.pageX - this.relativeX
    let y = e.pageY - this.relativeY
    let tx = cache.curTX
    let ty = cache.curTY
    let w = parseInt(el.offsetWidth)
    let h = parseInt(el.offsetHeight)
    let ratio = this.width / this.height
    if (this.stretchXYTSwitch) {
      if (x > cache.curBX) return
      el.style.left = x + 'px'
      el.style.top = ty - (tx - x) / ratio + 'px'
      el.style.width = cache.curBX - x + 'px'
      el.style.height = cache.curBY - (ty - (tx - x) / ratio) + 'px'
    } else if (this.stretchXYRSwitch) {
      if (y > cache.curBY) return
      el.style.top = y + 'px'
      el.style.width = (cache.curBY - y) * ratio + 'px'
      el.style.height = cache.curBY - y + 'px'
    } else if (this.stretchXYBSwitch) {
      el.style.width = x - tx + 'px'
      el.style.height = (x - tx) / ratio + 'px'
    } else if (this.stretchXYLSwitch) {
      if (x > cache.curBX) return
      el.style.left = x + 'px'
      el.style.width = cache.curRX - x + 'px'
      el.style.height = (cache.curRX - x) / ratio + 'px'
    } else if (this.stretchXRSwitch) {
      el.style.width = x - tx + 'px'
    } else if (this.stretchXLSwitch) {
      if (x > cache.curBX) return
      el.style.left = x + 'px'
      el.style.width = cache.curBX - x + 'px'
    } else if (this.stretchYTSwitch) {
      if (y > cache.curBY) return
      el.style.top = y + 'px'
      el.style.height = cache.curBY - y + 'px'
    } else if (this.stretchYBSwitch) {
      el.style.height = y - ty + 'px'
    }
    
  }
  // 旋转初始化
  webTool.prototype.rotateInit = function (e) {
    let cache = this.cache
    this.rotateSwitch = true
    cache.rx = e.pageX - this.relativeX
    cache.ry = e.pageY - this.relativeY
  }
  // 旋转
  webTool.prototype.rotate = function (e) {
    if (!this.rotateSwitch) return
    let el = this.el
    let cache = this.cache
    let elW = parseInt(el.offsetWidth)
    let elH = parseInt(el.offsetHeight)
    let x = e.pageX - this.relativeX
    let y = e.pageY - this.relativeY
    let positionX = cache.curTX
    let positionY = cache.curTY
    let rotatePoint = {
      x: positionX + elW / 2,
      y: positionY + elH / 2
    }
    let ox = x - rotatePoint.x
    let oy = y - rotatePoint.y
    let to = Math.abs(ox / oy)
    let angle = (Math.atan(to) / ( 2 * Math.PI ) * 360)
    if ( ox < 0 && oy < 0) angle = -angle
    else if( ox < 0 && oy > 0) angle = -( 180 - angle )
    else if( ox > 0 && oy < 0) angle = angle
    else if( ox > 0 && oy > 0) angle = 180 - angle
    el.style.transformOrigin = 'center center'
    el.style.webkitTransformOrigin = 'center center'
    el.style.transform = `rotate(${angle}deg)`
    el.style.webkitTransform = `rotate(${angle}deg)`
    this.cacheRotate = angle

  }
  webTool.create = function () {
    return new webTool()
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = webTool
  } else {
    window.webTool = webTool
  }
}())