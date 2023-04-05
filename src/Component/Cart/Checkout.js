import React, { useRef, useState } from "react";
import style from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

export default function Checkout(props) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  function onCheckoutHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = postalInputRef.current.value;
    const enteredPostalCode = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
  }

  const nameControlstyle = `${style.control} ${
    formInputsValidity.name ? "" : style.invalid
  }`;
  const streetControlstyle = `${style.control} ${
    formInputsValidity.street ? "" : style.invalid
  }`;
  const postalCodeControlstyle = `${style.control} ${
    formInputsValidity.postalCode ? "" : style.invalid
  }`;
  const cityControlstyle = `${style.control} ${
    formInputsValidity.city ? "" : style.invalid
  }`;
  return (
    <form className={style.form} onSubmit={onCheckoutHandler}>
      <div className={nameControlstyle}>
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlstyle}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlstyle}>
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" ref={postalInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlstyle}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={style.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={style.submit}>Submit</button>
      </div>
    </form>
  );
}
