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
}

// remove invalid input styles and messages
function removeInvalidInputs() {
	formData.forEach((node) => {
		node.removeAttribute('data-error-visible');
		node.removeAttribute('data-error');
	});
	[firstName, lastName, email, birthDay, tournaments].forEach((input) =>
		input.classList.remove('confirmSuccess')
	);
	errorFix.style.display = 'block';
}

// check validity of user input
function invalidInputs() {
	let falseValues = [];

	// check for first and last name
	[firstName, lastName].forEach((input) => {
		if (isInputInvalid(input)) {
			falseValues.push(input);
			showError(input, 'Please enter 2+ characters for name field.');
		} else {
			onSuccess(input);
			input.classList.add('smallG');
		}
	});

	// Email validation
	if (!isValidEmail(email.value)) {
		falseValues.push(email);
		showError(email, 'Please enter a valid Email.');
	} else {
		onSuccess(email);
		email.classList.add('smallG');
	}

	// Date of birth validation
	if (!isValidDate(birthDay.value)) {
		falseValues.push(birthDay);
		showError(birthDay, 'Please enter a valid date of birth.');
	} else {
		onSuccess(birthDay);
		birthDay.classList.add('smallG');
	}

	// Number of tournaments validation
	if (!isValidNumber(tournaments.value)) {
		falseValues.push(tournaments);
		showError(tournaments, 'Please enter a valid number for tournaments.');
	} else {
		onSuccess(tournaments);
	}

	// check if a radio button is selected
	if (!isRadioButtonSelected()) {
		falseValues.push(radioButtons[0]);
		errorFix.style.display = 'block';
	} else {
		errorFix.style.display = 'none';
	}

	// check if terms and conditions are checked
	if (!termsAndConditions.checked) {
		showError(termsAndConditions, 'Please agree to the terms and conditions.');
		falseValues.push(termsAndConditions);
	} else {
		onSuccess(termsAndConditions);
	}

	return falseValues;
}

// check if input is invalid
function isInputInvalid(input) {
	return (
		input.validity.tooShort || input.value.trim() === '' || input.validity.valueMissing
	);
}

// check if radio button is selected
function isRadioButtonSelected() {
	return radioButtonsArray.some((el) => el.checked);
}

// Email validation function
function isValidEmail(email) {
	const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
	return regex.test(email);
}

// Number validation function
function isValidNumber(number) {
	return number !== '' && !isNaN(number) && number >= 0;
}

// Date validation function
function isValidDate(date) {
	return !isNaN(Date.parse(date));
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
	formControl.removeAttribute('data-error-visible');
	formControl.removeAttribute('data-error');
	input.classList.add('confirmSuccess');
}
