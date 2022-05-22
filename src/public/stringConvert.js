export const replaceSpaceAndToLowerCase = function (inputString) {
  if (typeof inputString === 'string') {
    return inputString.replace(/\s*/g, '').toLowerCase()
  } else {
    return inputString
  }
}
export const cube = function(x){
  return x*x*x
}

