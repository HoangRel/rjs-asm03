import { Link, useNavigate } from "react-router-dom";

import useInput from "../hooks/useInput";

import { saveToStorage, getFormStorage } from "../localStorage/storage";

import styles from "./SignUp.module.css";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const [sameEmail, setSameEmail] = useState(false);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length >= 8);

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
  } = useInput(
    (value) =>
      !isNaN(parseFloat(value)) && isFinite(value) && value.trim().length >= 9
  );

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredPhoneIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setSameEmail(false);

    if (!formIsValid) {
      return;
    }

    const userArr = getFormStorage("userArr");

    const hasSame = userArr.find((mov) => mov.email === enteredEmail);

    if (hasSame) {
      setSameEmail(true);
      return;
    }

    userArr.push({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      phone: enteredPhone,
    });

    saveToStorage("userArr", userArr);

    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetPhoneInput();

    navigate("/login");
  };

  // css cho input không hợp lệ
  const nameInputClasses = nameInputHasError ? styles.invalid : "";

  const emailInputClasses =
    emailInputHasError || sameEmail ? styles.invalid : "";

  const passwordInputClasses = passwordInputHasError ? styles.invalid : "";

  const phoneInputClasses = phoneInputHasError ? styles.invalid : "";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <div className={nameInputClasses}>
            {nameInputHasError && (
              <nav className={styles.error}>Mời nhập Full Name</nav>
            )}
            <input
              type="text"
              placeholder="Full Name"
              value={enteredName}
              // required
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            ></input>
          </div>
          <div className={emailInputClasses}>
            {emailInputHasError && (
              <nav className={styles.error}>Mời nhập Email chuẩn dạng!</nav>
            )}
            {sameEmail && <nav className={styles.error}>Email đã tồn tại!</nav>}

            <input
              type="email"
              placeholder="Email"
              value={enteredEmail}
              // required
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            ></input>
          </div>
          <div className={passwordInputClasses}>
            {passwordInputHasError && (
              <nav className={styles.error}>Mời nhập Password từ 8 ký tự!</nav>
            )}
            <input
              type="password"
              placeholder="Password"
              value={enteredPassword}
              // required
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            ></input>
          </div>
          <div className={phoneInputClasses}>
            {phoneInputHasError && (
              <nav className={styles.error}>Mời nhập SĐT từ 9 số!</nav>
            )}
            <input
              type="text"
              placeholder="Phone"
              value={enteredPhone}
              // required
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
            ></input>
          </div>
          <button>SIGN UP</button>
        </form>
        <p>
          Login?&nbsp;
          <Link to="/login" className={styles.link}>
            Click
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
