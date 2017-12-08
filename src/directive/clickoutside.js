export default {
  bind (el, binding, vnode) {
    el.documentHandler = (e) => {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        (vnode.context)[binding.expression]();
      }
    };
    document.addEventListener('click', el.documentHandler);
  },
  update () {
  },
  unbind (el, binding, vnode) {
    document.removeEventListener('click', el.documentHandler);
  }
};