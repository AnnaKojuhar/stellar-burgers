import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';

interface IFeedState {
  orders: TOrder[];
  error: null | undefined | string;
  loading: boolean;
  total: number;
  totalToday: number;
  orderSelected: TOrder | null;
}

const initialState: IFeedState = {
  orders: [],
  error: null,
  loading: false,
  total: 0,
  totalToday: 0,
  orderSelected: null
};

export const getFeedsThunk = createAsyncThunk('feed/get', getFeedsApi);

export const getOrderByNumberThunk = createAsyncThunk(
  'feed/getOrderByNumber',
  getOrderByNumberApi
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderSelected = action.payload.orders[0];
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error = action.error.message;
      });
  }
});

export default feedSlice.reducer;
