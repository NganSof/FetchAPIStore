import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string | "";
  name: string | "";
  price: string | "";
  img: string | "";
  description: string;
}
const initialState: Product = {
  id: "",
  name: "",
  price: "",
  img: "",
  description: "",
};
export const Products = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const {} = Products.actions;

export const selectProducts = (state: any) => state.products;
export default Products.reducer;
