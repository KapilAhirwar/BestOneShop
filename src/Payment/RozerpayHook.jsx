// import { data } from "autoprefixer";
import axios from "axios";
import { useContext, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
export const RozerpayApp = createContext();
// const backendUrl = process.env.REACT_APP_BACKEND_URL_LOCAL;
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const payUrl = `${backendUrl}/payment`;

export const RazorpayProvider = ({children}) => {

    // const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentLoader, setPaymentLoader] = useState(false);
    const [pay, setpay] = useState(false);
    // const {orderDetails, setOrderDetails} = useAppContext();    

    const navigate = useNavigate(); ///create/Cash-on-delivey

    const createOrderCOD = async (total, userId, cartItems, deliveryAddress, paymentMethod, order) => {
        // console.log("start -> ",total )
        try {
            const response = await axios.post(`${payUrl}/create/Cash-on-delivey`, {
                total,
                userId,
                cartItems,
                deliveryAddress,
                paymentMethod,
            }, {withCredentials:true});
            const { data } = response.data;
            // console.log("create order success -> ",response);
            // setOrderDetails( (data)=>({...data, data, total }));
            order.orderId = data.orderId;
            setpay(true);        
            navigate('/OrderConfirmation', { state: { data, order } });
            return { data }; // Return order data to frontend
        } catch (error) {
            console.error('Error creating order:', error);
            return { error: 'Error creating order. Please try again.' };
        }
    };

    const createOrder = async (total, userId, cartItems, deliveryAddress ) => {
        console.log("crt", cartItems);
      try {
          const response = await axios.post(`${payUrl}/create-order`, {
              total,
              userId,
              cartItems,
              deliveryAddress,
          },  {withCredentials:true});
          const { orderId, key } = response.data;
        //   setOrderDetails( (data)=>({...data, orderId, total }));
          return { orderId, key }; // Return order data to frontend
      } catch (error) {
          console.error('Error creating order:', error);
          return { error: 'Error creating order. Please try again.' };
      }
    };
    
    const PaymentSuccess = async ( response, order ) => {
      try {
        let { data } = await axios.post(`${payUrl}/payment-success`, { response });
        data = data.data;
        // console.log("data-> ",data);
          setpay(true);        
          navigate('/OrderConfirmation', { state: { data, order } });
      } catch (error) {
          console.error("Error verifying payment:", error);
          alert("Payment verification failed. Please try again.");
      }
    };

    const paymentVerify = async( response, order ) => {
      try {
        //   const { data } = 
          await axios.post(`${payUrl}/verify-payment`, { response });
          await PaymentSuccess( response, order ); 
      } catch (error) {
          console.error("Error verifying payment:", error);
          alert("Payment verification failed. Please try again.");
      }
    }


    return <RozerpayApp.Provider 
            value={{ createOrder, paymentVerify, PaymentSuccess, pay, setpay,
                createOrderCOD, paymentLoader, setPaymentLoader
            }} 
           >
           {children}
           </RozerpayApp.Provider>
}

export const useRozerpay = () => useContext(RozerpayApp);