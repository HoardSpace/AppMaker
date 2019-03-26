


// Called in Client Script where the inputs are received
// Server side function.
// Just called createContact3******
function sqlToShared (fname,lname,email,phoneNum) {
	// SharedContactsApp
	 SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
    var contacts = SharedContactsApp.getContacts();	

    console.log("creating contact");
    var contact = SharedContactsApp.createContact(firstName, lastName, email);

    contact.addPhone('Work', phoneNum); 
}

// Datasource: MergeContacts2 new datasource
// New findMissing_() function that goes the other way around called when querying

// Not complete changed from orignal findMissing_() function. I think I just need to switch the ames of record1 and query1 with record2 and query2
// Also need to make a new datasource called MergeContact2 or something to replace Contact datasource in this code

// This is for new datasource MergeContact2
function findMissing2_() {
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