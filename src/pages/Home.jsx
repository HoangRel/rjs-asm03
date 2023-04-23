import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popupActions } from "../redux-store/popup";

import accounting from "accounting";

import Banner from "../components/homePage/Banner";
import Category from "../components/homePage/Category";
import Products from "../components/homePage/Products";
import Others from "../components/homePage/Others";
import Popup from "../components/homePage/Popup";

const HomePage = () => {
  // show Popup
  const showPopup = useSelector((state) => state.popup.isShowPopup);
  const data = useSelector((state) => state.popup.data);

  const dispatch = useDispatch();

  // hide popup khi quay lại trang Home
  useEffect(() => {
    return () => {
      dispatch(popupActions.HIDE_POPUP());
    };
  }, [dispatch]);

  return (
    <>
      {showPopup && <Popup data={data} />}
      <Banner />
      <Category />
      <Products />
      <Others />
    </>
  );
};

export default HomePage;

export const loader = async () => {
  //  hàm thay đổi định dạng tiền
  const formatPrice = (price) => {
    return accounting.formatMoney(price, {
      symbol: "VND",
      thousand: ".",
      precision: "",
      format: "%v %s",
    });
  };

  const response = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );

  if (!response.ok) {
    return [];
  }

  const resData = await response.json();

  // cập nhật lại data với định dạng tiền VND
  const data = resData.map((item) => ({
    ...item,
    price: formatPrice(item.price),
  }));

  return data;
};
