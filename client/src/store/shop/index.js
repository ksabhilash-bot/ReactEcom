import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    productList:[],
    productDetails:null,
}
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({filterParams,sortParams}) => {
    const query = new URLSearchParams({...filterParams,sortby:sortParams})
    const result = await axios.get(
      `https://reactecom-6wka.onrender.com/api/shop/products/get?${query}`
    );
    if(!result){
        console.log("No data found")
    }
    return result?.data;
  }
);
export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails',async(id)=>{
    const result = await axios.get(`https://reactecom-6wka.onrender.com/api/shop/products/get/${id}`)
    if(!result){
        console.log("No data found")
    }
    return result?.data;
})
const shopProductSlice= createSlice({
    name:'shoppingProducts',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.productList=action.payload.data;
        }).addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.productList=[];
        }).addCase(fetchProductDetails.pending,(state,action)=>{
            state.isLoading=true;
        }).addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.productDetails=action.payload.data;
        }).addCase(fetchProductDetails.rejected,(state,action)=>{
            state.isLoading=false;
            state.productDetails=null;
        })
    }
})
export default shopProductSlice.reducer;