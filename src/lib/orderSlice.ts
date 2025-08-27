// src/lib/orderSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: number;
  item: string;
  quantity: number;
}

interface OrdersState {
  list: Order[];
}

const initialState: OrdersState = {
  list: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.list.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((order) => order.id !== action.payload);
    },
    clearOrders: (state) => {
      state.list = [];
    },
  },
});

export const { addOrder, removeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
