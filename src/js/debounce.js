/**
 * 防止抖動
 * @param {*} func 要被防止抖動的function
 * @param {*} delay 延遲秒數(毫秒)
 */
export function debounce(func, delay = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
