// import { FaShoppingCart } from "react-icons/fa";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { HiMenuAlt3, HiX } from "react-icons/hi"; // For mobile menu icons
// import { NavLink } from "react-router-dom";
// import { useState } from "react";
// import { useAppContext } from "../useContextHook/context";

// const Navbar = ({ toggleSidebar }) => {
//   const { isUser, cart } = useAppContext();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleMenuToggle = () => setMenuOpen(!menuOpen);

//   return (
//     <div className="bg-gray-800 text-white">
//       <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-4">
//         {/* Logo */}
//         <NavLink to="/">
//           <div className="ml-5">
//             <img src="../logo.png" className="h-14" alt="Logo" />
//           </div>
//         </NavLink>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center font-medium space-x-6">
//           <NavLink to="/" className="hover:text-green-400">Home</NavLink>
//           <NavLink to="/Latest" className="hover:text-green-400">Latest</NavLink>
//           <NavLink to="/About" className="hover:text-green-400">About</NavLink>
//           <NavLink to="/Contact" className="hover:text-green-400">Contact</NavLink>
//           <NavLink to="/cart">
//             <div className="relative">
//               <FaShoppingCart className="text-2xl" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center rounded-full text-white">
//                   {cart.length}
//                 </span>
//               )}
//             </div>
//           </NavLink>
//           {isUser ? (
//             <NavLink to="/Profile">
//               <FaRegCircleUser className="text-2xl" onClick={toggleSidebar} />
//             </NavLink>
//           ) : (
//             <NavLink to="/Login" className="hover:text-green-400">Login</NavLink>
//           )}
//           {!isUser && (
//             <NavLink to="/SignUp" className="hover:text-green-400">Sign In</NavLink>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden flex items-center">
//           <button onClick={handleMenuToggle} aria-label="Toggle Menu">
//             {menuOpen ? <HiX className="text-3xl" /> : <HiMenuAlt3 className="text-3xl" />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden flex flex-col items-center bg-gray-700 text-white space-y-4 py-4">
//           <NavLink to="/" className="hover:text-green-400" onClick={handleMenuToggle}>Home</NavLink>
//           <NavLink to="/Latest" className="hover:text-green-400" onClick={handleMenuToggle}>Latest</NavLink>
//           <NavLink to="/About" className="hover:text-green-400" onClick={handleMenuToggle}>About</NavLink>
//           <NavLink to="/Contact" className="hover:text-green-400" onClick={handleMenuToggle}>Contact</NavLink>
//           <NavLink to="/cart" className="hover:text-green-400" onClick={handleMenuToggle}>
//             <div className="relative flex items-center">
//               <FaShoppingCart className="text-2xl" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center rounded-full text-white">
//                   {cart.length}
//                 </span>
//               )}
//             </div>
//           </NavLink>
//           {isUser ? (
//             <NavLink to="/Profile" className="hover:text-green-400" onClick={handleMenuToggle}>
//               Profile
//             </NavLink>
//           ) : (
//             <>
//               <NavLink to="/Login" className="hover:text-green-400" onClick={handleMenuToggle}>Login</NavLink>
//               <NavLink to="/SignUp" className="hover:text-green-400" onClick={handleMenuToggle}>Sign In</NavLink>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;


import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../useContextHook/context";
import { useState, useEffect } from "react";

const Navbar = ({ toggleSidebar }) => {
  const { isUser, cart } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTabletView, setIsTabletView] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
    }
  };

  // ✅ Detect width between 1240px and 765px
  useEffect(() => {
    const handleResize = () => {
      setIsTabletView(window.innerWidth < 1240 && window.innerWidth > 765);
    };
    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gray-800 text-white">
      <nav className="flex justify-between items-center h-20 max-w-[85rem] mx-auto px-6">
        {/* ✅ Left: Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/">
            <img src="../logo.png" className="h-14" alt="Logo" />
          </NavLink>
        </div>

        {/* ✅ Center: Search Bar (Desktop + Tablet) */}
        <div
          className={`${
            isTabletView ? "flex max-w-sm" : "hidden md:flex"
          } flex-1 justify-center`}
        >
          <form
            onSubmit={handleSearch}
            className="w-full max-w-md bg-gray-700 rounded-full overflow-hidden flex"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* ✅ Right: Menu (Desktop Only) */}
        <div className="hidden md:flex items-center font-medium space-x-6">
          <NavLink to="/" className="hover:text-green-400">
            Home
          </NavLink>
          <NavLink to="/Latest" className="hover:text-green-400">
            Latest
          </NavLink>
          <NavLink to="/About" className="hover:text-green-400">
            About
          </NavLink>
          <NavLink to="/Contact" className="hover:text-green-400">
            Contact
          </NavLink>

          {/* Cart */}
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

          {/* User / Login */}
          {isUser ? (
            <NavLink to="/Profile">
              <FaRegCircleUser className="text-2xl" onClick={toggleSidebar} />
            </NavLink>
          ) : (
            <>
              <NavLink to="/Login" className="hover:text-green-400">
                Login
              </NavLink>
              <NavLink to="/SignUp" className="hover:text-green-400">
                Sign In
              </NavLink>
            </>
          )}
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={handleMenuToggle} aria-label="Toggle Menu">
            {menuOpen ? <HiX className="text-3xl" /> : <HiMenuAlt3 className="text-3xl" />}
          </button>
        </div>
      </nav>

      {/* ✅ Mobile Menu with Search */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-700 text-white space-y-4 py-4 px-4">
          {/* 🔍 Mobile Search Bar */}
          <form
            onSubmit={handleSearch}
            className="w-full bg-gray-600 rounded-full overflow-hidden flex"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-white bg-gray-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              Go
            </button>
          </form>

          <NavLink to="/" className="hover:text-green-400" onClick={handleMenuToggle}>
            Home
          </NavLink>
          <NavLink to="/Latest" className="hover:text-green-400" onClick={handleMenuToggle}>
            Latest
          </NavLink>
          <NavLink to="/About" className="hover:text-green-400" onClick={handleMenuToggle}>
            About
          </NavLink>
          <NavLink to="/Contact" className="hover:text-green-400" onClick={handleMenuToggle}>
            Contact
          </NavLink>

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
              <NavLink to="/Login" className="hover:text-green-400" onClick={handleMenuToggle}>
                Login
              </NavLink>
              <NavLink to="/SignUp" className="hover:text-green-400" onClick={handleMenuToggle}>
                Sign In
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

