import { useState } from "react";

const CurrencyConverter = () => {
  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"];
  const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.76, JPY: 110.57, AUD: 1.35, CAD: 1.25 },
    EUR: { USD: 1.18, GBP: 0.89, JPY: 130.33, AUD: 1.59, CAD: 1.47 },
    GBP: { USD: 1.32, EUR: 1.12, JPY: 146.37, AUD: 1.78, CAD: 1.66 },
    JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0068, AUD: 0.012, CAD: 0.011 },
    AUD: { USD: 0.74, EUR: 0.63, GBP: 0.56, JPY: 82.59, CAD: 0.93 },
    CAD: { USD: 0.80, EUR: 0.68, GBP: 0.60, JPY: 87.12, AUD: 1.07 },
  };

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(
    (1 * exchangeRates["USD"]["EUR"]).toFixed(2)
  );

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    calculateConversion(e.target.value, fromCurrency, toCurrency);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
    calculateConversion(amount, e.target.value, toCurrency);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
    calculateConversion(amount, fromCurrency, e.target.value);
  };

  const calculateConversion = (amount, fromCurrency, toCurrency) => {
    const rate = exchangeRates[fromCurrency][toCurrency];
    setConvertedAmount((amount * rate).toFixed(2));
  };

  return (
    <div className="converter">
      <h1>Currency Converter</h1>
      <div className="converter-container">
        <div className="input-section">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min="0"
          />
        </div>
        <div className="select-section">
          <label>From:</label>
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="select-section">
          <label>To:</label>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="result">
        <p>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
