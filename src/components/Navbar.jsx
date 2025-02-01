// import {FaShoppingCart} from "react-icons/fa"
// import { FaRegCircleUser } from "react-icons/fa6";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { useAppContext } from "../useContextHook/context";
// import Login from "../pages/Login";

// const Navbar = ({toggleSidebar}) => {

//   // const {cart} = useSelector((state) => state);
//   // console.log("isuser",isUser)
//   const {isUser, cart} = useAppContext();

//   return (
//     <div >
//       <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">

//         <NavLink to="/">
//           <div className="ml-5">
//           <img src="../logo.png" className="h-14"/>
//           </div>
//         </NavLink>

//           <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
//             <NavLink to="/">
//               <p>Home</p>
//             </NavLink>
//             <NavLink to='/Latest'>
//               <p>Latest</p>
//             </NavLink>
//             {/* <NavLink to='/Blog'>
//               <p>Blogs</p>
//             </NavLink> */}
//             <NavLink to='/About'>
//               <p>About</p>
//             </NavLink>
//             <NavLink to='/Contact'>
//               <p>Contact</p>
//             </NavLink>

//             <NavLink to="/cart">
//               <div className="relative">
//                   <FaShoppingCart className="text-2xl"/>
//                   {
//                     cart.length > 0 &&
//                     <span
//                     className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
//                     justify-center items-center animate-bounce rounded-full text-white" 
//                     >{cart.length}</span>
//                   }
//               </div>
//             </NavLink>
//             {
//               isUser ? 
//               <NavLink to="/Profile"><FaRegCircleUser className="text-2xl" onClick={toggleSidebar}/></NavLink>
//               : <NavLink to="/Login"> <span>Login</span> </NavLink>  
//             }
//             {
//               isUser ? <p>{""}</p>
//               : <NavLink to="/SignUp"> <span>Sign In</span> </NavLink>  
//             }
//           </div>
//       </nav>
//     </div>
//   )
// };

// export default Navbar;



import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // For mobile menu icons
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../useContextHook/context";

const Navbar = ({ toggleSidebar }) => {
  const { isUser, cart } = useAppContext();
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
          <NavLink to="/" className="hover:text-green-400">Home</NavLink>
          <NavLink to="/Latest" className="hover:text-green-400">Latest</NavLink>
          <NavLink to="/About" className="hover:text-green-400">About</NavLink>
          <NavLink to="/Contact" className="hover:text-green-400">Contact</NavLink>
          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center rounded-full text-white">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
          {isUser ? (
            <NavLink to="/Profile">
              <FaRegCircleUser className="text-2xl" onClick={toggleSidebar} />
            </NavLink>
          ) : (
            <NavLink to="/Login" className="hover:text-green-400">Login</NavLink>
          )}
          {!isUser && (
            <NavLink to="/SignUp" className="hover:text-green-400">Sign In</NavLink>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={handleMenuToggle} aria-label="Toggle Menu">
            {menuOpen ? <HiX className="text-3xl" /> : <HiMenuAlt3 className="text-3xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-700 text-white space-y-4 py-4">
          <NavLink to="/" className="hover:text-green-400" onClick={handleMenuToggle}>Home</NavLink>
          <NavLink to="/Latest" className="hover:text-green-400" onClick={handleMenuToggle}>Latest</NavLink>
          <NavLink to="/About" className="hover:text-green-400" onClick={handleMenuToggle}>About</NavLink>
          <NavLink to="/Contact" className="hover:text-green-400" onClick={handleMenuToggle}>Contact</NavLink>
          <NavLink to="/cart" className="hover:text-green-400" onClick={handleMenuToggle}>
            <div className="relative flex items-center">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center rounded-full text-white">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
          {isUser ? (
            <NavLink to="/Profile" className="hover:text-green-400" onClick={handleMenuToggle}>
              Profile
            </NavLink>
          ) : (
            <>
              <NavLink to="/Login" className="hover:text-green-400" onClick={handleMenuToggle}>Login</NavLink>
              <NavLink to="/SignUp" className="hover:text-green-400" onClick={handleMenuToggle}>Sign In</NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
