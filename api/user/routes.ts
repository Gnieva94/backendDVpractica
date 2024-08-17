import express from 'express'
import { userController } from './controller'

const userRouter = express.Router()

const { getUsers, getUser, createUser, loginUser, deleteUser, editUser } = userController;

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.put("/edit/:id", editUser);

export default userRouter
