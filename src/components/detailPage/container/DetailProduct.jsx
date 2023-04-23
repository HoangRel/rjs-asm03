import { useState, useEffect } from "react";
import styles from "./DetailProduct.module.css";
import { useDispatch } from "react-redux";

import { cartActions } from "../../../redux-store/cart";
import { getFormStorage } from "../../localStorage/storage";
import { useNavigate } from "react-router-dom";

import Quantity from "../../Quantity";

const DetailProduct = ({ product }) => {
  const [isViewImg, setIsViewImg] = useState(product.img1);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // thay đổi ảnh lớn
  const clickHandler = (src) => {
    setIsViewImg(src);
  };

  useEffect(() => {
    setIsViewImg(product.img1);
  }, [product.img1]);

  const changeQuantityHander = (quantity) => {
    setQuantity(quantity);
  };

  const addToCartHandler = (event) => {
    event.preventDefault();

    const currentUser = getFormStorage("currentAcc", undefined);
    if (!currentUser) {
      return navigate("/login");
    }

    const cartData = {
      id: product._id.$oid,
      img: product.img1,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };

    dispatch(cartActions.ADD_CART({ userEmail: currentUser.email, cartData }));
  };

  return (
    <section className={styles.product}>
      <div className={styles.imgs}>
        <img
          src={product.img1}
          alt={product.name}
          onClick={() => clickHandler(product.img1)}
        />
        <img
          src={product.img2}
          alt={product.name}
          onClick={() => clickHandler(product.img2)}
        />
        <img
          src={product.img3}
          alt={product.name}
          onClick={() => clickHandler(product.img3)}
        />
        <img
          src={product.img4}
          alt={product.name}
          onClick={() => clickHandler(product.img4)}
        />
        <img src={isViewImg} alt={product.name} />
      </div>
      <div className={styles.detail}>
        <div>
          <h1>{product.name}</h1>
          <p>{`${Intl.NumberFormat("vi-VI").format(product.price)} VND`}</p>
          <blockquote>{product.short_desc}</blockquote>
        </div>
        <div className={styles.category}>
          <h5>CATEGORY: </h5>
          <span>{product.category}</span>
        </div>
        <form className={styles.navigate} onSubmit={addToCartHandler}>
          <p>QUANTITY</p>
          <Quantity
            changeQuantityHander={changeQuantityHander}
            initialQuantity="1"
          />

          <button>Add to cart</button>
        </form>
      </div>
    </section>
  );
};

export default DetailProduct;
