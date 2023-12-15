//validation functions

function checkName(str) {
  return str;
}

function checkEmail(str) {
  return str;
}

function checkUsername(str) {
  return str;
}

function checkPassword(str) {
  return str;
}

function checkStr(str) {
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
