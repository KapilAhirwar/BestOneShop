import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
export const AdminContext = createContext();

// let backendUrl = process.env.REACT_APP_BACKEND_URL;
// const backendUrl = "https://shopibackend-2.onrender.com/api/v1"; 
const backendUrl = "http://localhost:5000/api/v1"

const adminurl = `${backendUrl}/Admin`;

export const AdminProvider = ({children}) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${adminurl}/get/all/orders`,{withCredentials:true});
                setOrders(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, status) => {
        console.log("update ",orderId,status);
        try {
            await axios.put(`${adminurl}/update-orders/${orderId}/status`, { orderStatus: status },{ withCredentials:true });
            setOrders(orders.map(order =>
                order.orderId === orderId ? { ...order, orderStatus: status } : order
            ));
            console.log("update");
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    return  <AdminContext.Provider 
             value={{orders, loading, updateOrderStatus}}
            >
            {children}
            </AdminContext.Provider>
}

export const useAdminHook = () => useContext(AdminContext);