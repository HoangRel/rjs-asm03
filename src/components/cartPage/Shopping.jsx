import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { cartActions } from "../../redux-store/cart";
import { getFromStorage } from "../localStorage/storage";

import Total from "./Total";
import { useEffect, useState } from "react";
import Quantity from "../Quantity";
import { DeleteIcon } from "../../icons/icons";

import styles from "./Shopping.module.css";

const Shopping = () => {
  const [authed, setAuthed] = useState(false);
  const [products, setProducts] = useState(false);
  const [email, setEmail] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // state này đảm bảo việc cập product mới nhất theo cách thủ công.
  const [updatedProduct, setUpdatedProduct] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // xác nhận trạng thái đăng nhập , lấy email
  useEffect(() => {
    setAuthed(false);
    const currentUser = getFromStorage("currentAcc", false);
    if (currentUser) {
      const email = currentUser.email;
      setEmail(email);
      if (email) {
        setAuthed(true);
      }
    }
    return;
  }, []);

  // lấy dữ liệu
  useEffect(() => {
    setProducts(false);

    const data = getFromStorage(`cartData_${email}`, []);

    if (data.length === 0) {
      return;
    }

    setProducts(data);

    // tính tổng tất cả
    const totalPrice = data.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [email, updatedProduct]);

  //
  const changeQuantityHander = (productId, quantity) => {
    const productData = products.find((mov) => mov.id === productId);

    productData.quantity = quantity;

    dispatch(cartActions.UPDATE_CART({ userEmail: email, productData }));
  };

  //
  const clickDeleteHandler = (mov) => {
    dispatch(cartActions.DELETE_CART({ userEmail: email, productData: mov }));
    setUpdatedProduct((pre) => !pre);
  };

  return (
    <section className={styles.section}>
      <h2>Shopping Cart</h2>
      <div>
        <div className={styles.cart}>
          {authed ? (
            <div>
              <div className={styles.title}>
                <h4>Image</h4>
                <h4>Product</h4>
                <h4>Price</h4>
                <h4>Quantity</h4>
                <h4>Total</h4>
                <h4>Remove</h4>
              </div>
              {products ? (
                <ul>
                  {products &&
                    products.map((mov) => (
                      <li key={mov.id}>
                        <img src={mov.img} alt={mov.name} />
                        <h4>{mov.name}</h4>
                        <p>
                          {Intl.NumberFormat("vi-VI").format(mov.price)}
                          <br />
                          VND
                        </p>
                        <div onClick={() => setUpdatedProduct((pre) => !pre)}>
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
                          )}
                          <br />
                          VND
                        </p>
                        <i onClick={() => clickDeleteHandler(mov)}>
                          <DeleteIcon />
                        </i>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="message">Rỗng</p>
              )}
            </div>
          ) : (
            <p className="message">Mời đăng nhập!</p>
          )}

          <div className={styles.navigate}>
            <button
              className="btn_continue"
              onClick={() => {
                navigate("/shop");
              }}
            >
              <strong>&larr;</strong> Continue shopping
            </button>
            {authed ? (
              <button
                className="btn_proceed"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Proceed to checkout <strong>&rarr;</strong>
              </button>
            ) : (
              <button
                className="btn_proceed"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login <strong>&rarr;</strong>
              </button>
            )}
          </div>
        </div>
        <Total totalPrice={totalPrice} />
      </div>
    </section>
  );
};

export default Shopping;
