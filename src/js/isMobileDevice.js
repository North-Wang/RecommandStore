function isMobileDevice() {
  const info = navigator.userAgent;
  return /mobile/i.test(info);
}
export default isMobileDevice;
