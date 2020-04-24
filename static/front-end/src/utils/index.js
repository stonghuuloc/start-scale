/**   throttle a function.
  *     @param callback
  *     @param wait
  *     @param context
  *     @returns {Function}
  */
export function throttle(callback, wait = 200, context = this) {
  let last;
  let deferTimer;

  return function () {
    let now = +new Date();
    let args = arguments;

    if (last && now < last + wait) {
      // preserve by debouncing the last call
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        callback.apply(context, args);
      }, wait);
    } else {
      last = now;
      callback.apply(context, args);
    }
  };
}

/**   debounce a function.
  *     @param callback
  *     @param wait
  *     @param context
  *     @returns {Function}
  */
export function debounce(callback, wait = 200, context = this) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => callback.apply(context, callbackArgs);

  return function () {
    callbackArgs = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}