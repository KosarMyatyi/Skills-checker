import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../types/productsTypes";
import { fetchDataProductsId, fetchDataProducts } from "./fetchAsyncThunk";

const initialState: ProductsState = {
  productsId: [],
  products: [],
  fields: [
    {id: 1, value: 'product', label: 'Название', type: "text"},
    {id: 2, value: 'price', label: 'Цена', type: "number"},
    {id: 3, value: 'brand', label: 'Бренд', type: "text"} 
  ],
  offset: 0,
  limit: 50,
  page: 1,
  selectedField: "product",
  searchValue: "",
  statusId: null,
  status: null,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedField: (state, { payload }: PayloadAction<string>) => {
      state.selectedField = payload;
    },
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = state.selectedField === "price" ? +payload : payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      const prevPage = state.page;
      state.page = payload;
      if (prevPage < payload) {
        state.offset += 50; 
      } else if (prevPage > payload) {
        state.offset -= 50;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataProductsId.pending, (state) => {
        state.statusId = "loading";
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDataProductsId.fulfilled, (state, action) => {
        state.statusId = "resolved";
        state.productsId = action.payload;
      })
      .addCase(fetchDataProductsId.rejected, (state, action) => {
        state.statusId = "rejected";
        state.error = action.payload;
        console.log(state.error);
      })

      .addCase(fetchDataProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDataProducts.fulfilled, (state, action) => {
        state.status = "resolved";
        state.products = action.payload;
      })
      .addCase(fetchDataProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        console.log(state.error);
      })
  }
});

export const { setSearchValue, setSelectedField, setPage } = productsSlice.actions;

export default productsSlice.reducer;
