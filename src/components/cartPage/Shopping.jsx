import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import { authActions } from "../../redux-store/auth";
import { cartActions } from "../../redux-store/cart";
import { getFormStorage } from "../localStorage/storage";

import Total from "./Total";
import { useEffect, useState } from "react";
import Quantity from "../Quantity";
import { DeleteIcon } from "../../icons/icons";
// import usePrice from "../hooks/usePrice";

import styles from "./Shopping.module.css";

const Shopping = () => {
  const [authed, setAuthed] = useState(true);
  const [products, setProducts] = useState(false);
  const [email, setEmail] = useState(null);
  const setUpdatedProduct = useState(null)[1];
  // const [total, setTotal] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthed(true);
    setProducts(false);

    const currentUser = getFormStorage("currentAcc", undefined);
    if (!currentUser) {
      setAuthed(false);
      return;
    }

    const email = currentUser.email;

    const data = getFormStorage(`cartData_${email}`, []);

    if (!data || data.length === 0) {
      setProducts(false);
      return;
    }

    setProducts(data);
    setEmail(email);
  }, []);

  const changeQuantityHander = (productId, quantity) => {
    const cartData = products.find((mov) => mov.id === productId);

    cartData.quantity = quantity;

    dispatch(cartActions.UPDATE_CART({ userEmail: email, cartData }));

    setUpdatedProduct(cartData);
  };

  return (
    <section>
      <h2>Shopping Cart</h2>
      {authed && (
        <div>
          <div className={styles.cart}>
            <div>
              <div className={styles.title}>
                <h4>Image</h4>
                <h4>Product</h4>
                <h4>Price</h4>
                <h4>Quantity</h4>
                <h4>Total</h4>
                <h4>Remove</h4>
              </div>
              <ul>
                {products &&
                  products.map((mov) => (
                    <li key={mov.id}>
                      <img src={mov.img} alt={mov.name} />
                      <h4>{mov.name}</h4>
                      <p>{Intl.NumberFormat("vi-VI").format(mov.price)} VND</p>
                      <div>
                        <Quantity
                          changeQuantityHander={(quantity) =>
                            changeQuantityHander(mov.id, quantity)
                          }
                          initialQuantity={mov.quantity}
                        />
                      </div>
                      <p>
                        {Intl.NumberFormat("vi-Vi").format(
                          mov.price * mov.quantity
                        )}{" "}
                        VND
                      </p>
                      <i>
                        <DeleteIcon />
                      </i>
                    </li>
                  ))}
              </ul>
            </div>

            <div className={styles.navigate}>
              <button
                className="btn_continue"
                onClick={() => {
                  navigate("/shop");
                }}
              >
                <strong>&larr;</strong> Continue shopping
              </button>
              <button
                className="btn_proceed"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Proceed to checkout <strong>&rarr;</strong>
              </button>
            </div>
          </div>
          <Total />
        </div>
      )}
    </section>
  );
};

export default Shopping;
