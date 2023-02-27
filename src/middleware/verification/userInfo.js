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
