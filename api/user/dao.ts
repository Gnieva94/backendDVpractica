import User from "./model";
import {IUser} from '../../types'

class UserDao{
  async getUserById(userId: string){
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getAllUsers(){
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getUserByMail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async createUser(user: IUser){
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async updateUser(userId: string, update: IUser){
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, update, {new: true,});
      return updatedUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async deleteUser(userId: string){
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const userDao = new UserDao();