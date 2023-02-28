import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../store/Products/ProductReducer";

// Define a service using a base URL and expected endpoints
export const prodApi = createApi({
  reducerPath: "prodApi",
  tagTypes: ["prod"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://svcy.myclass.vn/api/Product/",
  }),
  endpoints: (builder) => ({
    getListProducts: builder.query<Product[], void>({
      query: () => "GetAll",
      providesTags: (result: any) => {
        if (result) {
          const final = [
            ...result.map(({ id }: Product) => [{ type: "prod", id }]),
            { type: "prod", id: "LIST" },
          ];
          return final;
        }
        return [{ type: "prod", id: "LIST" }];
      },
    }),
    createProduct: builder.mutation<Product[], { body: Product }>({
      query: (data) => {
        return { url: "CreateProduct", method: "POST", body: data.body };
      },
      invalidatesTags: () => [{ type: "prod", id: "LIST" }],
    }),
    updateProduct: builder.mutation<Product[], { id: string; body: Product }>({
      query: (data) => {
        return {
          url: `UpdateProduct/${data.id}`,
          method: "PUT",
          id: data.id,
          body: data.body,
        };
      },
      invalidatesTags: () => [{ type: "prod", id: "LIST" }],
    }),
    deletedProduct: builder.mutation<Product[], { id: string }>({
      query: (data) => {
        return {
          url: `DeleteProduct/${data.id}`,
          method: "DELETE",
          id: data.id,
        };
      },
      invalidatesTags: () => [{ type: "prod", id: "LIST" }],
    }),
  }),
});
export const {
  useGetListProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeletedProductMutation,
} = prodApi;
