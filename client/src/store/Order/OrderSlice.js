import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orders: [],
  error: null,
};

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ userId, addressId, cartId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/order/addOrder",
        {
          userId,
          addressId,
          cartId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3002/api/order/fetch");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async ({ userId, cartId }) => {
      const response = await axios.delete(`http://localhost:3002/api/order/deleteOrder/${userId}/${cartId}`
        
      );
      return response.data;}
    
);

export const admindeleteOrder = createAsyncThunk(
  "order/admindeleteOrder",
  async ({ orderId}) => {
      const response = await axios.delete(`http://localhost:3002/api/order/admindeleteOrder/${orderId}`
        
      );
      return response.data;}
    
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add Order
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally, push new order or fetch fresh list
        // Assuming action.payload.data is the created order
        state.orders.push(action.payload.data);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add order";
      });

    // Fetch Order
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data || [];
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch orders";
      });

    // Delete Order
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders=action.payload.data
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete order";
      });
       builder
      .addCase(admindeleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(admindeleteOrder.fulfilled, (state,) => {
        state.isLoading = false;
        
      })
      .addCase(admindeleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete order";
      });
  },
});

export default orderSlice.reducer;
