import { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFormStorage } from "../localStorage/storage";

import useInput from "../hooks/useInput";
import { authActions } from "../../redux-store/auth";

// dùng chung file css với Sign Up
import styles from "../registerPage/SignUp.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const dispath = useDispatch();

  const [hasEmail, setHasEmail] = useState(true);
  const [hasPassword, setHasPassword] = useState(true);

  // nhận dữ liệu từ custom Hook
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

  let isFormValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    isFormValid = true;
  }

  const submitHanlder = (event) => {
    event.preventDefault();

    setHasEmail(true);
    setHasPassword(true);

    if (!isFormValid) {
      return;
    }

    const userArr = getFormStorage("userArr", []);

    // ckeck email
    const emailAcc = userArr.find((mov) => mov.email === enteredEmail);

    if (!emailAcc) {
      setHasEmail(false);
      resetPasswordInput();
      return;
    }

    // nếu có email thì check tiếp password

    if (emailAcc.password !== enteredPassword) {
      setHasPassword(false);
      resetPasswordInput();
      return;
    }

    // nếu trùng cả password

    // gửi Login action
    dispath(authActions.ON_LOGIN(emailAcc));

    resetEmailInput();
    resetPasswordInput();

    navigate("/");
  };

  const emailInputClasses = emailInputHasError ? styles.invalid : "";
  const passwordInputClasses = passwordInputHasError ? styles.invalid : "";

  const isSubmitting = navigation.state === "submitting";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>Sign In</h1>
        <form className={styles.form} onSubmit={submitHanlder}>
          <div className={emailInputClasses} onChange={() => setHasEmail(true)}>
            {emailInputHasError && (
              <nav className={styles.error}>Mời nhập Email chuẩn dạng!</nav>
            )}
            {!hasEmail && (
              <nav className={styles.error}>Email chưa được đăng ký!</nav>
            )}
            <input
              type="email"
              placeholder="Email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              required
            ></input>
          </div>
          <div
            className={passwordInputClasses}
            onChange={() => setHasPassword(true)}
          >
            {passwordInputHasError && (
              <nav className={styles.error}>Mời nhập Password từ 8 ký tự!</nav>
            )}
            {!hasPassword && <nav className={styles.error}>Sai Password!</nav>}

            <input
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              required
            ></input>
          </div>

          <button disabled={isSubmitting}>SIGN IN</button>
        </form>
        <p>
          Create an account?&nbsp;
          <Link to="/register" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
