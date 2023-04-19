import { useLoaderData, useNavigation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { popupActions } from "../store/popup";

import accounting from "accounting";

import styles from "./Products.module.css";

const Products = () => {
  // nhận data từ fectAPI
  const data = useLoaderData();

  const dispath = useDispatch();

  const navigation = useNavigation();

  let productsData = data.slice(0, 8);

  //Change to price
  const formatPrice = (price) => {
    return accounting.formatMoney(price, {
      symbol: "VND",
      thousand: ".",
      precision: "",
      format: "%v %s",
    });
  };

  const showPopupHandler = (data) => {
    dispath(popupActions.showPopup(data));
  };

  return (
    <section className={styles.section}>
      <p>Make the hard way</p>
      <h3>Top trending products</h3>

      {navigation.state === "loading" && (
        <p className={styles.message}>Loading...</p>
      )}

      {productsData.length === 0 ? (
        <p className={styles.message}>
          Tạm thời không có sản phẩm ở đây hoặc có thể đã xẫy ra lỗi!
        </p>
      ) : (
        <div className={styles.products}>
          {productsData.map((product) => (
            <div
              className={styles.product}
              key={product._id.$oid}
              onClick={() =>
                showPopupHandler({
                  ...product,
                  price: formatPrice(product.price),
                })
              }
            >
              <img src={product.img1} alt="" />
              <div>
                <h4>{product.name}</h4>
                <p>{formatPrice(product.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
