// Similar to recentlyViewed function
// Attached to onclick submit button when creating new contact as dateCreated();
function dateCreated() {
  var date = new Date();
  //var name = app.datasources.Contacts.item.FullName;
  app.datasources.Contacts.item.DateCreated = date;
  //console.log("Last viewed for " + name + " is " + date);
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

// March 12
// Called in Submit button of AddNewMergeContact Page
function addtosql3(fname,lname,email,phoneNum,gender) {
  app.datasources.Contacts.createItem({
    success: function (record) {
      dateCreated();
      // executes if record was created
      // alert("dateCreated() function works nin addtosql3");

      // Adding the gender url into the item here
      widget.datasource.item.ImageURL = gender;

      // Reload the the datasource to fit filters (Not sure if this is necessary. We have no filters for this datasource atm)
      app.datasources.Contacts.load();

    },
    failure: function (error) {
      console.info("dateCreated() did not work :("); // executes if record wasn't created
    }
  });
  
}


// Last updated: 3/22/19