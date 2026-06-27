// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../useContextHook/context";
// import { useEffect, useState } from "react";
// import { FaTimes } from 'react-icons/fa';

// import PopUpOpen from "../User/popUpOpener";
// import AddressManager from "../User/Address";

// const Profile = () => {
//     const { handleLogOut, role, setrole, getUserOrder, userOrder, userInfo, } = useAppContext();
//     const navigate = useNavigate();
//     const [isOpenAddress, setOpenAddresses] = useState(false);
//     const [visibleOrders, setVisibleOrders] = useState(2); // Default to show 2 orders

//     useEffect(() => {
//         getUserOrder(); // Fetch user orders when the component mounts
//     }, []); // Run only once

//     const Logout = () => {
//         handleLogOut();
//         setrole('');
//         navigate('/');
//     };

//     const handleOpenAddress = () => {
//         setOpenAddresses(true);
//     };
//     const handleCloseAddress = () => {
//         setOpenAddresses(false);
//     };

//     const showMoreOrders = () => {
//         setVisibleOrders((prev) => prev + 5); // Load 5 more orders on click
//     };

//     console.log("user profile -> ", userInfo);

//     return (
//         <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Profile Info */}
//                 <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center mb-10 justify-between hover:shadow-xl transition-shadow duration-300">
//                     <div className="flex flex-col md:flex-row items-center">
//                         <div className="relative">
//                             <img
//                                 src={
//                                     userInfo?.profilePicture
//                                         ? userInfo.profilePicture
//                                         : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
//                                             userInfo?.name || "User Name"
//                                         )}`
//                                 }
//                                 alt="User"
//                                 className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6 transform transition-transform duration-300 hover:scale-105"
//                             />
//                             <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600">
//                                 <FaTimes />
//                             </div>
//                         </div>
//                         <div className="text-center md:text-left mt-4 md:mt-0">
//                             <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300">
//                                 {userInfo?.name || "User Name"}
//                             </h2>
//                             <p className="text-gray-600">{userInfo?.email || "user@example.com"}</p>
//                             <p className="text-gray-600">{userInfo?.phone || "user@example.com"}</p>
//                             <button 
//                                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
//                                 onClick={"ProfileEditBtn"}
//                             >
//                                 Edit Profile
//                             </button>
//                         </div>
//                     </div>
//                     <div className="flex flex-col md:flex-row mt-4 md:mt-0 md:space-x-4">
//                         <button
//                             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
//                             onClick={Logout}
//                         >
//                             Logout
//                         </button>
//                         <button
//                             className="mt-4 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
//                             onClick={handleOpenAddress}
//                         >
//                             Address
//                         </button>
//                     </div>
//                 </div>

//                 {/* Orders Section */}
//                 <div className="mb-10">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
//                     <div className="bg-white shadow-md rounded-lg">
//                         {userOrder?.data && userOrder.data.length > 0 ? (
//                             <>
//                                 {userOrder.data.slice(0, visibleOrders).map((order) => (
//                                     <div
//                                     key={order._id}
//                                     className="flex flex-col md:flex-row justify-between items-center border-b p-4"
//                                     >
//                                         {/* {console.log(order.products[0].product.images[0])} */}
//                                         <div className="flex items-center mb-4 md:mb-0">
//                                             <div className="w-[60px]">
//                                                 {/* <img src={order.products[0].product.images[0]} width="50px" height="50px" alt="Product" /> */}
//                                             </div>
//                                             <div className="ml-4">
//                                                 <p className={`text-sm font-semibold ${order.deliveryStatus === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
//                                                     <span className="font-semibold text-black">Delivery Status: </span>{order.deliveryStatus}
//                                                 </p>
//                                                 <p className={`text-sm font-semibold ${order.paymentStatus === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
//                                                     <span className="font-semibold text-black">Status:</span> {order.paymentStatus}</p>
//                                             </div>
//                                         </div>
//                                         <div className="mt-4 md:mt-0 text-center md:text-right">
//                                             <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                                             <p className="font-bold">Item: {order.products.length}</p>
//                                             <p className="font-bold">₹{order.totalAmount.toFixed(2)}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 {visibleOrders < userOrder.data.length && (
//                                     <div className="text-center p-4">
//                                         <button
//                                             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
//                                             onClick={showMoreOrders}
//                                         >
//                                             See More
//                                         </button>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <p className="p-4 text-gray-500 text-center">No orders found.</p>
//                         )}
//                     </div>
//                 </div>
                
//             </div>

//             {/* Address Popup */}
//             {isOpenAddress && (
//                 <PopUpOpen>
//                     <AddressManager onClose={handleCloseAddress} />
//                 </PopUpOpen>
//             )}
//         </div>
//     );
// };

// export default Profile;


import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../useContextHook/context";
import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

import PopUpOpen from "../User/popUpOpener";
import AddressManager from "../User/Address";

const Profile = () => {
    const { handleLogOut, role, setrole, getUserOrder, userOrder, userInfo } = useAppContext();
    const navigate = useNavigate();
    const [isOpenAddress, setOpenAddresses] = useState(false);
    const [visibleOrders, setVisibleOrders] = useState(2); // Default to show 2 orders

    useEffect(() => {
        getUserOrder(); // Fetch user orders when the component mounts
    }, []);

    const Logout = () => {
        handleLogOut();
        setrole('');
        navigate('/');
    };
    console.log(userOrder);
    const handleOpenAddress = () => {
        setOpenAddresses(true);
    };
    const handleCloseAddress = () => {
        setOpenAddresses(false);
    };

    const showMoreOrders = () => {
        setVisibleOrders((prev) => prev + 5); // Load 5 more orders on click
    };

    return (
        <div className="bg-gray-100 min-h-screen py-4 sm:py-10">
            <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                {/* Profile Info */}
                {/* <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 flex flex-col md:flex-row items-center mb-8 sm:mb-10 justify-between hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="relative">
                            <img
                                src={
                                    userInfo?.profilePicture
                                        ? userInfo.profilePicture
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(userInfo?.name || "User Name")}`
                                }
                                alt="User"
                                className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6 transform transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600">
                                <FaTimes />
                            </div>
                        </div>
                        <div className="text-center md:text-left mt-4 md:mt-0">
                            <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300">
                                {userInfo?.name || "User Name"}
                            </h2>
                            <p className="text-gray-600">{userInfo?.email || "user@example.com"}</p>
                            <p className="text-gray-600">{userInfo?.phone || "0000000000"}</p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                                onClick={() => alert("Edit Profile Clicked")}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-0">
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                            onClick={Logout}
                        >
                            Logout
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                            onClick={handleOpenAddress}
                        >
                            Address
                        </button>
                    </div>
                </div> */}       
                {/* Profile Info */}
                <div className="w-full sm:container sm:mx-auto bg-white shadow-lg rounded-md sm:rounded-lg px-2 py-3 sm:px-3 flex flex-col md:flex-row items-center mb-2 sm:mb-10 justify-between hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row items-center w-full md:gap-5 md:mx-4">
                        <div className="relative">
                            <img
                                src={
                                    userInfo?.profilePicture
                                        ? userInfo.profilePicture
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(userInfo?.name || "User Name")}`
                                }
                                alt="User"
                                className="w-24 h-24 sm:w-28 sm:h-24 rounded-full mb-4 md:mb-0 md:mr-6 object-cover border-2 border-gray-300"
                            />
                            <div className="absolute bottom-0 right-0 bg-blue-500 p-1.5 sm:p-2 rounded-full text-white cursor-pointer hover:bg-blue-600">
                                <FaTimes className="text-sm sm:text-base" />
                            </div>
                        </div>
                        <div className="text-center md:text-left mt-3 md:mt-0 w-full">
                            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300">
                                {userInfo?.name || "User Name"}
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base">{userInfo?.email || "user@example.com"}</p>
                            <p className="text-gray-600 text-sm sm:text-base">{userInfo?.phone || "0000000000"}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm sm:text-base md:w-32"
                                    onClick={() => alert("Edit Profile Clicked")}
                                >
                                    Edit Profile
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-sm sm:text-base"
                                    onClick={Logout}
                                >
                                    Logout
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 text-sm sm:text-base"
                                    onClick={handleOpenAddress}
                                >
                                    Address
                                </button>
                        </div>
                    </div>
                </div>


                {/* Orders Section */}
                <div className="w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 ">Order History</h2>
                    <div className=" w-full sm:container sm:mx-auto bg-white shadow-lg rounded-md sm:rounded-lg px-2 py-3 sm:px-3 flex flex-col md:flex-col items-center mb-2 sm:mb-10 justify-between hover:shadow-xl transition-shadow duration-300">
                        {userOrder?.data && userOrder.data.length > 0 ? (
                            <>
                                {userOrder.data.slice(0, visibleOrders).map((order) => (
                                    <div
                                        key={order._id}
                                        className="flex flex-col sm:flex-row justify-between gap-3 border-b p-4 w-full"
                                    >   
                                        <Link 
                                            to={`/OrderDetails/${order._id}`}
                                            state={{ order: order }}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-[60px] h-[60px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
                                                    {/* You can show product thumbnail here if available */}
                                                    <img src={order.products[0].item_img} alt="kk" />
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-semibold ${order.deliveryStatus === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
                                                        <span className="font-semibold text-black">Delivery Status: </span>{order.deliveryStatus}
                                                    </p>
                                                    <p className={`text-sm font-semibold ${order.paymentStatus === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                                                        <span className="font-semibold text-black">Status:</span> {order.paymentStatus}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="text-sm text-gray-700 sm:text-right">
                                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                            <p className="font-bold">Item: {order.products.length}</p>
                                            <p className="font-bold">₹{order.totalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                                {visibleOrders < userOrder.data.length && (
                                    <div className="text-center p-4">
                                        <button
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
                                            onClick={showMoreOrders}
                                        >
                                            See More
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="p-4 text-gray-500 text-center">No orders found.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Address Popup */}
            {isOpenAddress && (
                <PopUpOpen>
                    <AddressManager onClose={handleCloseAddress} />
                </PopUpOpen>
            )}
        </div>
    );
};

export default Profile;
