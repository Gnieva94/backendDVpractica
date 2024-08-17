import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import { IUser } from "../../types";
import { userDao } from "./dao";
config()

const {getAllUsers,
  getUserById,
  getUserByMail,
  createUser,
  updateUser,
  deleteUser,} = userDao

class UserService{
  async getUser(id: string){
    try {
      const user = await getUserById(id);
      if(!user) throw new Error()
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getUsers(){
    try {
      const users = await getAllUsers();
      return users;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async createUser(user: IUser){
    try {
      const existingUser = await getUserByMail(user.email);
      if (existingUser) {
        throw new Error("email already used");
      }
      const newUser = await createUser(user);
      return newUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async loginUser(user: { email: string; password: string }){
    try {
      const { email, password } = user;
      const existingUser = await getUserByMail(email);
      if (!existingUser) {
        throw new Error("Invalid email");
      }
      const isPasswordValid = await compare(password, existingUser.password!);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const token = sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return token;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async updateUser(id: string,update: IUser){
    try {
      const updatedUser = await updateUser(id,update)
      return updatedUser
    } catch (error) {
      throw Error((error as Error).message)
    }
  }
  async deleteUser(id: string){
    try {
      const deletedUser = await deleteUser(id);
      return deletedUser
    } catch (error) {
      throw Error((error as Error).message)
    }
  }
}

// function isEmptyObject(obj: object): boolean {
//   return Object.keys(obj).length === 0;
// }

export const userService = new UserService();