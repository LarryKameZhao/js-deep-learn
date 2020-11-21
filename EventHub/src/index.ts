class EventHub {
  cache = {};

  // {'报社1':[f1,f2,f3],'报社2':[f11,f22,f33]}
  on(eventName, fn) {
    // eventName = 报社1,   fn
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  emit(eventName, data?) {
    (this.cache[eventName] || []).forEach((fn) => fn(data));
  }

  off(eventName, fn) {
    // 把fn从this.cache[eventName]中删除
    let index;
    this.cache[eventName] = this.cache[eventName] || [];
    for (let i = 0; i < this.cache[eventName].length; i++) {
      if (this.cache[eventName[i]] === fn) {
        index = i;
        break;
      }
    }
    if (index === undefined) {
      return;
    }
    this.cache[eventName].splice(index, 1);
  }
}

export default EventHub;
