import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/index'
import adminProductsSlice from './admin/products-slice.js'
import shopProductSlice from './shop/index.js'
import shoppingCartSlice from './shop/cartSlice.js'
import shopAddressSlice from './shop/address-Slice.js'
import orderSlice from './Order/OrderSlice.js'
import reviewSlice from './shop/reviewSlice.js'
const store =configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductsSlice,
        shopProducts:shopProductSlice,
        shopCart:shoppingCartSlice,
        shopAddress:shopAddressSlice,
        orderss:orderSlice,
        reviewStore:reviewSlice
        
    }
})
export default store