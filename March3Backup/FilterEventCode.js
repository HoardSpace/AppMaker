// Event filter code. In the panels from the SandBox profile page

// Name: Dropdown1
// Label: Sort
// options: ["First Name", "Most Recent"];
// null item name is "Last Name"

// code Events - onValueEdit
function this_original() {
	var sortType = app.pages.ContactList.descendants.Dropdown1.value;
	widget.datasource.query.clearSorting();
	if (sortType === "First Name") {
	widget.datasource.query.sorting.FirstName._ascending();
	}
	else if(sortType === "Most Recent") {
	// Most recent at the top (In this case, nulls on top too
	widget.datasource.query.sorting.DateCreated._descending();
	}
	else{
	console.log("Else statement"); 
	}
	// widget.datasource.items.sort(
	//   function(a, b) {
	//     if (a.FirstName > b.FirstName) {
	//       return 1;
	//     } else {
	//       return -1;
	//     }
	//   }
	// );

	widget.datasource.load();
}

// March 3
function this_cleaned() {
	// Retrieves the sort type selected from dropdown option
	var sortType = app.pages.ContactList.descendants.Dropdown1.value;
	widget.datasource.query.clearSorting();

	if (sortType === "First Name") {
		widget.datasource.query.sorting.FirstName._ascending();
	}
	else if(sortType === "Most Recent") {
		// Most recent at the top (In this case, nulls on top too
		widget.datasource.query.sorting.DateCreated._descending();
	}
	else {
		// Nothing happens and the widget just reloads as usual
		// THe datasource is alredy sorted by LastName
		console.log("Last Name selected."); 
	}

	widget.datasource.load();
}



//----------------------------------
// Button3. arrow_downward

function onclock_original() {
	var sortType = app.pages.ContactList.descendants.Dropdown1.value;
	var nullItem = app.pages.ContactList.descendants.Dropdown1.nullItemName;
	widget.datasource.query.clearSorting();
	if (sortType === "First Name") {
	widget.datasource.query.sorting.FirstName._ascending();
	}
	else if(nullItem === "Last Name") {
	 widget.datasource.query.clearSorting ();
	}
	else if(nullItem === "Most Recent") {
	 widget.datasource.query.sorting.DateCreated._ascending();
	}
	else{
	 console.log("Else statement"); 
	}

	widget.datasource.load();


}

function onclock_cleaned() {
	var sortType = app.pages.ContactList.descendants.Dropdown1.value;
	var nullItem = app.pages.ContactList.descendants.Dropdown1.nullItemName;
	widget.datasource.query.clearSorting();

	if (sortType === "First Name") {
	widget.datasource.query.sorting.FirstName._ascending();
	}
	else if (sortType === "Most Recent") {
	 widget.datasource.query.sorting.DateCreated._ascending();
	}
	else if (nullItem === "Last Name") {
	 widget.datasource.query.clearSorting ();
	}
	else {
	 console.log("Else statement"); 
	}

	widget.datasource.load();
}

//----------------------------------
// Button 5. arrow_upward

function onclick_orginal() {
	var sortType = app.pages.ContactList.descendants.Dropdown1.value;
	var nullItem = app.pages.ContactList.descendants.Dropdown1.nullItemName;
	widget.datasource.query.clearSorting();
	if (sortType === "First Name") {
	widget.datasource.query.sorting.FirstName._descending();
	}
	else if(nullItem === "Last Name") {
	 widget.datasource.query.sorting.LastName._descending(); 
	}
	else if(nullItem === "Most Recent") {
	 widget.datasource.query.sorting.DateCreated._descending(); 
	}
	else{
	 console.log("Else statement"); 
	}

	widget.datasource.load();
}

function onclick_cleaned() {
	var sortType = app.pages.ContactList.descendants.Dropdown1.value;
	var nullItem = app.pages.ContactList.descendants.Dropdown1.nullItemName;
	widget.datasource.query.clearSorting();

	if (sortType === "First Name") {
	widget.datasource.query.sorting.FirstName._descending();
	}
	else if(sortType === "Most Recent") {
	 widget.datasource.query.sorting.DateCreated._descending(); 
	}
	else if(nullItem === "Last Name") {
	 widget.datasource.query.sorting.LastName._descending(); 
	}
	else{
	 console.log("Else statement"); 
	}

	widget.datasource.load();
}