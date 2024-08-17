import { Schema, model } from "mongoose";

const orderHistorySchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
  ],
});

const OrderHistory = model("OrderHistory", orderHistorySchema);

export default OrderHistory;
