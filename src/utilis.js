// 生产环境需将字符打乱防止被预测
const CHARS = "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";

/**
 * @description 十进制转62进制
 * @param {number} index
 */
function string10to62(index) {
  const charsArr = CHARS.split("");
  const radix = CHARS.length;
  let qutient = +index;
  let encodeStr = "";
  do {
    // 除数*商+余数 = 被除数
    let mod = qutient % radix;
    qutient = (qutient - mod) / radix;
    encodeStr = charsArr[mod] + encodeStr;
  } while (qutient);

  return encodeStr;
}

/**
 * @description 62进制转10进制：找出字符在62进制字符中的索引，然后乘以62的N次方。次方从右到左，依次从0开始递增加一
 * @param {string[]} chars
 */
function string62to10(chars) {
  const charsArr = chars.split("").reverse();
  let pow = (total = 0);

  for (const char of charsArr) {
    total += CHARS.indexOf(char) * 62 ** pow;
    pow++;
  }

  return total;
}

module.exports = {
  string10to62,
  string62to10
}