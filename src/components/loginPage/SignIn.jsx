import { Link } from "react-router-dom";

// dùng chung file css với Sign Up
import styles from "../registerPage/SignUp.module.css";

const SignIn = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>Sign In</h1>
        <form
          className={styles.form}
          //  onSubmit={submitHanlder}
        >
          <input
            type="email"
            placeholder="Email"
            // onChange={emailChangeHandler}
            // value={enteredEmail}
            required
          ></input>
          <input
            type="password"
            placeholder="Password"
            // onChange={passwordChangeHandler}
            // value={enteredPassword}
            required
          ></input>

          <button>SIGN IN</button>
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
