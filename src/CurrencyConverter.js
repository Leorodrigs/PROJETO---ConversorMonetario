import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([
    { symbol: "$", code: "USD" },
    { symbol: "€", code: "EUR" },
    { symbol: "R$", code: "BRL" },
    { symbol: "£", code: "GBP" },
    { symbol: "¥", code: "JPY" },
  ]);

  useEffect(() => {
    if (amount > 0) {
      convertCurrency();
    }
  }, [fromCurrency, toCurrency, amount]);

  const convertCurrency = async () => {
    const response = await axios.get("http://localhost:5000/convert", {
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
      },
    });
    setConvertedAmount(response.data.converted_amount.toFixed(2));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage:
          "url(C:/Users/leona/OneDrive/Área de Trabalho/images.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          padding: "20px",
          maxWidth: "400px",
          width: "100%",
          margin: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Conversor Monetário</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            style={{ width: "80px", height: "40px", fontSize: "16px" }}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              margin: "0 10px",
              width: "100px",
              height: "40px",
              fontSize: "16px",
            }}
          />

          <FontAwesomeIcon
            icon={faArrowRight}
            className="arrow-icon"
            style={{ marginRight: 10 }}
            fontSize={40}
          />

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            style={{ width: "80px", height: "40px", fontSize: "16px" }}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>
            Valor Convertido: {convertedAmount}{" "}
            {currencies.find((c) => c.code === toCurrency)?.symbol}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
