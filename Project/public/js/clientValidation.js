const loginform = document.getElementById("login-form");
const searchform = document.getElementById("search-form");

const signupform = document.getElementById("signup-form");

//login inputs
const emailAddressInput = document.getElementById("emailAddressInput");
const passwordInput = document.getElementById("passwordInput");
//search input
const searchInput = document.getElementById("searchInput");

//signup inputs
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const dateInput = document.getElementById("dateInput");
const createEmailInput = document.getElementById("createEmailAddressInput");
const createPasswordInput = document.getElementById("createPasswordInput");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");
const usernameInput = document.getElementById("usernameInput");

if (loginform) {
  loginform.addEventListener("submit", (event) => {
    try {
      checkEmail(emailAddressInput.value);
      checkPassword(passwordInput.value);
      //error.hidden = true
    } catch (e) {
      event.preventDefault();
      error.innerHTML = e;
    }
  });
}

if (searchform) {
  searchform.addEventListener("submit", (event) => {
    try {
      /*
            There is no client-side validation for this event
            Users can enter an empty string and it will just search for all users
            Search function is a partial match
            */
    } catch (e) {
      event.preventDefault();
      error.innerHTML = e;
    }
  });
}

if (signupform) {
  signupform.addEventListener("submit", (event) => {
    try {
      checkStr(firstNameInput);
      checkStr(lastNameInput);
      checkStr(createEmailInput);
      checkStr(usernameInput);
      checkStr(createPasswordInput);
      checkStr(confirmPasswordInput);
      checkPassword(createPasswordInput);
      checkDate(dateInput);
      checkUsername(usernameInput);
      if (createPasswordInput !== confirmPasswordInput)
        throw "Error: passwords do not match";
    } catch (e) {
      event.preventDefault();
      console.log("made it here");
      error.innerHTML = e;
    }
  });
}

function checkStr(str) {
  if (!str) throw "Error: please enter text";
  if (typeof str != "string") throw "error: input must be a string";
  str = str.trim();
  if (str.length == 0) throw "cannot enter nothing or empty spaces";
}

function checkDate(date) {
  console.log(date);
  //complete this functionality
}
function checkUsername(username) {
  console.log(username);
  //complete this functionalty
}

function checkEmail(email) {
  if (!email) throw "Error: please enter an email";
  if (typeof email != "string") throw "Error: email must be a string";
  email = email.trim();
  let emailpattern = /[\w-_.]+[\w]+\@[\w+-]+\.[\w]+[\w]+/g;
  let emailmatch = email.match(emailpattern);
  if (emailmatch == null) throw "invalid email";
}

function checkPassword(password) {
  if (!password) throw "Error: please enter a password";
  if (typeof password != "string") throw "Error: password must be a string";
  password = password.trim();

  //at least one uppercase
  //at least one number
  //at least one special character
  let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/g;
  //https://stackoverflow.com/a/72686232
  let passmatch = password.match(regex);
  if (passmatch == null)
    throw "Password must contain at least one uppercase, number, and special character and be at least 8 characters";
}
