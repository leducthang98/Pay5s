export const formatMoney = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const unFormatMoney = (amount) => {
  return amount.replace(/[^0-9]+/g, '');
};
