var name_first = pm.variables.replaceIn('{{$randomFirstName}}');
var name_last = pm.variables.replaceIn('{{$randomLastName}}');
var dl = pm.variables.replaceIn('A{{$randomBankAccount}}').slice(0,8);

pm.collectionVariables.set('def_name_first', name_first.toUpperCase());
pm.collectionVariables.set('def_name_last', name_last.toUpperCase());
pm.collectionVariables.set('def_driver_license', dl);

