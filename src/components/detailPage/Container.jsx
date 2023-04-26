import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Description from "./container/Description";
import DetailProduct from "./container/DetailProduct";
import ProductItem from "../ProductItem";

import styles from "./Container.module.css";

const Container = ({ id, isProduct, setIsProduct }) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const data = useRouteLoaderData("layout");

  useEffect(() => {
    const foundProduct = data.find((mov) => mov._id.$oid === id);

    if (foundProduct) {
      setIsProduct(true);
      setProduct(foundProduct);

      // tìm các product có cùng category
      const relatedProducts = data.filter(
        (mov) => mov.category === foundProduct.category
      );

      // loại bỏ product đang hiển thị chính
      const filteredProducts = relatedProducts.filter(
        (mov) => mov._id.$oid !== id
      );

      setRelatedProducts(filteredProducts);
    }
  }, [id, data, setIsProduct]);

  //
  const clickHandler = (product) => {
    navigate(`/detail/${product._id.$oid}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isProduct && (
        <>
          <DetailProduct product={product} />
          <Description product={product} />
          <section>
            <h3>Related Products</h3>
            {relatedProducts.length !== 0 ? (
              <div className={styles.relatedProducts}>
                {relatedProducts.map((product) => (
                  <ProductItem
                    key={product._id.$oid}
                    product={product}
                    onClick={() => clickHandler(product)}
                  />
                ))}
              </div>
            ) : (
              <p className="message">Không còn nữa!</p>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Container;
