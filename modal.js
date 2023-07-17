// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const form = document.getElementById('form');
const submitBtn = document.getElementById('btn-submit');
const confirmationMessage = document.getElementById('confirmation');
const modalClose = document.querySelector('.close');
const errorFix = document.getElementById('errorFix');

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthDay = document.getElementById('birthdate');
const tournaments = document.getElementById('quantity');
const radioButtons = document.querySelectorAll("[name='location']");
const radioButtonsArray = Array.from(radioButtons);
const termsAndConditions = document.getElementById('checkbox1');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
}

// close modal event
modalClose.addEventListener('click', closeButtonX);

// close modal form + reset after closing
function closeButtonX() {
	modalbg.style.display = 'none';
	form.reset();
	removeInvalidInputs();
	removeConfirmation();
	errorFix.style.display = 'none';
}

// handle submit event
form.addEventListener('submit', onSubmit);

// submit event handler
function onSubmit(e) {
	e.preventDefault();
	removeInvalidInputs();
	let invalidInputsCount = invalidInputs().length;
	if (invalidInputsCount === 0) {
		setConfirmation();
	} else {
		console.log('submit1');
	}
}

// set confirmation message
function setConfirmation() {
	confirmationMessage.style.display = 'flex';
	submitBtn.value = 'Close';
	form.removeEventListener('submit', onSubmit);
}

// remove confirmation message
function removeConfirmation() {
	confirmationMessage.style.display = 'none';
	submitBtn.value = 'Go';
	form.addEventListener('submit', onSubmit);
	console.log('Form Submit');
}

// remove invalid input styles and messages
function removeInvalidInputs() {
	formData.forEach((node) => node.removeAttribute('data-error-visible'));
	formData.forEach((node) => node.removeAttribute('data-error'));
	lastName.classList.remove('confirmSuccess');
	firstName.classList.remove('confirmSuccess');
	email.classList.remove('confirmSuccess');
	birthDay.classList.remove('confirmSuccess');
	tournaments.classList.remove('confirmSuccess');
	errorFix.style.display = 'block';
}

// check validity of user input
function invalidInputs() {
	let falseValues = [];

	if (isInputInvalid(firstName)) {
		falseValues.push(firstName);
		showError(firstName, 'Please enter 2+ characters for name field.');
	} else {
		onSuccess(firstName);
		firstName.classList.add('smallG');
	}

	if (isInputInvalid(lastName)) {
		falseValues.push(lastName);
		showError(lastName, 'Please enter 2+ characters for name field.');
	} else {
		onSuccess(lastName);
		lastName.classList.add('smallG');
	}

	if (isInputInvalid(email, 'Email cannot be blank')) {
		falseValues.push(email);
		showError(email, 'Please enter the valid Email');
	} else {
		onSuccess(email);
		email.classList.add('smallG');
	}

	if (isInputInvalid(birthDay, 'Please enter a valid Date')) {
		falseValues.push(birthDay);
	} else {
		onSuccess(birthDay);
		birthDay.classList.add('smallG');
	}

	if (isInputInvalid(tournaments, 'Please Enter how many tournaments')) {
		falseValues.push(tournaments);
	} else {
		onSuccess(tournaments);
	}

	if (!isRadioButtonSelected()) {
		falseValues.push(radioButtons[0]);
		errorFix.style.display = 'block';
	} else {
		errorFix.style.display = 'none';
	}

	if (!termsAndConditions.checked) {
		showError(termsAndConditions, 'Please agree to the terms and conditions.');
		falseValues.push(termsAndConditions);
	} else {
		onSuccess(termsAndConditions);
	}

	return falseValues;
}

// check if input is invalid
function isInputInvalid(input, message) {
	if (
		input.validity.tooShort ||
		input.value.trim() === '' ||
		input.validity.valueMissing
	) {
		if (message) {
			showError(input, message);
		}
		return true;
	}
	return false;
}

// check if radio button is selected
function isRadioButtonSelected() {
	return radioButtonsArray.some((el) => el.checked);
}

// show error message
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.setAttribute('data-error-visible', 'true');
	formControl.setAttribute('data-error', message);
}

// show confirmation message
function onSuccess(input) {
	const formControl = input.parentElement;
	formControl.removeAttribute('data-error-visible', 'true');
	formControl.removeAttribute('data-error');
	input.classList.add('confirmSuccess');
}
