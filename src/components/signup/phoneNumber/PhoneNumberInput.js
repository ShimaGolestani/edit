import React, { useState } from "react";
// import { formatPhoneNumber } from "react-phone-number-input";

export default function PhoneNumberInput() {
  const [inputValue, setInputValue] = useState("");
  const handleInput = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setInputValue(formattedPhoneNumber);
  };
  return <input onChange={(e) => handleInput(e)} value={inputValue} />;
}

function formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLenght = phoneNumber.lenght;
  if (phoneNumberLenght < 4) return phoneNumber;
  if (phoneNumberLenght < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )} -${phoneNumber(6, 10)}`;
}
