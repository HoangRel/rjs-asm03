import React from "react";
import Banner from "../components/Banner";
import Shopping from "../components/cartPage/Shopping";

const CartPage = () => {
  return (
    <>
      <Banner page="cart" />
      <Shopping />
    </>
  );
};

export default CartPage;
