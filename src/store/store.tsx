import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { prodApi } from "../service/ProductService";
import ProductReducer from "./Products/ProductReducer";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    [prodApi.reducerPath]: prodApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(prodApi.middleware);
  },
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
