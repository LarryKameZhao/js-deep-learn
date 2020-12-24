const { bind } = require('../src/index');
Function.prototype.bind2 = bind;
console.assert(Function.prototype.bind2 !== undefined);

const fn1 = function (p1, p2) {
  return this;
};
const newFn1 = fn1.bind2({ name: 'sss' });
console.assert(newFn1().name === 'sss');

const fn2 = function (p1, p2) {
  return [this, p1, p2];
};
const newFn2 = fn2.bind2({ name: 'sss' }, 123, 456);
console.assert(newFn2()[0].name === 'sss');
console.assert(newFn2()[1] === 123);
console.assert(newFn2()[2] === 456);
