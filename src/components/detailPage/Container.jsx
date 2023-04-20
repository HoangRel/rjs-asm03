import styles from "./Container.module.css";
import DetailProduct from "./container/DetailProduct";

const Container = () => {
  // nhận product từ local
  const product = JSON.parse(localStorage.getItem("product"));

  return (
    <section>
      <DetailProduct product={product} />
    </section>
  );
};

export default Container;
