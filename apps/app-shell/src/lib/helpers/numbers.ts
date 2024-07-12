export const numberWithCommans = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫';

export const getSalePrice = (basePrice: number | string, discount: number) => {
  return Number(basePrice) - (Number(basePrice) * discount) / 100;
};

export function generateRandom8DigitNumber() {
  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
