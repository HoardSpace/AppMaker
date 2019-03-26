// Corresponds with checkDup2 function in zzzClientTesting client script
function checkDuplicate(email) {
    // Accessing emails similar to createContact3 function
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


// Creates SGC contact. Duplication is checked before this runs
function createContact3(firstName, lastName, email, phoneNum) {
    SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
    var contacts = SharedContactsApp.getContacts();

    console.log("creating contact");
    var contact = SharedContactsApp.createContact(firstName, lastName, email);

    contact.addPhone('Work', phoneNum); 
}

function deleteSGC(email) {
	SharedContactsApp.setOAuth2AccessToken(ScriptApp.getOAuthToken());
	var contacts = SharedContactsApp.getContacts();
    console.log("In delete function");

	// checks if SQL contact already in Directory Contact
	for (i = 0; i < contacts.length; i++) {
        var emails = contacts[i].getEmails();
        // Deletion based only on email address
 		// if ((emails[0].getAddress() === email) && (contacts[i].getGivenName() == firstName) && (contacts[i].getFamilyName() == lastName)) {
        if (emails[0].getAddress() === email) {
            console.log("Deleting " + email + "from SGC");
			SharedContactsApp.deleteContact(contacts[i]);
		}
	}
}


