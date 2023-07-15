import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { id } = action.payload;
      if (state.products[id]) {
        state.products[id].count++;
      } else {
        state.products[id] = { ...action.payload, count: 1 };
      }
    },
    removeProduct: (state, action) => {
      const { id } = action.payload;
      if (state.products[id].count > 1) {
        state.products[id].count--;
      } else {
        delete state.products[id];
      }
    },
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

const store = configureStore({
  reducer: productsSlice.reducer,
});

export default store;
