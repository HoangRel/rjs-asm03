import Banner from "../components/Banner";
import Billings from "../components/checkoutPage/Billings";

const CheckoutPage = () => {
  const obj = {
    home: "Home",
    cart: "Cart",
  };

  return (
    <>
      <Banner page="Checkout" other="Checkout" navi="true" obj={obj} />
      <Billings />
    </>
  );
};

export default CheckoutPage;
