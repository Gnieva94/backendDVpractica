import { Schema, model } from "mongoose";

const cartModel = new Schema({
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      }
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 2),
  },
});

const Cart = model("Cart", cartModel);

export default Cart;
