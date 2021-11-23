import { COLORS, EPS } from './conts';

export function formatCurrency(num) {
  return `${num < -0.0001 ? '-' : '+'}$${Math.abs(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export function clipNumber(num) {
  return parseFloat(num.toFixed(2));
};

export function getColor(index) {
  return COLORS[index % COLORS.length];
};

export function computeData(settings, rates) {
  const { price, priceInflation, includeEquity, rent, rentInflation, interest } = settings;
  return rates.map(({ downpayment, rate, points }) => {
    const effectiveRate = (rate || EPS) / 100 / 12;
    const monthlyPayment = effectiveRate * price * (1 - downpayment / 100) / (1 - Math.pow(1 + effectiveRate, -30 * 12));
    const initialValue = -price * (downpayment + points) / 100;
    const values = [initialValue];
    for (let index = 1; index <= 30; index++) {
      values.push(
        values[index - 1] * (1 + (interest || 0) / 100)
        - monthlyPayment * 12
        + (rent || 0) * 12 * Math.pow(1 + (rentInflation || 0) / 100, index - 1),
      );
    }
    if (includeEquity) {
      values.forEach((value, index) => {
        const equity =
          (price - monthlyPayment * (1 - Math.pow(1 + effectiveRate, -12 * (30 - index))) / effectiveRate)
          * Math.pow(1 + (priceInflation || 0) / 100, index);
        values[index] = equity + value;
      });
    }
    return ({ key: `${downpayment}%\t${rate}%${points ? `\t${points}%` : ''}`, monthlyPayment, values });
  });
};
