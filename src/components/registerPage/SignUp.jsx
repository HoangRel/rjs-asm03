import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { saveToStorage, getFormStorage } from "../localStorage/storage";

import styles from "./SignUp.module.css";

const SignUp = () => {
  const [enteredFullName, setEnteredFullName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [error, setError] = useState([]);

  const fullNameChangeHandler = (event) => {
    setEnteredFullName(event.target.value);
  };

  const EmailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };

  useEffect(() => {
    const identifer = setTimeout(() => {
      setFormIsValid(false);
      setError([]);

      if (enteredFullName === "") {
        setError((pre) => {
          return [...pre, "Mời nhập Full Name"];
        });
      }

      if (!enteredEmail.includes("@")) {
        setError((pre) => {
          return [...pre, ""];
        });
      }
    });
  });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <form
          className={styles.form}
          //  onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={enteredFullName}
            // required
            onChange={fullNameChangeHandler}
          ></input>
          <input
            // type="email"
            placeholder="Email"
            value={enteredEmail}
            // required
            onChange={EmailChangeHandler}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={enteredPassword}
            // required
            onChange={passwordChangeHandler}
          ></input>
          <input
            type="text"
            placeholder="Phone"
            value={enteredPhone}
            // required
            onChange={phoneChangeHandler}
          ></input>
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
