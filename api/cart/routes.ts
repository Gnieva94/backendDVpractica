import express from "express";
import { cartController } from "./controller";

const { addCart } = cartController;
const cartRouter = express.Router();

cartRouter.post("/addCart", addCart);

export default cartRouter;
