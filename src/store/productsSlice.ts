import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/api';

export const fetchAllProducts = createAsyncThunk('products/fetchAll', fetchProducts);

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [], searchQuery: '', status: 'idle' },
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
export default productsSlice.reducer;
