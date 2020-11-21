import EventHub from '../src/index';
const eventHub = new EventHub();

const test1 = (str) => {
  console.log(str);
  eventHub.on('xxx', (y) => {
    console.log('被调用');
    console.assert(y === 'data1');
  });
  eventHub.emit('xxx', 'data1');
};
const test2 = (str) => {
  console.log(str);
  const eventHub2 = new EventHub();
  let called2 = false;
  const fn1 = eventHub2.on('yyy', () => {
    called2 = true;
  });
  eventHub2.off('yyy', fn1);
  eventHub2.emit('yyy', fn1);
  setTimeout(() => {
    console.log('--called2---');
    console.log(called2);
  }, 1000);
};
test1('在on中顺利获取emit中传递的值data1');
test2(`在on了yyy事件后，进行off操作，此时emit 'yyy'事件后不会调用`);
