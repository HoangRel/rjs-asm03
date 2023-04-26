import { useEffect, useState } from "react";
import useInput from "../../components/hooks/useInput";

import styles from "./Billings.module.css";
import {
  getFromStorage,
  removeFormStorage,
  saveToStorage,
} from "../localStorage/storage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Billings = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  // kiểm tra xác thực
  useEffect(() => {
    const user = getFromStorage("currentAcc", false);
    if (user) {
      const email = user.email;
      setEmail(email);
      setCurrentUser(user);
    }
    return;
  }, []);

  // nhận dữ liệu
  useEffect(() => {
    if (email) {
      console.log(email);
      setCartData([]);
      const data = getFromStorage(`cartData_${email}`, []);

      if (data.length === 0) {
        setTotalPrice(0);
        return;
      }

      setCartData(data);

      // tính tổng tất cả

      const totalPrice = data.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
      setTotalPrice(totalPrice);
    }
  }, [email]);

  // từ custom hook useInput
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

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddressInput,
  } = useInput((value) => value.trim() !== "");

  // xét valid form
  let isValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneIsValid &&
    enteredAddressIsValid
  ) {
    isValid = true;
  }

  //
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    if (cartData.length === 0) {
      return;
    }

    const contact = {
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
      address: enteredAddress,
    };

    // Xóa cart và lưu bills. Nếu user này đã có bill trước đó thì thêm vào

    removeFormStorage(`cartData_${email}`);

    const currOrder = getFromStorage(`Order_${email}`, []);

    // lưu cart cùng với thông tin tài khoản và liên lạc
    currOrder.push({
      user: currentUser,
      contact,
      cart: cartData,
    });

    saveToStorage(`Order_${email}`, currOrder);

    resetNameInput();
    resetEmailInput();
    resetPhoneInput();
    resetAddressInput();

    navigate("/home");
  };

  return (
    <section>
      <h2>Billings details</h2>
      <div className={styles.container}>
        <form onSubmit={onSubmitHandler}>
          <label
            htmlFor="name"
            className={nameInputHasError ? styles.valid : ""}
          >
            Full Name:
          </label>
          <input
            id="name"
            value={enteredName}
            placeholder="Enter Your Full Name Here!"
            required
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          <label
            htmlFor="email"
            className={emailInputHasError ? styles.valid : ""}
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={enteredEmail}
            placeholder="Enter Your Email Here!"
            required
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          <label
            className={phoneInputHasError ? styles.valid : ""}
            htmlFor="phone"
          >
            Phone Number:
          </label>
          <input
            id="phone"
            type="number"
            value={enteredPhone}
            placeholder="Enter Your Phone Number Here!"
            required
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
          />
          <label
            htmlFor="address"
            className={addressInputHasError ? styles.valid : ""}
          >
            Address:
          </label>
          <input
            id="address"
            placeholder="Enter Your Address Here!"
            value={enteredAddress}
            required
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
          />
          {currentUser && cartData.length > 0 ? (
            <button type="submit">Place Order</button>
          ) : (
            <Link to="/shop">to shop?</Link>
          )}
        </form>
        <div className={styles.wrap}>
          <h2>Your order</h2>
          {cartData.map((mov) => (
            <div key={mov.id} className={styles.item}>
              <h5>{mov.name.split(" ").slice(0, 4).join(" ")}</h5>
              <p>
                {Intl.NumberFormat("vi-VI").format(mov.price)} VND x{" "}
                {mov.quantity}
              </p>
            </div>
          ))}
          <div className={styles.total}>
            <h4>Total</h4>
            <p>{Intl.NumberFormat("vi-VI").format(totalPrice)} VND</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Billings;
