import { useNavigate, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { CartIcon, LoginIcon } from "../icons/icons";

import { authActions } from "../redux-store/auth";
import { getFromStorage } from "./localStorage/storage";

import styles from "./NavBar.module.css";
import { useEffect } from "react";
import { useSubmit } from "react-router-dom";

const NavBar = () => {
  // navigate hook
  const navigate = useNavigate();
  const submit = useSubmit();

  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.auth.isLogged);
  const currentAcc = useSelector((state) => state.auth.currentAcc);

  // Đảm bảo isLogged là true dù tải lại trang nếu có currentArr đã lưu trong local
  useEffect(() => {
    const savedCurrentArr = getFromStorage("currentAcc", false);

    if (savedCurrentArr) {
      dispatch(authActions.ON_LOGIN(savedCurrentArr));
    }
  }, [dispatch]);

  // Kích hoạt action theo chường trình
  const logoutHandler = () => {
    submit(null, { action: "/logout", method: "POST" });
    dispatch(authActions.ON_LOGOUT());
  };

  return (
    <header>
      <nav className={styles.nav}>
        <ul>
          <li onClick={() => navigate("/")}>
            <NavLink
              to="/"
              // active
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li onClick={() => navigate("/shop")}>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>
        <h2>BOUTIQUE</h2>
        <ul>
          <li onClick={() => navigate("/cart")}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <i>
                <CartIcon />
              </i>
              Cart
            </NavLink>
          </li>

          {!isLogged ? (
            <li onClick={() => navigate("/login")}>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <i>
                  <LoginIcon />
                </i>
                Login
              </NavLink>
            </li>
          ) : (
            <>
              <li className={styles.acc}>
                <i>
                  <LoginIcon />
                </i>
                <select>
                  <option>{currentAcc.name}</option>
                  <option>{currentAcc.name}</option>
                  <option>{currentAcc.name}</option>
                </select>
              </li>
              <li>
                <button onClick={logoutHandler}>( logout )</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
