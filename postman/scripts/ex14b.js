var moment = require('moment');
var courtDate = moment();  // Now
courtDate.add(1, 'month'); // A month from now.
courtDate.startOf('week'); // Previous Sunday.
courtDate.add(3, 'days');  // Following Wednesday
var courtDateStr = courtDate.format('MM/DD/YYYY');
pm.collectionVariables.set('court_date', courtDateStr);
