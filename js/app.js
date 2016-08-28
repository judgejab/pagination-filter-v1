//Problem: Shows too many people per page
//Solution: Incorporate pagination and add search functionality

'useStrict';


//Find total number of students
var studentTotal = document.getElementsByClassName("student-item").length;
var itemsToShowPerPage = 10;

//empty array of objects for students
var studentArray = [];


//Cach DOM elements for easy access
var page = document.querySelector(".page");
var paginationLink = document.getElementsByClassName("pagination-link");
var studentList = document.querySelector(".student-list");


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
	var pagesNeeded = Math.ceil(studentTotal/itemsToShowPerPage);
	return pagesNeeded;
} 


//create student object
function studentObject(name, avatar, email, dateJoined) {
	this.name = name;
	this.avatar = avatar;
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
		student = new studentObject(name, avatar, email, dateJoined);
		
		//add each student into the array for later use
		studentArray.push(student);		
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
	avatarImg.src = student.avatar;
	nameH = document.createElement('h3');
	nameH.innerHTML = student.name;
	emailSpan = document.createElement('span');
	emailSpan.innerHTML = student.email;
	//add their classes
	avatarImg.classList.add('avatar');
	emailSpan.classList.add('email');

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

	//create template
	var wrapper = document.createElement('div');
	wrapper.classList.add('pagination');
	var pagList = document.createElement('ul');
	pagList.classList.add("pagination-links");
	wrapper.appendChild(pagList);
	

	var pageCount = calculatePageCount();

	//add individual elements
	for(var i = 1; i <= pageCount; i++) {
		pagLink = document.createElement('li');
		link = document.createElement('a');
		link.innerHTML = i;
		link.href = "#";
		pagLink.appendChild(link);
		pagList.appendChild(pagLink);
	}

	//make first link 'active'
	pagList.children[0].children[0].classList.add("active");
	//add to wrapper
	wrapper.appendChild(pagList);
	//add wrapper to page
	page.appendChild(wrapper);
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
    if (calculatePageCount() > 1) {
      displayPaginationLinks();
   }
   	//show first 10 students
	studentShow(0, 9);
}


//Add search function
	//Using progressive enhancement, add the student search markup as presented in the filters-example.html file to the index.html file.
	//Make sure it's case insensitive
	//User can search by name or e-mail address. Also partial matches
	//Dynamically filter the student listings.
	//Results should also be paginated. Don't use jQuery
	//If no matches are found, add HTML message to say so


//Event Listeners
	//Search button

	//Pagination
	for(var i = 0; i < paginationLink.length; i++) {
		paginationLink[i].addEventListener("click", paginate);
	}