// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch product data from API
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  }
);

const itemsPerPage = 10;

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    currentItems: [],
    category: [],
    page: 1,
    itemsPerPage: 10,
    priceOrder: "ascending",
    ratingOrder: "ascending"
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
      state.currentItems = state.data.slice(
        (state.page - 1) * state.itemsPerPage,
        state.page * state.itemsPerPage
      );
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
      const startIndex = (state.currentPage - 1) * itemsPerPage;
      const endIndex = state.currentPage * itemsPerPage;
      state.currentItems = state.data.slice(startIndex, endIndex);
    },

    sortByPrice: (state, action) => {
      const order = action.payload;
      state.priceOrder = order;
      state.currentItems = [...state.data].sort((a, b) =>
        order === "descending" ? b.price - a.price : a.price - b.price
      );
    },
    sortByRating: (state, action) => {
      const order = action.payload;
      state.ratingOrder = order;
      state.currentItems = [...state.data].sort((a, b) =>
        order === "descending"
          ? b.rating.rate - a.rating.rate
          : a.rating.rate - b.rating.rate
      );
    },
    filterByCategory: (state, action) => {
      const category = action.payload;
      state.currentItems =
        category === "allProduct"
          ? state.data
          : state.data.filter((item) => item.category === category);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.category = [
        ...new Set(action.payload.map((item) => item.category))
      ];
      state.currentItems = state.data.slice(0, state.itemsPerPage);
    });
  }
});

export const {
  setPage,
  sortByPrice,
  sortByRating,
  filterByCategory,
  setCurrentPage
} = productSlice.actions;
export default productSlice.reducer;
