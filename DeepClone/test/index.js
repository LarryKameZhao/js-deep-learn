const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const assert = chai.assert;
const deepClone = require('../src/index1');
describe('deepClone', () => {
  it('a function', () => {
    assert.isFunction(deepClone);
  });
  it('能够复制基本类型number,string,boolean,undefined,null,symbol', () => {
    const n = 123;
    const n2 = deepClone(n);
    assert(n === n2);
    const s = '12345';
    const s2 = deepClone(s);
    assert(s === s2);
    const b = true;
    const b2 = deepClone(b);
    assert(b === b2);
    const u = undefined;
    const u2 = deepClone(u);
    assert(u === u2);
    const empty = null;
    const empty2 = deepClone(empty);
    assert(empty === empty2);
    const sym = Symbol();
    const sym2 = deepClone(sym);
    assert(sym === sym2);
  });
  describe('对象', () => {
    it('能够复制对象', () => {
      const obj1 = { name: 'sss', child: { name: 'sss-children' } };
      const obj2 = deepClone(obj1);
      assert(obj1 !== obj2);
      assert(obj1.name === obj2.name);
      assert(obj1.child !== obj2.child);
      assert(obj1.child.name === obj2.child.name);
    });
    it('能够复制数组对象', () => {
      const array1 = [
        [11, 12],
        [21, 22],
        [31, 32],
      ];
      const array2 = deepClone(array1);
      assert(array1 !== array2);
      assert(array1[0] !== array2[0]);
      assert(array1[1] !== array2[1]);
      assert(array1[2] !== array2[2]);
      assert.deepEqual(array1, array2);
    });
    it('能够复制函数', () => {
      const f1 = function (x, y) {
        return x + y;
      };
      f1.xxx = { yyy: { zzz: 1 } };
      const f2 = deepClone(f1);
      assert(f1 !== f2);
      assert(f1.xxx !== f2.xxx);
      assert(f1.xxx.yyy !== f2.xxx.yyy);
      assert(f1.xxx.yyy.zzz === f2.xxx.yyy.zzz);
      assert(f1(1, 2) === f2(1, 2));
    });
    it('环也能复制', () => {
      const obj1 = { name: 'sss' };
      obj1.self = obj1;
      const obj2 = deepClone(obj1);
      assert(obj1 !== obj2);
      assert(obj1.name === obj2.name);
      assert(obj1.self !== obj2.self);
    });
    // xit('不会爆栈', () => {
    //   const a = { child: null };
    //   let b = a;
    //   for (let i = 0; i < 2000; i++) {
    //     b.child = {
    //       child: null,
    //     };
    //     b = b.child;
    //   }
    //   const a2 = deepClone(a);
    //   assert(a !== a2);
    //   assert(a.child !== a2.child);
    // });
    it('可以复制正则', () => {
      const reg1 = /hi\d+/gi;
      reg1.xxx = { yyy: { zzz: 1 } };
      const reg2 = deepClone(reg1);
      assert(reg1.source === reg2.source);
      assert(reg1.flags === reg2.flags);
      assert(reg1 !== reg2);
      assert(reg1.xxx !== reg2.xxx);
      assert(reg1.xxx.yyy !== reg2.xxx.yyy);
      assert(reg1.xxx.yyy.zzz === reg2.xxx.yyy.zzz);
    });
    it('可以复制日期', () => {
      const date1 = new Date();
      date1.xxx = { yyy: { zzz: 1 } };
      const date2 = deepClone(date1);
      assert(date1.source === date2.source);
      assert(date1.flags === date2.flags);
      assert(date1 !== date2);
      assert(date1.getTime() === date2.getTime());
      assert(date1.xxx !== date2.xxx);
      assert(date1.xxx.yyy !== date2.xxx.yyy);
      assert(date1.xxx.yyy.zzz === date2.xxx.yyy.zzz);
    });
  });
});
