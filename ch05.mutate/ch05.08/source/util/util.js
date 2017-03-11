module.exports = {
  round2Decimals(num) {
    // A very stupid way to do it
    num = (typeof num === 'number') ? num.toString() : num;
    log(typeof num);
    let idx = num.indexOf('.');
    if (!idx) {
      return num;
    }
    let left = num.substring(0, idx);
    let right = num.substring(idx+1, num.length);
};
