/**
 * Check if email is inform of
 * ***@***.***
 * there are several cases but this should do it.
 */
export const checkEmailFormat = (email) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return false;
  return true;
};
/**
 * This function chaecks for length of the string argument
 * It returns true or false
 */
export const checkPwLength = (password) => {
  return password.length >= 8;
};

/**
 * This checks for the first character of the string is a letter
 * return true or false
 */
export const checkPwFirstChar = (password) => {
  return password.substr(0, 1).match(/[a-z]/i);
};

/**
 * Check if the password contains any number
 * return true or false
 */
export const checkPwForNumbers = (password) => {
  return /\d/.test(password);
};

/**
 * Check for any special character
 * return true or false
 */
export const checkPwForSpecialChar = (password) => {
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return specialChars.test(password);
};

export const isValidPw = (password) => {
  return (
    checkPwFirstChar(password) &&
    checkPwForNumbers(password) &&
    checkPwLength(password) &&
    checkPwForSpecialChar(password)
  );
};

/**
 * veryfy if balance is 0
 * @param {*} arr
 * @returns true or false
 */
export const entriesBalance = (arr) => {
  let total1 = arr[0].total;
  let total2 = arr[1].total;
  const type1 = arr[0].type;
  const type2 = arr[1].type;
  if (type1 === "Credit") total1 *= -1;
  else if (type2 === "Credit") total2 *= -1;
  const sum = total1 + total2;
  return sum === 0;
};
/**
 * veryfy if all required fields are filled
 * @param {*} arr
 * @returns true or false
 */
export const isGood = (arr) => {
  const a1 = arr[0];
  const a2 = arr[1];
  if (a1.parent === null || a2.parent === null)
    return [false, "Must include parent account."];
  if (a1.name === "" || a2.name === "") return [false, "Must include name."];
  if (a1.type === "" || a2.type === "")
    return [false, "Must include debit or credit."];
  if (a1.total === 0 || a2.total === 0) return [false, "Must include amount."];
  if (a1.parent === a2.parent)
    return [false, "Parent accounts must be different."];
  if (a1.type === a2.type) return [false, "Entry types must be different."];
  if (a1.total < 0 || a2.total < 0)
    return [false, "Amount cannot be negative."];
  if (isNaN(a1.total) || isNaN(a2.total))
    return [false, "Amount contain letter(s)."];
  for (const ar of arr) {
    for (const am of ar.amount) {
      if (Number(am.amount) < 0)
        return [false, "All amounts must be positive."];
    }
  }
  return [true, ""];
};
