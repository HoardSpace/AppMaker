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
if(firstName!== null && lastName !== null && email !== null){
    // Contacts App
    // google.script.run.addContact3(firstName, lastName, email);
  
    // Shared Contacts App
    // google.script.run.createContact2(firstName,lastName,email,phoneNum);
  
    //checkDup(email);
    // This still runs into the asyncronouse problem
  // Don't need to check duplicate
   //checkDup2(firstName,lastName,email,phoneNum, gender);
  
    addtosql3(firstName,lastName,email,phoneNum,gender);
  
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