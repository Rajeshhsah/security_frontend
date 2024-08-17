import { addToCartApi } from "../apis/Api";
import { toast } from "react-toastify";

export const handleAddToCart = async (userId, productId, quantity = 1) => {
  const cart = {
    user: userId,
    products: [
      {
        product: productId,
        quantity: quantity,
      },
    ],
  };

  try {
    const res = await addToCartApi(cart);
    if (res.data.success === false) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Internal Server Error!");
  }
};
