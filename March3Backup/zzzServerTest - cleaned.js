// SGC Testin scripts with the Contact calculated model datasource
// functions pulled from GoogleContactsTest - cleaned to make it more organized. Functions still all together in original

// Server side script query return for Contact calculated model
// Used for manual testing of SGC


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


// Used in Conact calculated datasource
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


// For MergeContacts datasource
function findMissing_() { 
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

// For MergeContacts2 datasource
function findMissing2_() {
  // Sort in order. It's now formatted as an array
  var query1 = app.models.Contacts.newQuery();
  // Not necessary, already sorted in getContacts_() function
  query1.sorting.Email._ascending();
  var record1 = query1.run();

  var query2 = app.models.Contact.newQuery();
  // query2.sorting.Email._ascending();
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
          console.log("In SQL and not in SGC " + record1[i].Email);
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