import { useState, useEffect } from "react";
import styles from "./DetailProduct.module.css";

const DetailProduct = ({ product }) => {
  const [isViewImg, setIsViewImg] = useState(product.img1);

  // thay đổi ảnh lớn
  const clickHandler = (src) => {
    setIsViewImg(src);
  };

  useEffect(() => {
    setIsViewImg(product.img1);
  }, [product.img1]);

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
          <p>{product.price}</p>
          <blockquote>{product.short_desc}</blockquote>
        </div>
        <div className={styles.category}>
          <h5>CATEGORY: </h5>
          <span>{product.category}</span>
        </div>
        <div className={styles.navigate}>
          <p>QUANTITY</p>
          <span>&lt;</span>
          <span>1</span>
          <span>&gt;</span>
          <button>Add to cart</button>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
