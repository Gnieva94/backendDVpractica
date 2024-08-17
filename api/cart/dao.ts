import Cart from "./model";
import { ICart } from "../../types";

class CartDao {
  async addCart(cart: ICart) {
    console.log(cart);
    try {
      const newCart = await Cart.create(cart);
      console.log(newCart);
      return newCart;
    } catch (error) {
      console.log(error)
      throw Error((error as Error).message);
    }
  }
}

export const cartDao = new CartDao();
