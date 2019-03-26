// zzzClientTest


// Client script
function onSubmitContactClick(submitButton) {
  var props = submitButton.root.properties;

  var contact = {
    FirstName: props.FirstName,
    LastName: props.LastName,
    Email: props.Email,
    PhoneNumber: props.PhoneNumber
  };

  google.script.run
    .withSuccessHandler(function() {
      // Most likely we'll need to navigate user back to the
      // page with contacts list and reload its datasource
      // to reflect recent changes, because our `CUD` operations
      // are fully detached from the list datasource
      app.showPage(app.pages.Contacts);
      app.datasources.Contacts.load();
     })
    .withFailureHandler(function() {
       // TODO: Handle error
     })
    .createContact(contact);
}

// Similar to recentlyViewed function
// Attached to onclick submit button when creating new contact as dateCreated();
function dateCreated() {
  var date = new Date();
  var name = app.datasources.Contacts.item.FullName;
  app.datasources.Contacts.item.DateCreated = date;
  console.log("Last viewed for " + name + " is " + date);
}

// Client Script
function checkDup(firstName,lastName,email,phoneNum) {
  google.script.run.withSuccessHandler(function(result) {
    if (result === 1) {
      console.log("Contact with email already exists! (Within Success Handler. Did not create contact)");
      // Should create a notification pop on page 
     return 1;
    }    
    else {
      console.log("creating contact else statement of successhandler");
//       var firstName = app.datasources.Contacts.item.FirstName;
//       var lastName = app.datasources.Contacts.item.LastName;
//       var emaile = app.datasources.Contacts.item.Email;
//       var phoneNum = app.datasources.Contacts.item.PhoneNumber;
      
      console.log("Showing else vars: " + firstName + ", " + lastName + ", " + email + ", " + phoneNum);
      // This should never happen in the first place
      if(firstName!== null && lastName !== null && email !== null && phoneNum !== null){
        google.script.run.createContact3(firstName,lastName,email,phoneNum);
        
        // All other stuff from clickevent should be here but I don't wanna. This is so much work to do
      }
      else {
        console.log("something is null in inputs of createContact3");
      }
       return 0;
    }
  }).checkDuplicate(email);
}


function checkDup2(firstName, lastName, email, phoneNum, gender) {
  google.script.run.withSuccessHandler(function(result) {
    if (result === 1) {
      console.log("Contact with email already exists! (Within Success Handler. Did not create contact)");
      // Should create a notification pop on page 
    }    
    else {
      console.log("creating contact else statement of successhandler");

      
      console.log("Showing else vars: " + firstName + ", " + lastName + ", " + email + ", " + phoneNum);
      
      google.script.run.createContact3(firstName,lastName,email,phoneNum);
      
      // Added item to sql table
      // Need to add restriction. Put under checkDup()
      // This should be the right way
      app.datasources.Contacts.createItem({
        success: function (record) {
          dateCreated();
          alert("dateCreated() function works");  // executes if record was created
          // Reload the the datasource to fit filters
          app.datasources.Contacts.load();

        },
        failure: function (error) {
          console.info("dateCreated() did not work :("); // executes if record wasn't created
        }
      });
      


    }
  }).checkDuplicate(email);
}


// This is actually not necessary but I'm doing it anyways for organization
function addinfo(fname,lname,email,phoneNum) {
  app.datasources.Contacts.item.FirstName = fname;
  app.datasources.Contacts.item.LastName = lname;
  app.datasources.Contacts.item.Email = email;
  app.datasources.Contacts.item.PhoneNumber = phoneNum;
}


// Practice
function addTosql(fname,lname,email,phoneNum) {
        app.datasources.Contacts.createItem({
        success: function (record) {
          // Maybe try making one function for this
          // app.datasources.Contacts.item.FirstName = fname;
          // app.datasources.Contacts.item.FirstName = lname;
          // app.datasources.Contacts.item.FirstName = email;
          // app.datasources.Contacts.item.FirstName = phoneNum;
          addinfo(fname,lname,email,phoneNum);
          dateCreated();
          alert("creating item");  
          // Reload the the datasource to fit filters
          app.datasources.Contacts.load();

        },
        failure: function (error) {
          console.info("dateCreated() did not work :("); // executes if record wasn't created
        }
      });
}

//Don't need this anymore

function addinfo2(fname,lname,email,phoneNum,type,gender,age,maritalStatus,streetAddress,dateOfBirth,lawyerFirmName, lawyerWebsite,workPhone,mobilePhone) {
  app.datasources.Contacts.item.FirstName = fname;
  app.datasources.Contacts.item.LastName = lname;
  app.datasources.Contacts.item.Email = email;
  app.datasources.Contacts.item.PhoneNumber = phoneNum;
  app.datasources.Contacts.item.Type = type;
  app.datasources.Contacts.item.Gender= gender;
  app.datasources.Contacts.item.Age = age;
  app.datasources.Contacts.item.MartialStatus = maritalStatus;
  app.datasources.Contacts.item.StreetAddress= streetAddress;
  app.datasources.Contacts.item.DOB = dateOfBirth;
  app.datasources.Contacts.item.LawFirmName = lawyerFirmName;
  app.datasources.Contacts.item.LawyerWebsite = lawyerWebsite;
  app.datasources.Contacts.item.WorkPhone = workPhone;
  app.datasources.Contacts.item.MobilePhone= mobilePhone;
}


// More expanded version
function addTosql2(fname,lname,email,phoneNum,type,gender,age,maritalStatus,streetAddress,dateOfBirth,lawyerFirmName, lawyerWebsite,workPhone,mobilePhone); {
        app.datasources.Contacts.createItem({
        success: function (record) {
          addinfo2(fname,lname,email,phoneNum,type,gender,age,maritalStatus,streetAddress,dateOfBirth,lawyerFirmName, lawyerWebsite,workPhone,mobilePhone);
          dateCreated();
          alert("creating item");  
          // Reload the the datasource to fit filters
          app.datasources.Contacts.load();

        },
        failure: function (error) {
          console.info("dateCreated() did not work :("); // executes if record wasn't created
        }
      });
}

// This is the 
var s = app.pages.AddNewMergeContact.descendants.TypeField.value;

differentType2(s);


// Need if statement restrictions for Lawyer,,,, Client and Defendant


// This should be the right way
var fname = app.datasources.MergeContacts.item.FirstName;
var lname = app.datasources.MergeContacts.item.LastName;
var phoneNum = app.datasources.MergeContacts.item.PhoneNumber;
var email = app.datasources.MergeContacts.item.Email;


var type = app.pages.AddNewMergeContact.descendants.TypeField.value;
var gender = app.pages.AddNewMergeContact.descendants.GenderField.value;
var age = app.pages.AddNewMergeContact.descendants.AgeField.value;
var maritalStatus = app.pages.AddNewMergeContact.descendants.MartialField.value;
var streetAddress = app.pages.AddNewMergeContact.descendants.StreetAddressField.value;
var dateOfBirth = app.pages.AddNewMergeContact.descendants.DOBField.value;

var lawFirmName = app.pages.AddNewMergeContact.descendants.LawFirmField.value;
var lawyerWebsite = app.pages.AddNewMergeContact.descendants.LawWebSite.value;

var workPhone = app.pages.AddNewMergeContact.descendants.WorkPhoneField.value;
var mobilePhone = app.pages.AddNewMergeContact.descendants.MobilePhoneField.value;

// function from client side
// addTosql(fname,lname,email,phoneNum);

addTosql2(fname,lname,email,phoneNum,type,gender,age,maritalStatus,streetAddress,
          dateOfBirth,lawyerFirmName,lawyerWebsite,workPhone,mobilePhone);



Client and Defendant Fields that are visible:
  Gender
  Martial
  DOB
  Age
  Mobile PhoneNumber
  Work PhoneNumber
  Work Address
  Street Address

Lawyer
  LawFirmField
  LawWebSite
  Gender
  WorkPhone
  StreetAddress

 Everything else
  Gender
  WorkPhone
  WorkAddress

