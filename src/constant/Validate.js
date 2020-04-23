export const isPhoneNumber = (phoneNumber) => {
  const regexPhoneNumber = /^[+]*[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
  return regexPhoneNumber.test(phoneNumber) && phoneNumber?.length >= 9 && phoneNumber?.length <= 15;
}