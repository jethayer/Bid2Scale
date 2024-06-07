// Validates password is not empty and in correct format during registration
export function passwordValidator(password) {
  //checks that a password meets the mininmum requirements of at least 8 characters 
  //An upper case letter [A-Z], a lower case letter [a-z], a number, and a special character [@$!%*?&]"
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if (!password) return "Password can't be empty."
  if (!re.test(password)) {
    return "Password must contain the following: \nAt least 8 characters \nAn upper case letter [A-Z]\nA lower case letter [a-z] \nA number \nA special character [@$!%*?&]"
  }
  return ''
}
