import { useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import Container from "../components/detailPage/Container";

const DetailPage = () => {
  const [isProduct, setIsProduct] = useState(false);

  const params = useParams();
  const id = params.productId;

  return (
    <>
      <Banner
        page="Detail"
        other={isProduct ? null : "Không có sản phẩm này!"}
      />
      <Container id={id} isProduct={isProduct} setIsProduct={setIsProduct} />
    </>
  );
};

export default DetailPage;
