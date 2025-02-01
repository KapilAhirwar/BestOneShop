// import { NavLink } from "react-router-dom";
// import { FaRegCircleUser } from "react-icons/fa6";

// const AdminNavbar = () => {
//   return (
//     <div >
//           <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
    
//             <NavLink to="/">
//               <div className="ml-5">
//               <img src="../logo.png" className="h-14"/>
//               </div>
//             </NavLink>
    
//               <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
//                 <NavLink to="/admin/Dashboard" className="hover:text-blue-300 mr-5">
//                   Dashboard
//                 </NavLink>
//                 <NavLink to="/admin/products" className="hover:text-blue-300 mr-5">
//                   Manage Products
//                 </NavLink>
//                 <NavLink to="/admin/users" className="hover:text-blue-300 mr-5">
//                   Manage Users
//                 </NavLink>
//                 <NavLink to="/admin/orders" className="hover:text-blue-300 mr-auto">
//                   Orders
//                 </NavLink>
//                 <NavLink to="/Profile">
//                   <FaRegCircleUser className="text-3xl" />
//                 </NavLink>
//               </div>
//           </nav>
//     </div>
//   );
// };

// export default AdminNavbar;





import { NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-gray-800 text-white">
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-4">
        {/* Logo */}
        <NavLink to="/">
          <div className="ml-5">
            <img src="../logo.png" className="h-14" alt="Logo" />
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center font-medium space-x-6">
          <NavLink
            to="/admin/Dashboard"
            className="hover:text-blue-300 mr-5"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className="hover:text-blue-300 mr-5"
          >
            Manage Products
          </NavLink>
          <NavLink
            to="/admin/users"
            className="hover:text-blue-300 mr-5"
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/admin/orders"
            className="hover:text-blue-300 mr-auto"
          >
            Orders
          </NavLink>
          <NavLink to="/Profile">
            <FaRegCircleUser className="text-3xl" />
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={handleMenuToggle} aria-label="Toggle Menu">
            {menuOpen ? (
              <HiX className="text-3xl" />
            ) : (
              <HiMenuAlt3 className="text-3xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-700 text-white space-y-4 py-4">
          <NavLink
            to="/admin/Dashboard"
            className="hover:text-blue-300"
            onClick={handleMenuToggle}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className="hover:text-blue-300"
            onClick={handleMenuToggle}
          >
            Manage Products
          </NavLink>
          <NavLink
            to="/admin/users"
            className="hover:text-blue-300"
            onClick={handleMenuToggle}
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/admin/orders"
            className="hover:text-blue-300"
            onClick={handleMenuToggle}
          >
            Orders
          </NavLink>
          <NavLink
            to="/Profile"
            className="hover:text-blue-300"
            onClick={handleMenuToggle}
          >
            <FaRegCircleUser className="text-3xl" />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
