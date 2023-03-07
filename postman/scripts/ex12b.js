function randomChars(str, n) {
  var result = "";
  for (var i = 0; i < n; i++) {
    var d = Math.floor(Math.random() * str.length);
    result += str[d];
  }
  return result;
}

var validChars = "0123456789ABCDEF";
var caseNumber = "LA" + randomChars(validChars, 6);
pm.collectionVariables.set('case_number', caseNumber);
