import Product from "./model";
import { IProduct } from "../../types";

class ProductDao {
  async getAllProducts(
    category: string | undefined,
    salersId: string | undefined,
    priceStart: number | undefined,
    priceEnd: number | undefined,
    sort: -1 | 1 | undefined,
    page: string,
    limit: string
  ) {
    try {
      const skip = (Number(page) - 1) * Number(limit);
      const products = await Product.find({
        ...(category ? { category } : {}),
        ...(salersId ? { salersId } : {}),
        ...(priceStart && priceEnd
          ? { price: { $gte: priceStart, $lte: priceEnd } }
          : {}),
      })
        .sort(sort && { price: sort })
        .skip(skip)
        .limit(Number(limit));
      return products;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getProductById(productId: string) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async createProduct(product: IProduct) {
    try {
      const newProduct = await Product.create(product);
      return newProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async editProduct(productId: string, product: IProduct) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        product,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async deleteProduct(productId: string) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const productDao = new ProductDao();
