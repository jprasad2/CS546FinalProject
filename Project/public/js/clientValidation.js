let signupform = document.getElementById("signup-form");
console.log(signupform);
const loginform = document.getElementById("login-form");
console.log(loginform);
const searchform = document.getElementById("search-form");

const createportform = document.getElementById("createport-form");

//login inputs
const emailAddressInput = document.getElementById("emailAddressInput");
const passwordInput = document.getElementById("passwordInput");
//search input
const searchInput = document.getElementById("searchInput");
const error = document.getElementsByClassName("error");

//signup inputs
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const dateInput = document.getElementById("dateInput");
const createEmailInput = document.getElementById("createEmailAddressInput");
const createPasswordInput = document.getElementById("createPasswordInput");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");
const usernameInput = document.getElementById("usernameInput");

//deletePosts
const editPortfolio = document.getElementById("editPortfolio");
const deleteButtons = document.querySelectorAll(".deletePostBtn");
const postsToDeleteInput = document.getElementById("postsToDelete");

const subjectInput = document.getElementById("subjectInput");
const errorDiv = document.getElementById("error");
const createdDiv = document.getElementById("created");
const clickablePortfolios = document.getElementsByClassName("portfolio");
const postdiv = document.getElementById("post");

if (clickablePortfolios) {
  console.log("hi");
  for (const clickablePortfolio of clickablePortfolios) {
    clickablePortfolio.addEventListener("click", (event) => {
      console.log(clickablePortfolio.id);
      console.log("clicked");

      let requestConfig = {
        method: "GET",
        url: `http://localhost:3000/user/listposts/${clickablePortfolio.id}`,
      };
      $.ajax(requestConfig).then(function (data) {
        // subject.innerHTML = "test";

        if (data.Posts.length === 0) {
          console.log("hit here");
        } else {
          clickablePortfolio.style.display = "none";
          let subject = document.createElement("h2");
          subject.textContent = "Viewing " + data.Subject + " portfolio";

          postdiv.append(subject);
          postdiv.style.display = "inline";
          for (let posts of data.Posts) {
            console.log;
            let request = {
              method: "GET",
              url: `http://localhost:3000/user/postdetails/${posts._id}`,
            };
            $.ajax(request).then(function (postData) {
              console.log(postData);
              let p = document.createElement("div");
              p.classList.add("individualpost");

              let title = document.createElement("h3");
              title.textContent = postData.Title;

              let linkdescriptor = document.createElement("dt");
              linkdescriptor.textContent = "Link to content";
              let url = document.createElement("a");
              url.setAttribute("href", postData.Url);
              url.textContent = "click here to view";

              let descriptiondescriptor = document.createElement("dt");
              descriptiondescriptor.textContent = "Description:";
              let description = document.createElement("dd");
              description.textContent = postData.Description;

              let closebutton = document.createElement("button");
              closebutton.textContent = "view less";
              closebutton.addEventListener("click", function () {
                postdiv.style.display = "none";
                clickablePortfolio.style.display = "block";
                postdiv.innerHTML = "";
              });

              p.append(title);
              p.append(url);
              p.append(descriptiondescriptor);
              p.append(description);
              p.append(closebutton);

              postdiv.append(p);
            });
          }
        }
      });
    });
  }
}

if (loginform) {
  loginform.addEventListener("submit", (event) => {
    try {
      checkEmail(emailAddressInput.value);
      checkPassword(passwordInput.value);
      //error.hidden = true
    } catch (e) {
      event.preventDefault();
      errorDiv.innerHTML = e;
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
      //error.hidden = false
      errorDiv.innerHTML = e;
    }
  });
}

if (createportform) {
  createportform.addEventListener("submit", (event) => {
    try {
      checkStr(subjectInput.value);
      //createportform.submit()
    } catch (e) {
      event.preventDefault();
      errorDiv.innerHTML = e;
      createdDiv.innerHTML = "";
    }
  });
}

if (signupform) {
  signupform.addEventListener("submit", (event) => {
    console.log("form submitted");
    //event.preventDefault();

    try {
      checkStr(firstNameInput.value);
      checkStr(lastNameInput.value);
      checkStr(createEmailInput.value);
      checkStr(usernameInput.value);
      checkStr(createPasswordInput.value);
      checkStr(confirmPasswordInput.value);
      //checkPassword(createPasswordInput);
      checkDate(dateInput.value);
      checkUsername(usernameInput.value);
      if (createPasswordInput.value !== confirmPasswordInput.value)
        throw "Error: passwords do not match";
      signupform.submit();
    } catch (e) {
      event.preventDefault();
      console.log(e);

      console.log("made it here");
      errorDiv.innerHTML = e;
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
  let today = new Date();
  let bday = new Date(date);
  bday.setDate(bday.getDate() + 1);
  let cutoff = new Date();
  cutoff.setFullYear(today.getFullYear() - 13);
  cutoff.setDate(cutoff.getDate() + 1);
  if (bday > cutoff) {
    console.error("invalid bday");
    throw "error: must be atleast 13 years old to create an account";
  }
  //complete this functionality
}
function checkUsername(username) {
  console.log(username);
  if (username.length < 2) {
    throw "error: username must be atleast 3 characters";
  }
  if (username.length > 25) {
    throw "error:username must be at most 15 characters";
  }
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

if (editPortfolio) {
  console.log("made it here");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const postElement = this.closest(".editPortPosts");
      postElement.remove();
    });
  });
}
