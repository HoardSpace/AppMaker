// AddNewContacts1 page 
// Submit button onclick function

var firstName = widget.datasource.item.FirstName;
var lastName = widget.datasource.item.LastName;
var email = widget.datasource.item.Email;
var phoneNum = widget.datasource.item.PhoneNumber;

var gender = widget.datasource.item.Gender;
var male = "https://www.w3schools.com/w3images/avatar2.png";
var female = "https://www.w3schools.com/howto/img_avatar2.png";
widget.datasource.item.FullName = firstName + " " + lastName;
if(firstName!== null && lastName !== null && email !== null){
    // Contacts App
    // google.script.run.addContact3(firstName, lastName, email);
  
    // Shared Contacts App
    // google.script.run.createContact2(firstName,lastName,email,phoneNum);
  
    //checkDup(email);
    // This still runs into the asyncronouse problem
   checkDup2(firstName,lastName,email,phoneNum, gender);
  
  if(gender == "Male"){
    console.log("Should be male");
    widget.datasource.item.ImageURL = male; // male url
  }
  else if(gender == "Female") {
    console.log("Should be Female");
    widget.datasource.item.ImageURL = female; //female url

  }
  else {
    console.log("Other or no gender input");
  }   
}
  
app.closeDialog();


//--------------------------------------------------------------------
// AddNewMergeContact page
// Submit button onclick function

// Getting the values from mergecontacts
var firstName = app.datasources.MergeContacts.item.FirstName;
var lastName = app.datasources.MergeContacts.item.LastName;
var email = app.datasources.MergeContacts.item.Email;
var phoneNum = app.datasources.MergeContacts.item.PhoneNumber;

// Setting the values on contacts datasource
widget.datasource.item.FirstName = firstName;
widget.datasource.item.LastName = lastName;
widget.datasource.item.Email = email;
widget.datasource.item.PhoneNumber = phoneNum;


console.log("Submit button " + firstName);

var gender = widget.datasource.item.Gender;
var male = "https://www.w3schools.com/w3images/avatar2.png";
var female = "https://www.w3schools.com/howto/img_avatar2.png";
widget.datasource.item.FullName = firstName + " " + lastName;


if(firstName!== null && lastName !== null && email !== null) {
	console.log("In here adding the gender");
  
  if(gender == "Male"){
    console.log("Should be male");
    // widget.datasource.item.ImageURL = male; // male url
    gender = male;
  }
  else if(gender == "Female") {
    console.log("Should be Female");
    //widget.datasource.item.ImageURL = female; //female url
    gender = female;

  }
  else {
    console.log("Other or no gender input");
  }

    // Adding it sql
  addtosql3(firstName,lastName,email,phoneNum,gender);
}
else {
  console.log("Empty required fields.");
}

google.script.run
  .withSuccessHandler(function() {
    app.datasources.MergeContacts.load();
  })
  .withFailureHandler(function() {
    // TODO: handle error
  })
  .reloadMerge();


app.closeDialog();


//-------------------------------------------------------------------------------
// AddNewContacts1 page. Same with close button but with app dialog in end
// Clear button onlick function

differentType3();
widget.datasource.clearChanges();
// app.closeDialog();

//-------------------------------------------------------------------------------
// AddNewMergeContact page. Same with close button but with app dialog in end
// Clear button onlick function
differentType1();
widget.datasource.clearChanges();
// app.closeDialog();

//-------------------------------------------------------------------------------