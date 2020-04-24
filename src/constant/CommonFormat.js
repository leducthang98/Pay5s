export const formatMoney = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const unFormatMoney = (amount) => {
  return amount.replace(/[^0-9]+/g, '');
};

export const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const unFormatPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/[^0-9]+/g, '');
};
