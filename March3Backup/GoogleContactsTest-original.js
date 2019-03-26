function serverSayHello() {
    console.log("Hello from GoogleContacts server script");
    //return "Hello, " + Session.getActiveUser().getEmail() + "!";
}

// Server side script
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

  return records;
}



// Called in aaaTest page
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

// Server Script
function checkDuplicate(email) {
// Should be similar to createContact function. Just checks email though
    SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
    var contacts = SharedContactsApp.getContacts();

    // checks if SQL contact already in Directory Contact
    for (i = 0; i < contacts.length; i++) {
      var emails = contacts[i].getEmails();
      
        if (emails[0].getAddress() == email) {
         // Already in the directory contact
            return 1;
        }
    }
    console.log("return 0 in checkDuplicate()");
    return 0;
}


// With Email and return function. To check duplication but requires callback functions to stop the asycronouse when loading datasource
// Turned into basic addcontact function
function createContact3(firstName, lastName, email, phoneNum) {
    SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
    var contacts = SharedContactsApp.getContacts();

    console.log("creating contact");
    var contact = SharedContactsApp.createContact(firstName, lastName, email);

    contact.addPhone('Work', phoneNum); 
}

function deleteSGC(firstName, lastName, email) {
	SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
	var contacts = SharedContactsApp.getContacts();
    console.log("In delete function");

	// checks if SQL contact already in Directory Contact
	for (i = 0; i < contacts.length; i++) {
        var emails = contacts[i].getEmails();
        // Deletion based only on email address
// 		if ((emails[0].getAddress() === email) && (contacts[i].getGivenName() == firstName) && (contacts[i].getFamilyName() == lastName)) {
        if (emails[0].getAddress() === email) {
            console.log("Deleting from SGC");
			SharedContactsApp.deleteContact(contacts[i]);
		}
	}
}



// Causing an error. Something wrong with the datasource I created
function SGCtesting() {
    app.models.SGContact.load();
    var listlength = app.models.SGContact.length();
    console.log("length " + listlength);
}