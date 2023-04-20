import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import Container from "../components/detailPage/Container";

const DetailPage = () => {
  const params = useParams();
  const id = params.productId;

  return (
    <>
      <Banner page="Detail" other={`ID sản phẩm : ${id}`} />
      <Container />
    </>
  );
};

export default DetailPage;
