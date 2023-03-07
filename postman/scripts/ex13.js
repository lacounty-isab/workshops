function randomDigits(n) {
  var result = "";
  for (var i = 0; i < n; i++) {
    var d = Math.floor(Math.random() * 10);
    result += d;
  }
  return result;
}

function randomChoice(choices) {
  var d = Math.floor(Math.random() * choices.length);
  var result = choices[d];
  return result;
}

var court_codes = ['BA', 'LA', 'LB', 'NA', 'PA', 'TA'];
var code = randomChoice(court_codes);
var caseNumber = code + randomDigits(6);
pm.collectionVariables.set('case_number', caseNumber);

