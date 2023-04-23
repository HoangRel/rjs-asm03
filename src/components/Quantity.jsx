import { useState, useEffect } from "react";
import styles from "./Quantity.module.css";

// component số lượng muốn add
const Quantity = ({ changeQuantityHander, initialQuantity }) => {
  const [quantity, setQuantity] = useState(Number(initialQuantity));

  // số luợng được nhập chỉ từ 1 đến 5
  let plus = true;
  let minus = true;

  switch (quantity) {
    case 1:
      minus = false;
      break;
    case 5:
      plus = false;
      break;
    default:
      plus = true;
      minus = true;
      break;
  }

  useEffect(() => {
    changeQuantityHander(quantity);
  }, [quantity, changeQuantityHander]);

  return (
    <>
      {minus ? (
        <span
          className={styles.quantity}
          onClick={() => setQuantity((cur) => cur - 1)}
        >
          &lt;
        </span>
      ) : (
        <span className={`${styles.quantity} ${styles.none}`}>&lt;</span>
      )}
      <span className={`${styles.quantity} ${styles.num}`}> {quantity}</span>
      {plus ? (
        <span
          className={styles.quantity}
          onClick={() => setQuantity((cur) => cur + 1)}
        >
          &gt;
        </span>
      ) : (
        <span className={`${styles.quantity} ${styles.none}`}>&gt;</span>
      )}
    </>
  );
};

export default Quantity;
