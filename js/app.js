//Problem: Shows too many people per page
//Solution: Incorporate pagination and add search functionality

'useStrict';

//empty array of objects for students
var studentArray = [];
var studentArrayCopy = [];
var itemsToShowPerPage = 10;


//Cach DOM elements for easy access
var noResultsP;
var noResultsM;
var page = document.querySelector(".page");
var studentList = document.querySelector(".student-list");
var paginationLink = document.getElementsByClassName('pagination-link');


//Call buildSearch()
buildSearch();
//display initial page
initialDisplay();


function studentShow(start, end) {
	studentList.innerHTML = '';

	for(var i = start; i <= end; i++){
		var newStudent = displayStudents(studentArray[i]);
		studentList.appendChild(newStudent);
	}
}


//builds search
function buildSearch () {
	var pageHeader = document.querySelector('.page-header');
	var searchWrap = document.createElement('div');
	var searchInput = document.createElement('input');
	var searchButton = document.createElement('button');

	searchWrap.classList.add('student-search');
	searchButton.classList.add('search-button');
	searchInput.setAttribute('placeholder', 'Search for students...');
	searchInput.classList.add('student-search-input');
	searchButton.textContent = ('Search');
	searchWrap.appendChild(searchInput);
	searchWrap.appendChild(searchButton);
	pageHeader.appendChild(searchWrap);
}


//Calculate the number of pages needed
function calculatePageCount() {
	var pagesNeeded = Math.ceil(studentArray.length/itemsToShowPerPage);
	return pagesNeeded;
} 

//create student object
function studentObject(avatar, name, email, dateJoined) {
	this.avatar = avatar;
	this.name = name;
	this.email = email;
	this.dateJoined = dateJoined;
}

//filter students and create an array of objects
function studentFilter() {
	var student, name, avatar, email, dateJoined;

	var studentList = document.querySelectorAll('.student-list')[0].children;
	for(var i = 0; i < studentList.length; i++) {
		avatar = studentList[i].children[0].children[0].src;
		name = studentList[i].children[0].children[1].innerHTML;
		email = studentList[i].children[0].children[2].innerHTML;
		dateJoined = studentList[i].children[1].children[0].innerHTML;

		//create new object
		student = new studentObject(avatar, name, email, dateJoined);
		
		//add each student into the array for later use
		studentArray.push(student);		
		studentArrayCopy.push(student);
	}
}




//construct html for student
function displayStudents(student) {
	var listItem, detailsDiv, joinedDetails, avatarImg, nameH, emailSpan, date;

	//Create student list item
	listItem = document.createElement('li');
	//add it's classes
	listItem.classList.add('student-item');
	listItem.classList.add('cf');

	//create first div for student details
	detailsDiv = document.createElement('div');
	//add it's class
	detailsDiv.classList.add('student-details');

	//create the details to go into detailsDiv
	avatarImg = document.createElement('img');
	avatarImg.className = ('avatar');
	avatarImg.src = student.avatar;
	nameH = document.createElement('h3');
	nameH.innerHTML = student.name;
	emailSpan = document.createElement('span');
	emailSpan.innerHTML = student.email;
	//add their classes
	
	emailSpan.classList.add('email');
	nameH.classList.add('name');
	//add details to detailsDiv
	detailsDiv.appendChild(avatarImg);
	detailsDiv.appendChild(nameH);
	detailsDiv.appendChild(emailSpan);

	//create second div for joinedDetails
	joinedDetails = document.createElement('div');
	//add it's class
	joinedDetails.classList.add('joined-details');

	//create date to put into joinedDetails
	date = document.createElement('span');
	date.innerHTML = student.dateJoined;
	//add it's class
	date.classList.add('date');

	//add date to joinDetails
	joinedDetails.appendChild(date);

	//add divs to listItem
	listItem.appendChild(detailsDiv);
	listItem.appendChild(joinedDetails);

	return listItem;
}



function displayPaginationLinks() {
	var link, pagLink;

	var pageCount = calculatePageCount();


	//create template
	var wrapper = document.createElement('div');
	wrapper.classList.add('pagination');
	var pagList = document.createElement('ul');
	pagList.classList.add("pagination-links");
	wrapper.appendChild(pagList);
	


	//add individual elements
	for(var i = 0; i < pageCount; i++) {
		pagLink = document.createElement('li');
		pagLink.classList.add("pagination-item");
		link = document.createElement('a');
		link.classList.add("pagination-link");
		link.innerHTML = i + 1;
		link.href = "#";
		pagLink.appendChild(link);
		pagList.appendChild(pagLink);
	}

	//add to wrapper
	wrapper.appendChild(pagList);
	//add wrapper to page
	page.appendChild(wrapper);

	//make first link 'active'
	paginationLink[0].classList.add('active');
}

function paginate(event) {
	event.preventDefault();

	//variables for 
	var start, end;

	//reset link class
	for(var i = 0; i < paginationLink.length; i++) {
        paginationLink[i].className = "pagination-link";
    }

    //THIS link's class will be active
    this.classList.add('active');

    //show the right section of item lists
    start = this.innerHTML * 10 - 10;
    end = this.innerHTML * 10 - 1;

    //make sure if end of list, only show the remaining few
    if(end > studentArray.length){
    	end = studentArray.length -1;
    }

    studentShow(start, end);
}


function initialDisplay() {
	studentFilter();
    //displayStudents(studentArray);
    if (calculatePageCount() > 0) {
      displayPaginationLinks();
         for (var i = 0; i < paginationLink.length; i++) {
        paginationLink[i].addEventListener("click", paginate);
      }
    
   }

       if(document.querySelector('.no-results-found')) {
      document.querySelector('.no-results-found').outerHTML = "";
    }

   	//show first 10 students
	studentShow(0, 9);
}


//Add search function
function searchFunction() {
	var input = document.querySelector('.student-search-input').value.toLowerCase();

	//Go through names and emails of students
	//If input does not match to names and emails then remove the student from the list array so it doesn't show any more
	for(var i = studentArray.length -1; i >= 0; i--){
		console.log(i);
		if(studentArray[i].name.indexOf(input) === -1 && studentArray[i].email.indexOf(input) === -1) {
			studentArray.splice(i, 1);
		}
	}


    document.querySelector('.pagination').outerHTML = '';
   
	studentList.innerHTML = '';

	 if(studentArray.length >= 1) {
      // Add the filtered students
      // (assuming one or more student matches from above)
      initialDisplay();
    } else {
	//If no matches are found, add HTML message to say so
	noResultsP = document.createElement('p');
	noResultsP.classList.add('no-results-found');
	noResultsM = "Sorry! No results were found";
	noResultsP.innerHTML = noResultsM;
	page.appendChild(noResultsP);
	}
	//when done, empty array
	//copy the array from the copy version back into thew studentArray so it goes back to normal
	//Then load intial view
	studentArray = studentArrayCopy.slice(0);
}
	

	


//Event Listeners
	//Search button
	document.querySelector('button').addEventListener("click", searchFunction);
	document.querySelector('input').addEventListener("keyup", searchFunction);

	//Pagination
	for(var i = 0; i < paginationLink.length; i++) {
		paginationLink[i].addEventListener("click", paginate);
	}