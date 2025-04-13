import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toast as toastHot } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

// const backendUrl = "http://localhost:5000/api/v1"

const backendUrl = "https://shopibackend-2.onrender.com/api/v1";  //https://shopibackend-1.onrender.com

// let backendUrl = process.env.REACT_APP_BACKEND_URL;
const authUrl = `${backendUrl}/protect`;
const adminurl = `${backendUrl}/Admin`;
const userUrl = `${backendUrl}/User`;

console.log(backendUrl);


export const AppContext = createContext();

export const AppContextprovider  = ({children})  => {
    const [isUser, setIsUser] = useState(false);
    const [LoginData,setLoginData] = useState({ email:'', password:'' });// logindata store
    const [signInData, setSignInData ] = useState({name:'', email:'', password:'', phone:''}); //signUp Store
    const [role , setrole] = useState('');
    const [show,setShow] = useState(false);
    const [products,setproduct] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState({});
    const formData = new FormData();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [userOrder, setUserOrder] = useState({});

    const [cart, setCart] = useState([]);
    const [updatedCart, setUpdatedCart] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});

    // Helper function to sync updatedCart
    const syncUpdatedCart = (newCart) => {
      setUpdatedCart(
        newCart.map((item) => ({
          product: { ...item },
          quantity: 1,
        }))
      );
    };
   
    // Check user session using cookies
    const checkUserStatus = async () => {
        // console.log("checkstatus");
        try {
            const res = await axios.get(`${authUrl}/validate-session`, { withCredentials: true });
            // console.log("data after authorize -> ", res.data);
            // console.log("status");
            if (res.data.valid) {
                setIsUser(true);
                setrole(res.data.user.role);
                GetProduct();
                setUserInfo(res.data.user_data);
                setdata(res.data);
                GetAllCart();
                fetchAddresses();
                // setAddNote(res.data.user_data.userNotes);
                // setUserCompleteArray(res.data.user_data.completeQuestions);
            } else {
                setIsUser(false);
            }
        } catch (err) {
            // console.error("valid -> ",err);
            setIsUser(false);
            // navigete('/Login');
        }
    };
    useEffect(() => {
        // console.log("user data fatchting -> ");
        checkUserStatus();
    }, [onclick]);

    //logout krta hai 
    const handleLogOut = async() => {
        try{
            const res = await axios.post(`${authUrl}/Logout`,{},{withCredentials:true});
            setIsUser(false);
            setCart([]);
            setUpdatedCart([])
            // setUserInfo({});
            // setUserCompleteArray([]);
            // setrole('');
            // questions(topic, userInfo); // Re-render questions
            toastHot.success("Logout is Successfully");
        }catch(err){
            console.log(err);
            toast.error("Failed to log out. Please tru again. ");
        }
    }
    // Authorize user after login
    const AuthorizeUser = async (role) => { 
        let roleUrl = '';
        if (role === "User") roleUrl = `${authUrl}/U/user`;  
        if (role === 'Admin') roleUrl = `${authUrl}/A/admin`;
        setrole(role);// set user role specific
        try {
            const res = await axios.get(roleUrl, { withCredentials: true });
            setIsUser(true);
            if(role=="Admin"){ 
                navigate('/admin/Dashboard');
            }
            else{
                navigate('/');
                console.log("authorize",res.data);
                setUserInfo(res.data.user_data);
                setdata(res.data);
                GetAllCart();
                fetchAddresses();
            }
            GetProduct();
            // localStorage.setItem('isUser', 'true');
            // AllData();
            // toastHot.success(res.data.message);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };
    //user login 
    const handleLogin = async () => {
        // console.log("user data fatchting -> ",LoginData);
        try{
            const response = await axios.post(`${authUrl}/User/LogIn`, 
                { email: LoginData.email, password: LoginData.password }, 
                { withCredentials: true }
            );            
            setUserInfo(response.data.data);
            // setAddNote(response.data.data.userNotes);
            // setUserCompleteArray(response.data.data.completeQuestions);
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
            setrole(response.data.data.role);
            await AuthorizeUser(response.data.data.role);
            toastHot.success(response.data.message);
        }catch(err){
            console.log(err);
            if (err.response) {
                toast.error(err.response.data.message); // Show error message from backend
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    }
    //function for login after the signup...
    const afterSignhandleLogin = async (loginData) => {
        // console.log("user data fatchting ->  ",loginData.email, loginData.password);
        try{
            const response = await axios.post(`${authUrl}/User/LogIn`, 
                { email: loginData.email, password: loginData.password }, 
                { withCredentials: true }
            );
            // console.log("login", response.data.data.completeQuestions);
            // setUserCompleteArray(response.data.data.completeQuestions);
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
            setrole(response.data.data.role);
            await AuthorizeUser(response.data.data.role);
            toastHot.success(response.data.message);
        }catch(err){
            console.log(err);
            if (err.response) {
                toast.error(err.response.data.message); // Show error message from backend
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    }

    // const Otpverification = async(otp,onClose) => {
    //     // console.log(verifyOtpData.email, otp);
    //     try{
    //         const res = await axios.post(`${authUrl}/Verify_Otp`,
    //             {email:verifyOtpData.email,otp},
    //             {withCredentials:true}
    //         );
    //         console.log(res.data);
    //         toast.success("OTP Verified ! ");
    //         await afterSignhandleLogin(afterOtp); // Automatically logs in the user after signup
    //         onClose();
    //     }catch(err){
    //         console.log("Invalid otp ")
    //         toast.warn("OTP Invalid");
    //     }   
    // };

    //user signIn
    const handleSignIn = async () => {
        // console.log("sign in hona hai ", signInData);
        try {
            // Step 1: Sign up the user
            const response = await axios.post(`${authUrl}/User/SignIn`, signInData);
            // console.log("Ban gya account");

            //verify otp ke liye email add kr rhe hai: 
            // setOtpData({email:signInData.email});
            // toastHot.success("OTP sended successfully !");
            // setAfterOtp({ email: signInData.email, password: signInData.password });
            const loginData = {email: signInData.email, password: signInData.password};
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            await afterSignhandleLogin(loginData); // Automatically logs in the user after signup

            // Step 3: Attempt to log the user in
            // await handleLogin(loginData);            //need to solve..
        } catch (err) {
            console.error(err);
            toastHot.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };


  //Products api call
  const addProduct = async() => {
        try {
            console.log("upload")
            const response = await axios.post(`${adminurl}/upload/product`,formData,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // If using cookies for authentication
              }
            );
            console.log("ho gya ",response.data);
            toastHot.success(response.data.message);
            // alert('Product added successfully!');
          } catch (error) {
            console.error('Error adding product:', error);
          }
          
  }
  const GetProduct = async() => {
        try {
            const response = await axios.get(`${adminurl}/Get/product`);
            setproduct(response.data.data);
            // console.log(response.data.data);

        } catch (error) {
            console.log(error);
        }
  };
  const deleteProductImage = async (productId, imageUrl) => {
        try {
          const response = await axios.delete(`${adminurl}/product/${productId}/image`, {
            data: { imageUrl }, // Send imageUrl in the request body
          });
          console.log('Image deleted successfully:');
          GetProduct();
          return response.data;
        } catch (error) {
          console.error('Error deleting image:', error.response?.data || error.message);
          throw error;
        }
  };
  const EditProductData = async(formData,productId) => {
        try {
            // console.log("upload",productId);
            const response = await axios.post(`${adminurl}/${productId}/EditProduct`,formData,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // If using cookies for authentication
              }
            );
            // console.log("ho gya update ");
            toastHot.success(response.data.message);
            // alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
        }
  };
  const ProductDelete = async(productId) => {
        try {
            console.log("upload",productId);
            const response = await axios.delete(`${adminurl}/${productId}/deleteProduct`);
            // console.log("ho gya delete ");
            GetProduct();
            toastHot.success(response.data.message);
            // alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
            toastHot.error(errorMessage); // Error notification
        }
  }

//admin handle user data api calls
  const getUsers = async () => {
    try {
      const response = await axios.get(`${adminurl}/manage-users`);
      return response.data.users; // Array of users
    }catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
      return [];
    }
  };
  const editUser = async (userId, updatedData) => {
    console.log(userId,updatedData)
    try {
      const response = await axios.put(`${adminurl}/manage-users/${userId}/edit`, updatedData);
      toast.success(response.data.message);
      return response.data.user; // Updated user data
    }catch (error) {
      console.error('Error editing user:', error);
      toast.error('Failed to edit user');
    }
  };
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${adminurl}/manage-users/${userId}/delete`);
      toast.success(response.data.message);
    }catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  //address api calls
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${userUrl}/Get/Address`,{ withCredentials: true });
      setAddresses(response.data.data);
      }catch (error) {
        toast.error("Failed to fetch addresses.");
        console.error("Error fetching addresses:", error);
      } finally {
      setLoading(false);
    }
  };
  const addAddress = async (formData) => {
      // console.log("ye hai data ", formData);
      setLoading(true);
    try {
      const response = await axios.post(`${userUrl}/AddNew/Address`, formData,{ withCredentials: true });
      console.log("ho gya address",response.data);
      setAddresses((prevAddresses) => [...prevAddresses, response.data.address]);
      toast.success("Address added successfully!");
    } catch (error) {
      toast.error("Failed to add address.");
      console.error("Error adding address:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateAddress = async (id, formData) => {
      setLoading(true);
      try {
        const response = await axios.put(`${userUrl}/${id}/Update/address`, formData,{ withCredentials: true });
        setAddresses((prevAddresses) =>
            prevAddresses.map((address) =>
              address._id === id ? response.data.address : address
            )
        );
        toast.success("Address updated successfully!");
      } catch (error) {
        toast.error("Failed to update address.");
        console.error("Error updating address:", error);
      } finally {
        setLoading(false);
      }
  };
  const deleteAddress = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${userUrl}/${id}/delete/address`,{ withCredentials: true });
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== id));
        toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete address.");
      console.error("Error deleting address:", error);
    } finally {
      setLoading(false);
    }
  };

    
  //cart api calls
  const GetAllCart = async () => {
    try {
      const response = await axios.get(`${userUrl}/addToCart`, { withCredentials: true });
      const newProducts = response.data.cart.products;
  
      setCart((prev) => {
        const updatedCart = [
          ...prev,
          ...newProducts.filter((p) => !prev.some((existing) => existing._id === p._id)),
        ];
        syncUpdatedCart(updatedCart); // Sync updatedCart
        return updatedCart;
      });
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data?.message || error.message);
    }
  };
  const addToCart = async (item) => {
    const productId = item._id;
    try {
      const response = await axios.post(
        `${userUrl}/add-To/cart`,
        { productId },
        { withCredentials: true }
      );
      console.log("Item added:", response.data.cart.products);
      const newProducts = response.data.cart.products;
  
      setCart((prev) => {
        const updatedCart = [
          ...prev,
          ...newProducts.filter((p) => !prev.some((existing) => existing._id === p._id)),
        ];
        syncUpdatedCart(updatedCart); // Sync updatedCart
        return updatedCart;
      });
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data?.message || error.message);
    }
  };
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${userUrl}/${productId}/remove/cart`, {
        withCredentials: true,
      });
      console.log("Item removed successfully:", response.data.message);
      
      setCart((prev) => {
        const newCart = prev.filter((item) => item._id !== productId);
        syncUpdatedCart(newCart); // Sync updatedCart
        return newCart;
      });
    } catch (error) {
      console.error("Error removing from cart:", error.response?.data?.message || error.message);
    }
  };
  const clearCart = () => {
    setCart([]);
  };

  //order
  const getUserOrder = async() => {
    try {
      const response = await axios.get(`${userUrl}/get/user/orders`,{withCredentials:true});
      // console.log("Orders -> ",response.data);
      setUserOrder(response.data);
    } catch (error) {
      console.log("error in user order",error);
    }
  }
  
    return <AppContext.Provider 
    value={{ isUser, clearCart, removeFromCart, addToCart, cart, role, setrole,
             signInData, setSignInData, handleSignIn, LoginData, setLoginData, 
             handleLogin, handleLogOut, show, setShow, formData, addProduct, GetProduct,
             products, deleteProductImage, EditProductData, ProductDelete,
             getUsers, editUser, deleteUser, addresses, loading, 
             fetchAddresses, addAddress, updateAddress, deleteAddress, data, 
             updatedCart, setUpdatedCart, orderDetails, setOrderDetails, 
             getUserOrder, userOrder, userInfo,
                                        
            }}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}

