import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduct } from "./api";
import { 
  APIParams, 
  ItemsParams, 
  ResponseProductFields, 
  ResponseProduct, 
  ResponseProductId, 
  ResponseProductFilter, 
  FilterParams
} from "../types/productsTypes";
import { RootState } from "./store";

export const makeRequest = async (params: APIParams) => {
  let count = 0;

  while (count < 3) {
    try {
      return await fetchProduct(params); 
    } catch (error) {
      count++;
    }
  }

}

// возвращает список товаров
export const fetchDataProducts = createAsyncThunk<ResponseProduct, APIParams, {rejectValue: string}
  >("products/fetch", async (params: APIParams, { rejectWithValue }) => {
    try {
      const response = await makeRequest(params);
      const productsMap = new Map(response.map((product: { id: number; }) => [product.id, product]))
      const filteredProducts = Array.from(productsMap.values()) as ResponseProduct;
      return filteredProducts;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);

// возвращает список идентификаторов товаров
export const fetchDataProductsId = createAsyncThunk<ResponseProductId, APIParams, {rejectValue: string}
  >("productsId/fetch", async (params: APIParams, { rejectWithValue, dispatch },) => {
    try {
      const response = await makeRequest(params);
      if (response) {
        dispatch(fetchDataProducts({
          action: 'get_items',
          params: {
            ids: response
          } as ItemsParams
        }))
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);

// возвращает список имеющихся полей товаров
export const fetchDataProductFields = createAsyncThunk<ResponseProductFields, APIParams, {rejectValue: string}
  >("productFields/fetch", async (params: APIParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await makeRequest(params);
      const field = params.params.field
      const state = getState() as RootState;
      const searchValue = state.products.searchValue;
      if (response) {
        dispatch(fetchDataProductFilter({
          action: 'filter',
          params: { [field]: searchValue } as FilterParams
        }))
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);

// возвращает список идентификаторов товаров, соответствующих заданному значению.
export const fetchDataProductFilter = createAsyncThunk<ResponseProductFilter, APIParams, {rejectValue: string}
  >("productsFiltered/fetch", async (params: APIParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await makeRequest(params);
      const state = getState() as RootState;
      const offset = state.products.offset;
      const limit = state.products.limit;
      const filteredId = response.slice(offset, limit)
      if (response) {
        dispatch(fetchDataProducts({
          action: 'get_items',
          params: {
            ids: filteredId
          } as ItemsParams
        }))
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);