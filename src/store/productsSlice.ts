import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { fetchProducts } from '../services/api';
import { RootState } from './index';

export const fetchAllProducts = createAsyncThunk('products/fetchAll', fetchProducts);

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [] as Product[], searchQuery: '', status: 'idle' },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSearchQuery } = productsSlice.actions;

// Memoized Selector
const selectProducts = (state: RootState) => state.products.products;
const selectSearchQuery = (state: RootState) => state.products.searchQuery;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchQuery],
  (products, searchQuery) => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
);

export default productsSlice.reducer;
