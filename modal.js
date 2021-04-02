/** @format */

function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// formData to show that specific error input
const formData1 = document.querySelectorAll(".formData1");

const form = document.getElementById("form");
const submitBtn = document.getElementById("btn-submit");
const confirmationMessage = document.getElementById("confirmation");
const modalClose = document.querySelector(".close");
const errorFix = document.getElementById("errorFix");

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDay = document.getElementById("birthdate");
const tournaments = document.getElementById("quantity");
const radioButtons = document.querySelectorAll("[name='location']");
const radioButtonsArray = Array.from(radioButtons);
const termsAndConditions = document.getElementById("checkbox1");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}
//--Close modal form + reset after closing
//__add this function on top of the listener
//__to prevent access before initialization
const closeButtonX = () => {
	modalbg.style.display = "none";
	form.reset();
	console.log("closeButtonX=Click");
	removeInvalidInputs();
	removeConfirmation();
};
// close modal event
modalClose.addEventListener("click", closeButtonX);

function onSubmit(e) {
	// prevent submission and page refresh
	e.preventDefault();
	// remove styling and messages of former invalid input fields
	removeInvalidInputs();
	// check validity of user input
	let invalidInput = invalidInputs().length;
	if (invalidInput === 0) {
		console.log("Test if submit is true");

		// TRUE - change the modal to confirmation message
		setConfirmation();
	} else {
		console.log("submit1");
	}
}

// prevent submit
// form.addEventListener("submit", (e) => {
//  e.preventDefault();
//  console.log("form event ");
//  invalidInputs();

// });
// function validateForm() {
// }

function setConfirmation() {
	confirmationMessage.style.display = "flex";
	submitBtn.value = "Close";
	form.removeEventListener("submit", onSubmit);

	console.log("move close button outside");
	// form.addEventListener("click", (e) => {
	//   e.preventDefault();

	// });
}

function removeConfirmation() {
	confirmationMessage.style.display = "none";
	submitBtn.value = "Go";
	form.removeEventListener("click", (e) => {
		e.preventDefault();
		closeButtonX();
	});
	form.addEventListener("submit", onSubmit);
	console.log("??");
}

// handle submit event
form.addEventListener("submit", onSubmit);

function removeInvalidInputs() {
	formData.forEach((node) => node.removeAttribute("data-error-visible"));
	formData.forEach((node) => node.removeAttribute("data-error"));
	lastName.classList.remove("confirmSuccess");
	firstName.classList.remove("confirmSuccess");
	email.classList.remove("confirmSuccess");
	birthDay.classList.remove("confirmSuccess");
	tournaments.classList.remove("confirmSuccess");
}

// check the value for inputs
const invalidInputs = () => {
	let falseValues = [];
	console.log(falseValues);
	// Constraint validation API properties
	// alternative methods  __firstName.validity.valid or __firstName.checkValidity()
	if (firstName.validity.tooShort || firstName.value.trim() === "") {
		// If the data is too short
		//trim() - Remove whitespace from both sides of a string:
		// display the following error message.]
		falseValues.push(firstName);
		showError(firstName, "Please enter 2+ characters for name field.");
	} else {
		onSuccess(firstName);
		firstName.classList.add("smallG");
	}
	// Constraint validation API properties
	// alternative methods  __lastName.validity.valid or __lastName.checkValidity()
	if (lastName.validity.tooShort || lastName.value.trim() === "") {
		// If the data is too short
		// display the following error message.
		falseValues.push(lastName);

		showError(lastName, "Please enter 2+ characters for name field.");
	} else {
		onSuccess(lastName);
		lastName.classList.add("smallG");
	}

	const mailFormat = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
	if (email.validity.valueMissing) {
		// If the field is empty
		// display the following error message.
		falseValues.push(email);

		showError(email, "Email cannot be blank");
	} else if (!email.value.match(mailFormat)) {
		console.log("email inccorect");
		showError(email, "Please enter the valid Email");
	} else {
		onSuccess(email);
		email.classList.add("smallG");
	}

	const regExDate = new RegExp(
		"(19[0-9][0-9]|20[0-1][0-9]|2020)[-](0?[1-9]|1[0-2])[-]([0][1-9]|[12][0-9]|3[01])$"
	);
	// const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

	if (!regExDate.test(birthDay.value)) {
		showError(birthDay, "Please enter a valid Date");
		falseValues.push(birthDay);
	} else {
		onSuccess(birthDay);
		birthDay.classList.add("smallG");
	}
	if (
		tournaments.validity.rangeUnderflow ||
		tournaments.validity.rangeOverflow ||
		tournaments.validity.valueMissing
	) {
		falseValues.push(tournaments);

		showError(tournaments, "Please Enter how many tournaments");

		// return false;
	} else {
		onSuccess(tournaments);

		// return true
	}
	// I use some() tests whether at least one element in the array pass the condition
	if (!radioButtonsArray.some((el) => el.checked)) {
		 console.log("Please choose one button");
		 errorFix.style.display="block";

		falseValues.push(radioButtons[0]);
	} else {
		// if success 
		errorFix.style.display="none";

	}

	if (!termsAndConditions.checked) {
		showError(termsAndConditions, "Please agree to the terms and conditions.");
		falseValues.push(termsAndConditions);
	} else {
		onSuccess(termsAndConditions);
		// return true;
	}
	return falseValues;
};

// function  to show error message
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.setAttribute("data-error-visible", "true");
	formControl.setAttribute("data-error", message);
};

// function  to show confirmation message
const onSuccess = (input, message) => {
	const formControl = input.parentElement;
	formControl.removeAttribute("data-error-visible", "true");
	formControl.removeAttribute("data-error", message);
	input.classList.add("confirmSuccess");
};
