// SGC Testin scripts with the Contact calculated model datasource
// functions pulled from GoogleContactsTest - cleaned to make it more organized. Functions still all together in original

// Server side script query return for Contact calculated model
// Used for manual testing of SGC

// Started mixing with merge contacts function whoops
// THIS HAS ALL THE DEUBUGGING OUTPUTS --- NOT IN USE BUT DO NOT DELETE
function compareContacts() {
    console.log("In compareContacts() function");
    // Sort in order. It's now formatted as an array
	var query1 = app.models.Contact.newQuery();
    // Not necessary, already sorted in getContacts_() function
	// query1.sorting.Email._ascending();
	var record1 = query1.run();
  
    //console.log("Email list of SGC");
    // List emails (debugging) purposes
    // for (var x in record1) {
    //   var email = record1[x].Email;
    //   console.log(x + ": " + email);
    // }

	var query2 = app.models.Contacts.newQuery();
	query2.sorting.Email._ascending();
	var record2 = query2.run();
  
    //console.log("Email list of sql table");
    // List the emails (debugging) purposes
    // for (var y in record2) {
    //   var email2 = record2[y].Email;
    //   console.log(y + ": " + email2);
    // }

    // Array of contacts to be merged to sql database based on email
    // var toMerge = [];
    var toMerge2 = [];
  
	console.log("Going into compare test");
	//comparetest(record1, record2);

	console.log("In comparetest function");
	console.log("record1 length: " + record1.length);
	console.log("record2.length: " + record2.length);

	console.log("record 16: " + record1[16]);
  
  	// Testing what appscript show when accessing outside of array
	// if(record1[16] === null)
	// 	console.log("it is null");
	// else if(record1[16] === 'undefined')
	// 	console.log("it is 'undefined'");
	// else if(record1[16] === "")
	// 	console.log("it is empty quotation");
	// else if (typeof record1[16] == 'undefined') // This is it!!!!!
	// 	console.log("it is typeof");
	// else
	// 	console.log("it's something else");
  
  
	for (i = 0; i < record1.length; i++) {

		if (typeof record1[i] == 'undefined') {
		      console.log("break out outer loop"); 
		      break; 
		}

	  	for (j = 0; j < record2.length; j++) {

			if (typeof record1[i] == 'undefined' || typeof record2[j] == 'undefined') {
			  console.log("break out inner loop"); 
			  break; 
			}
			// Keeping track
			// console.log("i: " +i +", j: "+ j);

			if (record1[i].Email === record2[i].Email) {
			    console.log("Same contact i: " +i +", j: "+ j);
			    i++;
			    continue; 
			}
			else if (record1[i].Email > record2[j].Email) {
			    console.log("In SGC and not in SQL " + record1[i].Email);
			    // push contact to array
			    // toMerge.push(record1[i]);
			    toMerge2.push(record1[i].Email);
			    i++;
			    if (typeof record1[i] == 'undefined') {
				    console.log("Break out else if loop"); 
				    break; 	        
			 	}
					
			}
			else if (record1[i].Email < record2[j].Email) {
			    // console.log("less than");
				continue;
			}
			else {
				console.log("Shouldn't be running. Breaking out i: " + i +", j: "+ j);
				break;
			}
	  	}
	      
	}

	// returning to new datasource?
	// return toMerge;

	return toMerge2;
  
}



// Called in aaaTest page. Should be seperated in different script
function createContact2(firstName, lastName, email, phoneNum) {
    SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
    var contacts = SharedContactsApp.getContacts();

    flag = 0;
    // checks if SQL contact already in Directory Contact
    for (i = 0; i < contacts.length; i++) {
      var emails = contacts[i].getEmails();
        // Maybe add extra identifying paramter here (email), and updating functions (involving additional phoneNums and emails)
        if ((contacts[i].getGivenName() == firstName) && (contacts[i].getFamilyName() == lastName)) {
            flag = 1; // Already in the directory contact
            console.log("contact already exists!");
        }
    }
    if (flag === 0) {
        console.log("creating contact");
        var contact = SharedContactsApp.createContact(firstName, lastName, email);

        contact.addPhone('Work', phoneNum); 
    }
}


// with filters.map (bad way though. should use reduce)
function getContacts_() {
    SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
  	var contacts = SharedContactsApp.getContacts();
  //var contacts = ContactsApp.getContacts();

  	var e_array = compareContacts();
  	var records = contacts.filter(function(contact) {
  		// Don't know how to phrase condition
  		if(contact.Email in e_array) {
  			return true;
  		}
  		else
  			return false; // Skip

	}).map(function(contact) {
    var record = app.models.Contact.newRecord();

    record.FirstName = contact.getGivenName();
    record.LastName = contact.getFamilyName();

    var emails = contact.getEmails();

    if (emails.length > 0) {
      record.Email = emails[0].getAddress();
    }

    var phones = contact.getPhones();

    if (phones.length > 0) {
      record.PhoneNumber = phones[0].getPhoneNumber();
    }

    return record;
  });

  // Sorted by email since email field is first in calculated model
  var sorted = records.sort();
  return sorted;
 
}





var reduced = options.reduce(function(filtered, contact) {
  if (contact.assigned) {
     var someNewValue = { Email: contact.Email, newProperty: 'Foo' }
     filtered.push(someNewValue);
  }
  return filtered;
}, []);







widget.datasource.query.clearSorting();
// widget.datasource
google.script.run.withSuccessHandler(function(array) {
	console.log("return result");
    
    widget.datasource.query.filters.Email._in = ['12'];
    console.log(array);

    for(var i in array) 
      console.log("Email " + array[i]);
      
  console.log("reloading datasource inside");
  widget.datasource.load();
  
  }).compareContacts();

 
//     .withFailureHandler(function(error) {
//       console.error(JSON.stringify(error));
//       props.CreatingDoc = false;
//     })
// widget.datasource.load();





// ORIGINAL
function getContacts_() {
    SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
  var contacts = SharedContactsApp.getContacts();
  //var contacts = ContactsApp.getContacts();

  var records = contacts.map(function(contact) {
    var record = app.models.Contact.newRecord();

    record.FirstName = contact.getGivenName();
    record.LastName = contact.getFamilyName();

    var emails = contact.getEmails();

    if (emails.length > 0) {
      record.Email = emails[0].getAddress();
    }

    var phones = contact.getPhones();

    if (phones.length > 0) {
      record.PhoneNumber = phones[0].getPhoneNumber();
    }

    return record;
  });

  // Sorted by email since email field is first in calculated model
  var sorted = records.sort();
  return sorted;
 
}

// with filter afterwards
function getContacts_() {
    SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
  var contacts = SharedContactsApp.getContacts();
  //var contacts = ContactsApp.getContacts();

  // I can't even call this!! What is wrong with me
  var e_array = compareContacts();
  for(var i in e_array)
      console.log("Email " + e_array[i]);

  var records = contacts.map(function(contact) {
    var record = app.models.Contact.newRecord();

    record.FirstName = contact.getGivenName();
    record.LastName = contact.getFamilyName();

    var emails = contact.getEmails();

    if (emails.length > 0) {
      record.Email = emails[0].getAddress();
    }

    var phones = contact.getPhones();

    if (phones.length > 0) {
      record.PhoneNumber = phones[0].getPhoneNumber();
    }

    return record;
  });
  
//   .filter(function(record) {
//   	return !(record.Email in e_array);
//   });


  // Sorted by email since email field is first in calculated model
  var sorted = records.sort();

  // var filtered = records.filter(funcition(element) {
  // 	return !(element in e_array)
  // });

  return sorted;
 
}

// New calculated model. THIS IS ALSO NOT BEING USED ANYMORE. Replaced by findMissing_() function bc this function is WRONG
// Cleaned up version
function compareContacts2_() {
    console.log("In compareContacts() function");
    // Sort in order. It's now formatted as an array
	var query1 = app.models.Contact.newQuery();
    // Not necessary, already sorted in getContacts_() function
	// query1.sorting.Email._ascending();
	var record1 = query1.run();
 

	var query2 = app.models.Contacts.newQuery();
	query2.sorting.Email._ascending();
	var record2 = query2.run();
  
    // Array of contacts to be merged to sql database based on email
    var toMerge = [];
  
	for (i = 0; i < record1.length; i++) {

		

		if (typeof record1[i] == 'undefined') {
		      console.log("break out outer loop"); 
		      break; 
		}

	  	for (j = 0; j < record2.length; j++) {

			if (typeof record1[i] == 'undefined' || typeof record2[j] == 'undefined') {
			  console.log("break out inner loop"); 
			  break; 
			}
			// Keeping track
			// console.log("i: " +i +", j: "+ j);

			if (record1[i].Email === record2[i].Email) {
			    console.log("Same contact i: " +i +", j: "+ j);
			    i++;
			    continue; 
			}
			else if (record1[i].Email > record2[j].Email) {
			    console.log("In SGC and not in SQL " + record1[i].Email);
			    // push contact to array
              var newRecord = app.models.MergeContacts.newRecord();
			    newRecord.FirstName = record1[i].FirstName;
			    newRecord.LastName = record1[i].LastName;
			    newRecord.Email = record1[i].Email;
			    newRecord.PhoneNumber = record1[i].PhoneNumber;
			    toMerge.push(newRecord);

			    i++;
			    if (typeof record1[i] == 'undefined') {
				    console.log("Break out else if loop"); 
				    break; 	        
			 	}
					
			}
			else if (record1[i].Email < record2[j].Email) {
			    // console.log("less than");
				continue;
			}
			else {
				console.log("Shouldn't be running. Breaking out i: " + i +", j: "+ j);
				break;
			}
	  	}
	      
	}

	// returning to new datasource?
	// return toMerge;

	return toMerge;
  
}




function findMissing_() 
{ 
	// Sort in order. It's now formatted as an array
	var query1 = app.models.Contact.newQuery();
    // Not necessary, already sorted in getContacts_() function
	// query1.sorting.Email._ascending();
	var record1 = query1.run(); 

	var query2 = app.models.Contacts.newQuery();
	query2.sorting.Email._ascending();
	var record2 = query2.run();
  
    // Array of contacts to be merged to sql database based on email
    var toMerge = [];

    for (i = 0; i < record1.length; i++) 
    { 
         var j;
        for (j = 0; j < record2.length; j++) 
            if (record1[i].Email == record2[j].Email) 
                break; 
  		
  		// This doesn't make sense to me
        if (j == record2.length) {
        	console.log("In SGC and not in SQL " + record1[i].Email);
		    // push contact to array
          	var newRecord = app.models.MergeContacts.newRecord();
		    newRecord.FirstName = record1[i].FirstName;
		    newRecord.LastName = record1[i].LastName;
		    newRecord.Email = record1[i].Email;
		    newRecord.PhoneNumber = record1[i].PhoneNumber;
		    toMerge.push(newRecord);
        }
    }

    return toMerge;
} 


//  Most recent

// Used in MergeContacts calculated datasource
function compareContacts2_() {

    // Sort in order. It's now formatted as an array
	var query1 = app.models.Contact.newQuery();
    // Not necessary, already sorted in getContacts_() function
	// query1.sorting.Email._ascending();
	var record1 = query1.run(); 

	var query2 = app.models.Contacts.newQuery();
	query2.sorting.Email._ascending();
	var record2 = query2.run();
  
    // Array of contacts to be merged to sql database based on email
    var toMerge = [];
  
	for (i = 0; i < record1.length; i++) {
		if (typeof record1[i] == 'undefined') {
		      console.log("break out outer loop"); 
		      break; 
		}

	  	for (j = 0; j < record2.length; j++) {

			if (typeof record1[i] == 'undefined' || typeof record2[j] == 'undefined') {
			  console.log("break out inner loop"); 
			  break; 
			}

			if (record1[i].Email === record2[i].Email) {
			    console.log("Same contact i: " +i +", j: "+ j);
			    i++;
			    continue; 
			}
			else if (record1[i].Email > record2[j].Email) {
				continue;
			}
			else if (record1[i].Email < record2[j].Email) {
			    console.log("In SGC and not in SQL " + record1[i].Email);
			    // push contact to array
              	var newRecord = app.models.MergeContacts.newRecord();
			    newRecord.FirstName = record1[i].FirstName;
			    newRecord.LastName = record1[i].LastName;
			    newRecord.Email = record1[i].Email;
			    newRecord.PhoneNumber = record1[i].PhoneNumber;
			    toMerge.push(newRecord);

			    i++;

			    if (typeof record1[i] == 'undefined') {
				    console.log("Break out else if loop"); 
				    break; 	        
			 	}
					
			}

			else {
				console.log("Shouldn't be running. Breaking out i: " + i +", j: "+ j);
				break;
			}
	  	}
	      
	}

	return toMerge;
  
}


// Adding this new function 3/22/19

function findMissing2_() {
	// Sort in order. It's now formatted as an array
	var query1 = app.models.Contacts.newQuery();
	// Not necessary, already sorted in getContacts_() function
	//query1.sorting.Email._ascending();
	var record1 = query2.run();

	var query2 = app.models.Contact.newQuery();
    query2.sorting.Email._ascending();
	var record2 = query1.run(); 

  
    // Array of contacts to be merged to sql database based on email
    var toMerge = [];

    for (i = 0; i < record1.length; i++) 
    { 
         var j;
        for (j = 0; j < record2.length; j++) 
            if (record1[i] == record2[j]) 
                break; 
  		
  		// This doesn't make sense to me
        if (j == record2.length) {
        	console.log("In SGC and not in SQL " + record1[i].Email);
		    // push contact to array
          	var newRecord = app.models.MergeContacts.newRecord();
		    newRecord.FirstName = record1[i].FirstName;
		    newRecord.LastName = record1[i].LastName;
		    newRecord.Email = record1[i].Email;
		    newRecord.PhoneNumber = record1[i].PhoneNumber;
		    toMerge.push(newRecord);
        }
    }

    return toMerge;
}