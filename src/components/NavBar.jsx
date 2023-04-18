import { useNavigate } from "react-router-dom";

import styles from "./NavBar.module.css";
import { CartIcon, LoginIcon } from "../icons/icons";

import { NavLink } from "react-router-dom";

const NavBar = () => {
  // navigate hook
  const navigate = useNavigate();

  return (
    <header>
      <nav className={styles.nav}>
        <ul>
          <li>
            <button
              // chuyển hướng
              onClick={() => navigate("/")}
            >
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
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/shop")}>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Shop
              </NavLink>
            </button>
          </li>
        </ul>
        <h2>BOUTIQUE</h2>
        <ul>
          <li>
            <button onClick={() => navigate("/cart")}>
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
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/login")}>
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
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
