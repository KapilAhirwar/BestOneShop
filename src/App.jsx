import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "./useContextHook/context";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import About from "./pages/About";
import Latest from "./pages/Latest";
import Contect from "./pages/Contect";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ProtectedRoute from "./protectRoutes/protectRoute";
import ProtectedAdminRoute from "./protectRoutes/AdminProtectRoute";
import ManageProducts from "./Admin/ManageProduct";
import AdminDashboard from "./Admin/AdminDashBoard";
import ManageUsers from "./Admin/ManageUser";
import Orders from "./Admin/orderManage/Order";
import AdminNavbar from "./Admin/AdminNavbar";
import OrderConfirmation from "./Payment/OrderConformPage";
import Checkout from "./Payment/CheckOut";
import PaymentRoute from "./protectRoutes/paymentRoute";
import ProductDetailsPage from "./pages/product/ProductPage";
import OrderDetail from "./pages/product/OrderDetail";
// import Filter from "./pages/ProList";


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useAppContext();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-slate-900">
          {
            role === 'Admin' ? <AdminNavbar/>: <Navbar toggleSidebar={toggleSidebar}/>
          }
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/About" element={<About/>}/>
            <Route path="/Latest" element={<Latest/>}/>
            <Route path="/Contact" element={<Contect/>}/>
            <Route path="/Blog" element={<Blog/>}/>
            <Route path="/Profile" element={<ProtectedRoute element={<Profile/>}/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/SignUp" element={<Signup/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/OrderConfirmation" element={ <PaymentRoute> <OrderConfirmation/></PaymentRoute>}/>
            <Route path="/ProductDetail" element={<ProductDetailsPage />} />
            <Route path="/OrderDetails/:orderId" element={<OrderDetail/>}/>
            {/* <Route path="/filter" element={<Filter/>}/> */}
            
            <Route path="/admin/Dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/admin/products"
              element={
                <ProtectedAdminRoute>
                  <ManageProducts />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/admin/users"
              element={
                <ProtectedAdminRoute>
                  <ManageUsers />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/admin/orders"
              element={
                <ProtectedAdminRoute>
                  <Orders />
                </ProtectedAdminRoute>
              }
            />
            {/* <Route path="/admin/products/add"
                element={
                  <ProtectedAdminRoute>
                    <AddProduct/>
                  </ProtectedAdminRoute>
                }
            /> */}
          </Routes>
        </main>
        <Footer/>
      </div>
  );
};

export default App;
