export function getScroll(target, top) {
  // pageXOffset 设置或返回当前页面相对于窗口显示区左上角的 X 位置。pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。
  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  let ret = target[prop];
  if (typeof ret !== 'number') {//ie
    ret = window.document.documentElement[method];
  }
  return ret;
}
export function getTargetRect(target) {
  return target !== window ?
    target.getBoundingClientRect() :
    { top: 0, left: 0, bottom: 0 };
}
// 获取element相对于target的位置
export function getOffset(element, target) {
  // 元素距离页面距离
  const elemRect = element.getBoundingClientRect(); // 元素距离屏幕左上角距离
  const targetRect = getTargetRect(target);

  const scrollTop = getScroll(target, true);
  const scrollLeft = getScroll(target, false);

  const docElem = window.document.body;
  const clientTop = docElem.clientTop || 0;
  const clientLeft = docElem.clientLeft || 0;

  return {
    top: elemRect.top - targetRect.top +
    scrollTop - clientTop,
    left: elemRect.left - targetRect.left +
    scrollLeft - clientLeft,
  };
}
export function scrollToTop (target, offset={top: 0}) {
  target.offsetParent.scrollTop=offset.top;
}