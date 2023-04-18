import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Category />
      <Products />
    </>
  );
};

export default HomePage;

export const loader = async () => {
  const response = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );

  if (!response.ok) {
    return [];
  }

  return response;
};
