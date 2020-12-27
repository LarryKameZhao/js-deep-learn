var slice = Array.prototype.slice;
function bind(asThis) {
  var args = slice.call(arguments, 1);
  var fn = this;
  if (typeof fn !== 'function') {
    throw new Error('bind 必须使用在函数上');
  }
  function resultFn() {
    var args2 = slice.call(arguments, 0);
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis,
      args.concat(args2)
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}
function _bind(asThis, ...args) {
  const fn = this;
  return function (...args2) {
    return fn.call(asThis, ...args, ...args2);
  };
}
module.exports = {
  bind,
};
if (!Function.prototype.bind) {
  Function.prototype.bind = bind;
}
