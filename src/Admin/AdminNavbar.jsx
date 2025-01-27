import { NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

const AdminNavbar = () => {
  return (
    <div >
          <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
    
            <NavLink to="/">
              <div className="ml-5">
              <img src="../logo.png" className="h-14"/>
              </div>
            </NavLink>
    
              <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
                <NavLink to="/admin/Dashboard" className="hover:text-blue-300 mr-5">
                  Dashboard
                </NavLink>
                <NavLink to="/admin/products" className="hover:text-blue-300 mr-5">
                  Manage Products
                </NavLink>
                <NavLink to="/admin/users" className="hover:text-blue-300 mr-5">
                  Manage Users
                </NavLink>
                <NavLink to="/admin/orders" className="hover:text-blue-300 mr-auto">
                  Orders
                </NavLink>
                <NavLink to="/Profile">
                  <FaRegCircleUser className="text-3xl" />
                </NavLink>
              </div>
          </nav>
    </div>
  );
};

export default AdminNavbar;
