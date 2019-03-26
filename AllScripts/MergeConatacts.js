// Code for Merge Contacts page
// Planning stages

// Inputs might not be necessary
function compareContacts() 	{
	// Authentication requirements
	SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
    var contacts = SharedContactsApp.getContacts();	// Instead of always getting the contacts this way, just use the calculated model. Not worrying for now


    // checks if SQL contact already in Directory Contact
    for (i = 0; i < contacts.length; i++) {
      var emails = contacts[i].getEmails();
      
        if (emails[0].getAddress() == email) {
         // Already in the directory contact
            return 1;
        }
    }


    // This seems like the right way of accessing the SGC.
    // But is this faster? Like does it request for the authentication every time?
    // console.log something from the calculated model

    // The email has to be sorted but it is not.
    // The Contact datasource will be inheritedin the pannels though. Might not need to do this.
    var records = app.models.Contact.newQuery().run();

    // Finding the length is not necessary anymore?
    for (var i in records) {
    	var email = records[i].Email;
    	console.log(email);
    }


    
    return 0;

    var records = app.models.Contact.newQuery();
  // Sort in order. It's now formatted as an array
    records.sorting.Email._ascending();
  
    var other = app.models.Contacts.newQuery();
    other.sorting.Email._ascending();
    
    console.log("Amount of records: " + records.length);
    console.log("Amount of other: " + other.length);

    var length = 0;
    if (records.length > other.length) {
    	length = other.length;

    }
    // Actually, need a while loop that goes 

    // Getting the differences is actually kinda confusing. Just have to traverse the list
    var i = 0;
    var j = 0;
    while ((records[i].Email !== null) && (other[j].Email != null)) {
    	if (records[i].Email === other[i].Email) {
    		// Output records
    		i++;
    		j++;
    	}
    	else if (records[i].Email < other[i].Email) {
    		i++;
    	}
    	else {
    		j++;
    	}
    }

    // Other way using for loops

    // records is the emails from SGC
    for (i = 0; i < records.Email.length; i++) {

    	for (j = 0; j < other.Email.length; j++) {
    		if (records[i].email ==  ) {

    		}
    	}
    }


    // This is the right way
    while ((records[i].Email !== null) && (other[j].Email != null)) {
		if (records[i].Email === other[i].Email) {
			// Don't output anything
			i++;
			j++;
		}
		else if (records[i].Email < other[j].Email) {
			// Output a
			console.log("In SGC and not in SQL" + records[i].Email);
			i++;
		}
		else if (records[i].Email > other[j].Email) {
			j++;
		}
		else {
			// Idk do something
		}
	}

}


// Cleane version
function compareContacts() {
	var query1 = app.models.Contact.newQuery();
	// Sort in order. It's now formatted as an array
	query1.sorting.Email._ascending();
	var records = query1.run();

	var query2 = app.models.Contacts.newQuery();
	query2.sorting.Email._ascending();
	var other = query2.run();

	var i = 0;
	var j = 0;

	// Going to store the array of emails
	var array = [];

	// This is the correct algorithm
	while ((records[i].Email !== null) && (other[j].Email !== null)) {
		if (records[i].Email === other[i].Email) {
			// Don't output anything
			i++;
			j++;
		}
		else if (records[i].Email < other[j].Email) {
			// Output records[i].Email.
			// In this case, push into an array of emails.
			array.push(records[i].Email);
			console.log("In SGC and not in SQL" + records[i].Email);
			i++;
		}
		else if (records[i].Email > other[j].Email) {
			j++;
		}
		else {
			// Idk do something
			console.log("This shouldn't be running.");
		}
	}

	for (var s in array) {
		var email = array[i];
		console.log(email);
	}
}
// Don't know why I'm having a hard time on this

// Fast comparing algorithm
// Changed a bit to fit need
a = list1.first
b = list2.first
repeat:
    if a == b:
        output a
        a = list1.next
        b = list2.next
    elif a < b:
        a = list1.next
    else
        b = list2.next
until either list has no more elements

widget.datasource.items.sort(
  function(a, b) {
    if (a.Month > b.Month) {
      return 1;
    } else {
      return -1;
    }
  }
);

    array.sort(function(x,y){
      var xp = x[3];
      var yp = y[3];
// in this example I used the 4th column... 
      return xp == yp ? 0 : xp < yp ? -1 : 1;
    });


    query1.sort(
  function(records, other) {
    if (records.Email > other.Email) {
      return 1;
    } else {
      return -1;
    }
  }
);

