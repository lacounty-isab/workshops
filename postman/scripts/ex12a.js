function randomDigits(n) {
  var result = "";
  for (var i = 0; i < n; i++) {
    var d = Math.floor(Math.random() * 10);
    result += d;
  }
  return result;
}

var caseNumber = "LA" + randomDigits(6);
pm.collectionVariables.set('case_number', caseNumber);

