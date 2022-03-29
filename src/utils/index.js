import cloneDeep from 'clone-deep';
import flat from 'array.prototype.flat';

export function throttle(fn, delay) {
  let prev = Date.now();
  return function () {
    let args = arguments;
    let context = this;
    let now = Date.now();
    
    if (now - prev > delay) {
      fn.apply(context, args);
      prev = Date.now();
    }
  };
}

export function isArray(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
}

export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isNumber(value) {
  return !isNaN(Number(value));
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isString(value) {
  return typeof value === 'string';
}

export function isNull(value) {
  return !value && value !==0;
}

export function isEmpty(value) {
  if (isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
}

export { cloneDeep, flat };