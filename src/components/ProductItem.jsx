import styles from "./ProductItem.module.css";

const ProductItem = ({ product, onClick }) => {
  return (
    <div className={styles.product} onClick={onClick}>
      <img src={product.img1} alt="" />
      <div>
        <h4>{product.name}</h4>
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
