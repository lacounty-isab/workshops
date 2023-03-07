var moment = require('moment');
var now = moment();
var now_iso_local = now.format('YYYY-MM-DDTHH:mm:ss.SSS');
pm.collectionVariables.set('now_iso_local', now_iso_local);
