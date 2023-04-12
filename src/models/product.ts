import {ObjectId} from "mongodb";

export type Product = {
  _id?: ObjectId;
  title: string;
  price: number;
};