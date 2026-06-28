import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./redux/Store";
import { Toaster } from "react-hot-toast";
import { AppContextprovider } from "./useContextHook/context";
import { RazorpayProvider } from "./Payment/RozerpayHook";
import { AdminProvider } from "./Admin/AdminHook/AdminHook";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
      <AppContextprovider>
        <AdminProvider>
          <RazorpayProvider>
            <Provider store={store}>
              <App />   
              <Toaster/>  
            </Provider>
          </RazorpayProvider>
        </AdminProvider>
      </AppContextprovider>
    </BrowserRouter>



  
);
