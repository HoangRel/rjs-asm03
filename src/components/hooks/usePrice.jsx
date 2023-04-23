const usePrice = (data) => {
  const priceVND = `Intl.NumberFormat("vi-VI").format(${data}.price)} VND`;

  return priceVND;
};

export default usePrice;
