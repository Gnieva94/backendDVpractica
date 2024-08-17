import { ICart } from "../../types";
import { cartDao } from "./dao";

const { addCart } = cartDao;

class CartService {
  async addCart(cart: ICart) {
    try {
      const newCart = await addCart(cart);
      return newCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const cartService = new CartService();
