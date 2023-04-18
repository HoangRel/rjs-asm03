import { useLoaderData, useNavigation } from "react-router-dom";

import accounting from "accounting";

import styles from "./Products.module.css";

const Products = () => {
  // nhận data từ fectAPI
  const data = useLoaderData();

  const navigation = useNavigation();

  const productsData = data.slice(0, 8);

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
            <div className={styles.product} key={product._id.$oid}>
              <img src={product.img1} alt="" />
              <div>
                <h4>{product.name}</h4>
                <p>
                  {/* Change number to price */}
                  {accounting.formatMoney(product.price, {
                    symbol: "VND",
                    thousand: ".",
                    precision: "",
                    format: "%v %s",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
