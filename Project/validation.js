//validation functions

function checkName(str) {
  return str;
}

function checkEmail(str) {
  if (!str) throw "Error with email"
  if (typeof str != "string") throw "Error with email"
  str = str.trim()

  str = str.toLowerCase()
  return str;
}

function checkUsername(str) {
  if (!str) throw "Error with username"
  if (typeof str != "string") throw "Error with username"
  str = str.trim()
  if (str.length == 0) throw "Error with username"
  str = str.toLowerCase()
  return str;
}

function checkPassword(str) {
  return str;
}

function checkStr(str) {
  if (!str) throw "Error with string"
  if (typeof str != "string") throw "Error with string"
  str = str.trim()
  if (str.length == 0) throw "Error with string"
  return str;
}

function getAge(date) {
  let bday = new Date(date);
  bday.setDate(bday.getDate() + 1);
  const today = new Date();
  let age = today.getFullYear() - bday.getFullYear();

  if (
    !(
      today.getMonth() > bday.getMonth() ||
      (today.getMonth() === bday.getMonth() &&
        today.getDate() >= bday.getDate())
    )
  ) {
    age--;
  }
  return age;
}

export default {
  checkName,
  checkEmail,
  checkUsername,
  getAge,
  checkPassword,
  checkStr,
};
