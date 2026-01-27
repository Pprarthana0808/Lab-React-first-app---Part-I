
function div(a, b) {
  return a / b;
}
// only returns true when there is an actual digit 0-9 in string
function containsNumbers(text) {
  return /[0-9]/.test(text);
}

exports.div = div;
exports.containsNumbers = containsNumbers;
