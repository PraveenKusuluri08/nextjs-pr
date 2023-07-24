/***
 * @param {string} email
 */

export const validateEmail = (email: string) => {
  const regex =new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/)
  return regex.test(email)
}

/***
 * @param {string} password
 */
export const validatePassword = (password: string) => {
  const regex =new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,25}$/)
  return regex.test(password)
}

/***
 * @param {string} mobile
 */
export const validateMobileNumber = (mobile: string) => {
  const regex = /^(\+\d{1,3})?\d{10}$/
  return regex.test(mobile)
}
