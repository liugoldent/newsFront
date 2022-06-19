/**
 * @description 將str取代掉space然後轉小寫
 * @param {*} inputString
 * @returns
 */
const replaceSpaceAndToLowerCase = function (inputString) {
  if (typeof inputString === 'string') {
    return inputString.replace(/\s*/g, '').toLowerCase()
  } else {
    return inputString
  }
}
const cube = function (x) {
  return x * x * x
}
/**
 * @description 取得min~max區間的數字
 * @param {*} min
 * @param {*} max
 * @returns
 */
const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export {
  replaceSpaceAndToLowerCase,
  getRandom,
}
