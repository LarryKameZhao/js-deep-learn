function bind(asThis, ...args1) {
  const fn = this;
  function resultFn(...args2) {
    return fn.call(
      this instanceof resultFn ? this : asThis,
      ...args1,
      ...args2
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}
module.exports = {
  bind,
};
