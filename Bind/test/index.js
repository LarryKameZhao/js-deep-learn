const { bind } = require('../src/index');
Function.prototype.bind2 = bind;
console.assert(Function.prototype.bind2 !== undefined);

const fn1 = function () {
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

const anotherFn2 = fn2.bind2({ name: 'sss2' }, 123);
console.assert(anotherFn2(245)[0].name === 'sss2', 'this');
console.assert(anotherFn2(245)[1] === 123, 'p1');
console.assert(anotherFn2(245)[2] === 245, 'p2');

const fn3 = function (p1, p2) {
  this.p1 = p1;
  this.p2 = p2;
};
fn3.prototype.sayHi = function () {};
const object1 = new fn3('a', 'b');
const newFn3 = fn3.bind2(object1, 'x', 'y');
const newObj = newFn3();
console.assert(newObj === undefined, 'object 唯恐');
console.assert(object1.p1 === 'x');
console.assert(object1.p2 === 'y');
