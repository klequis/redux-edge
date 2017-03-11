module.exports = {
  round2Decimals(num) {
    num = (typeof num === 'number') ? num.toString() : num;
    const idx = num.indexOf('.');
    if (!idx) {
      return num;
    }
    const left = num.substring(0, idx);
    let right = num.substring(idx+1, num.length);
    if (right.length > 2) {
      const thirdChar = right.substring(2, 3);
      right = right.substring(0, 2);
      if (Number(thirdChar) >= 5) {
        right = Number(right) + 1;
        right = right.toString();
      }
    }
    return `${left}.${right}`;
  },
};
