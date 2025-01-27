import {FaShoppingCart} from "react-icons/fa"
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../useContextHook/context";
import Login from "../pages/Login";

const Navbar = ({toggleSidebar}) => {

  // const {cart} = useSelector((state) => state);
  // console.log("isuser",isUser)
  const {isUser, cart} = useAppContext();

  return (
    <div >
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">

        <NavLink to="/">
          <div className="ml-5">
          <img src="../logo.png" className="h-14"/>
          </div>
        </NavLink>

          <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
            <NavLink to="/">
              <p>Home</p>
            </NavLink>
            <NavLink to='/Latest'>
              <p>Latest</p>
            </NavLink>
            {/* <NavLink to='/Blog'>
              <p>Blogs</p>
            </NavLink> */}
            <NavLink to='/About'>
              <p>About</p>
            </NavLink>
            <NavLink to='/Contact'>
              <p>Contact</p>
            </NavLink>

            <NavLink to="/cart">
              <div className="relative">
                  <FaShoppingCart className="text-2xl"/>
                  {
                    cart.length > 0 &&
                    <span
                    className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white" 
                    >{cart.length}</span>
                  }
              </div>
            </NavLink>
            {
              isUser ? 
              <NavLink to="/Profile"><FaRegCircleUser className="text-2xl" onClick={toggleSidebar}/></NavLink>
              : <NavLink to="/Login"> <span>Login</span> </NavLink>  
            }
            {
              isUser ? <p>{""}</p>
              : <NavLink to="/SignUp"> <span>Sign In</span> </NavLink>  
            }
          </div>
      </nav>
    </div>
  )
};

export default Navbar;
