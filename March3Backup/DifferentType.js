// Client side script

// Used in submit button in AddNewMergeContact Page
function differentType(s) {
 
  //console.log(s);
  if(s == 'Client' || s == 'Defendent'){
    app.pages.AddNewMergeContact.descendants.GenderField.visible = true;
    app.pages.AddNewMergeContact.descendants.MartialField.visible = true;
    app.pages.AddNewMergeContact.descendants.DOBField.visible = true;
    app.pages.AddNewMergeContact.descendants.AgeField.visible = true;
    app.pages.AddNewMergeContact.descendants.LawFirmField.visible = false;
    app.pages.AddNewMergeContact.descendants.LawWebSite.visible = false;
    app.pages.AddNewMergeContact.descendants.MobilePhoneField.visible = true;
    app.pages.AddNewMergeContact.descendants.WorkPhoneField.visible = true;
    app.pages.AddNewMergeContact.descendants.WorkAddressField.visible = true;
    app.pages.AddNewMergeContact.descendants.StreetAddressField.visible = true;
  }

  else if(s == 'Lawyer'){
    app.pages.AddNewMergeContact.descendants.LawFirmField.visible = true;
    app.pages.AddNewMergeContact.descendants.LawWebSite.visible = true;
    app.pages.AddNewMergeContact.descendants.GenderField.visible = true;
    app.pages.AddNewMergeContact.descendants.MartialField.visible = false;
    app.pages.AddNewMergeContact.descendants.DOBField.visible = false;
    app.pages.AddNewMergeContact.descendants.AgeField.visible = false;
    app.pages.AddNewMergeContact.descendants.StreetAddressField.visible = false;
    app.pages.AddNewMergeContact.descendants.WorkPhoneField.visible = true;
    app.pages.AddNewMergeContact.descendants.WorkAddressField.visible = true;


  }
  else if(s=== null){
    app.pages.AddNewMergeContact.descendants.GenderField.visible = true;
    app.pages.AddNewMergeContact.descendants.MartialField.visible = false;
    app.pages.AddNewMergeContact.descendants.DOBField.visible = false;
    app.pages.AddNewMergeContact.descendants.AgeField.visible = false;
    app.pages.AddNewMergeContact.descendants.LawFirmField.visible = false;
    app.pages.AddNewMergeContact.descendants.LawWebSite.visible = false;
    app.pages.AddNewMergeContact.descendants.MobilePhoneField.visible = false;
    app.pages.AddNewMergeContact.descendants.WorkPhoneField.visible = false;
    app.pages.AddNewMergeContact.descendants.WorkAddressField.visible = false;
  }


  else {
    app.pages.AddNewMergeContact.descendants.GenderField.visible = true;
    app.pages.AddNewMergeContact.descendants.MartialField.visible = false;
    app.pages.AddNewMergeContact.descendants.DOBField.visible = false;
    app.pages.AddNewMergeContact.descendants.AgeField.visible = false;
    app.pages.AddNewMergeContact.descendants.LawFirmField.visible = false;
    app.pages.AddNewMergeContact.descendants.LawWebSite.visible = false;
    app.pages.AddNewMergeContact.descendants.MobilePhoneField.visible = false;
    app.pages.AddNewMergeContact.descendants.WorkPhoneField.visible = true;
    app.pages.AddNewMergeContact.descendants.WorkAddressField.visible = true;

  }


  
  
}

// for onlock on clear button
function differentType1(s) {
    app.pages.AddNewContact1.descendants.GenderField.visible = false;
    app.pages.AddNewContact1.descendants.MartialField.visible = false;
    app.pages.AddNewContact1.descendants.DOBField.visible = false;
    app.pages.AddNewContact1.descendants.AgeField.visible = false;
    app.pages.AddNewContact1.descendants.LawFirmField.visible = false;
    app.pages.AddNewContact1.descendants.LawWebSite.visible = false;
    app.pages.AddNewContact1.descendants.MobilePhoneField.visible = false;
    app.pages.AddNewContact1.descendants.WorkPhoneField.visible = false;
    app.pages.AddNewContact1.descendants.WorkAddressField.visible = false;
    app.pages.AddNewMergeContact.descendants.StreetAddressField.visible = false;
}



// Used in submit button in AddNewContact1 Page
function differentType2(s){
 
  console.log("differentType2: " + s);
  if(s == 'Client' || s == 'Defendent'){
  	app.pages.AddNewContact1.descendants.GenderField.visible = true;
    app.pages.AddNewContact1.descendants.MartialField.visible = true;
    app.pages.AddNewContact1.descendants.DOBField.visible = true;
    app.pages.AddNewContact1.descendants.AgeField.visible = true;
    app.pages.AddNewContact1.descendants.LawFirmField.visible = false;
	app.pages.AddNewContact1.descendants.LawWebSite.visible = false;
    app.pages.AddNewContact1.descendants.MobilePhoneField.visible = true;
    app.pages.AddNewContact1.descendants.WorkPhoneField.visible = true;
    app.pages.AddNewContact1.descendants.WorkAddressField.visible = true;
    app.pages.AddNewContact1.descendants.StreetAddressField.visible = true;
  }

else if(s == 'Lawyer'){
	app.pages.AddNewContact1.descendants.LawFirmField.visible = true;
	app.pages.AddNewContact1.descendants.LawWebSite.visible = true;
	app.pages.AddNewContact1.descendants.GenderField.visible = true;
    app.pages.AddNewContact1.descendants.MartialField.visible = false;
    app.pages.AddNewContact1.descendants.DOBField.visible = false;
    app.pages.AddNewContact1.descendants.AgeField.visible = false;
    app.pages.AddNewContact1.descendants.StreetAddressField.visible = false;
    app.pages.AddNewContact1.descendants.WorkPhoneField.visible = true;
    app.pages.AddNewContact1.descendants.WorkAddressField.visible = true;


}
else if(s=== null){
    app.pages.AddNewContact1.descendants.GenderField.visible = false;
    app.pages.AddNewContact1.descendants.MartialField.visible = false;
    app.pages.AddNewContact1.descendants.DOBField.visible = false;
    app.pages.AddNewContact1.descendants.AgeField.visible = false;
    app.pages.AddNewContact1.descendants.LawFirmField.visible = false;
    app.pages.AddNewContact1.descendants.LawWebSite.visible = false;
    app.pages.AddNewContact1.descendants.MobilePhoneField.visible = false;
    app.pages.AddNewContact1.descendants.WorkPhoneField.visible = false;
    app.pages.AddNewContact1.descendants.WorkAddressField.visible = false;
    app.pages.AddNewMergeContact.descendants.StreetAddressField.visible = false;

}
 

else {
  	app.pages.AddNewContact1.descendants.GenderField.visible = true;
    app.pages.AddNewContact1.descendants.MartialField.visible = false;
    app.pages.AddNewContact1.descendants.DOBField.visible = false;
    app.pages.AddNewContact1.descendants.AgeField.visible = false;
    app.pages.AddNewContact1.descendants.LawFirmField.visible = false;
	app.pages.AddNewContact1.descendants.LawWebSite.visible = false;
    app.pages.AddNewContact1.descendants.MobilePhoneField.visible = false;
    app.pages.AddNewContact1.descendants.WorkPhoneField.visible = true;
    app.pages.AddNewContact1.descendants.WorkAddressField.visible = true;
    app.pages.AddNewMergeContact.descendants.StreetAddressField.visible = false;
    
}


  
  
}