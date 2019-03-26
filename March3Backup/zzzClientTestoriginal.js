// Client script
// This not necessary. Maybe for editing
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

function checkDup2(firstName,lastName,email,phoneNum,gender) {
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