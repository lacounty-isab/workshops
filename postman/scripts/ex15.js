var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray: false});
if (pm.response.code === 200) {
  var xmlText = pm.response.text();
  var xmlObj = xmlParser.parseString(xmlText, function (err, result) {
    if (err) {
      console.log('Failed to parse response.', err);
    } else {
      // console.log('Response:', JSON.stringify(result, null, 2));
      try {
        var caseIdArray = result.ArrayOfCaseIdentifier;
        var caseElem;
        if (Array.isArray(caseIdArray)) {
          caseElem = caseIdArray[0].CaseIdentifier;
          console.log('Warning:', caseIdArray.length, 'CaseIdentifier elements returned');
        } else {
          caseElem = caseIdArray.CaseIdentifier;
        }
        console.log('CaseID', caseElem.CaseID, 'from CaseNumber',  caseElem.CaseNumber);
        if (caseElem.CaseID !== undefined) {
          pm.collectionVariables.set('CaseID', caseElem.CaseID);
        }
        if (caseElem.CaseNumber !== undefined) {
          pm.collectionVariables.set('CaseNumber', caseElem.CaseNumber);
        } 
      } catch (err) {
        console.log('Failed to navigate response XML', err.message);
      }
    }
  });
} else {
  console.error('Response code was', pm.response.code);
}

