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
const form = document.getElementById("form");
const submitBtn = document.getElementById("btn-submit");
const confirmationMessage = document.getElementById("confirmation");
const modalClose = document.querySelector(".close");

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
  removeInvalidInputs;
};
// close modal event
modalClose.addEventListener("click", closeButtonX);

function removeInvalidInputs() {
	formData.forEach((node) => node.removeAttribute("data-error-visible"));
	formData.forEach((node) => node.removeAttribute("data-error"));
  lastName.classList.remove("confirmSuccess");
	firstName.classList.remove("confirmSuccess");
	email.classList.remove("confirmSuccess");
	birthDay.classList.remove("confirmSuccess");
	tournaments.classList.remove("confirmSuccess");
}


