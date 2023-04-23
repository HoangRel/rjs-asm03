import { useRouteLoaderData, useNavigation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { popupActions } from "../../redux-store/popup";

import ProductItem from "../ProductItem";

import styles from "./Products.module.css";

const Products = () => {
  // request data from fectAPI
  const data = useRouteLoaderData("layout");

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const productsData = data.slice(0, 8);

  //Change to price
  // const formatPrice = (price) => {
  //   return accounting.formatMoney(price, {
  //     symbol: "VND",
  //     thousand: ".",
  //     precision: "",
  //     format: "%v %s",
  //   });
  // };

  const showPopupHandler = (data) => {
    dispatch(popupActions.SHOW_POPUP(data));
  };

  return (
    <section className={styles.section}>
      <p>Make the hard way</p>
      <h3>Top trending products</h3>

      {navigation.state === "loading" && (
        <p className={styles.message}>Loading...</p>
      )}

      {productsData.length === 0 ? (
        <p className="message">
          Tạm thời không có sản phẩm ở đây hoặc có thể đã xẫy ra lỗi!
        </p>
      ) : (
        <div className={styles.products}>
          {productsData.map((product) => (
            <ProductItem
              key={product._id.$oid}
              product={product}
              onClick={() => showPopupHandler(product)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
