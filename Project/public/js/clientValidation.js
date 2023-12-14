
const loginform = document.getElementById("login-form")


const emailAddressInput = document.getElementById("emailAddressInput")
const passwordInput = document.getElementById("passwordInput")

if (loginform) {
    loginform.addEventListener('submit', (event) => {
        try {
            checkEmail(emailAddressInput.value)
            checkPassword(passwordInput.value)
            error.hidden = true
        } catch (e) {
            event.preventDefault()
            error.innerHTML = e
        }
    })
}





function checkEmail(email) {
    if (!email) throw 'Error: please enter an email'
    if (typeof email != "string") throw "Error: email must be a string"
    email = email.trim()
    let emailpattern = /[\w-_.]+[\w]+\@[\w+-]+\.[\w]+[\w]+/g
    let emailmatch = email.match(emailpattern)
    if (emailmatch == null)
          throw "invalid email"
}

function checkPassword(password) {
    if (!password) throw 'Error: please enter a password'
    if (typeof password != "string") throw 'Error: password must be a string'
    password = password.trim()

    //at least one uppercase
    //at least one number
    //at least one special character
    let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/g
    //https://stackoverflow.com/a/72686232
    let passmatch = password.match(regex)
    if (passmatch == null)
        throw "Password must contain at least one uppercase, number, and special character and be at least 8 characters"
}