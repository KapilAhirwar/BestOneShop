// import { configureStore } from "@reduxjs/toolkit";
// import { CartSlice } from "./Slices/CartSlice";
// import { AuthSlice } from "./Slices/AuthSlice";


// export const store = configureStore({
//     reducer:{
//         cart: CartSlice.reducer,
//     }
// });


import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import cartReducer from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
