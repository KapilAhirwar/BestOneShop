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
//     const [visibleOrders, setVisibleOrders] = useState(2); // Default to show 5 orders

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

//     return (
//         <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
//             <div className="container mx-auto px-4">
//                 {/* Profile Info */}
//                 <div className="bg-white shadow-md rounded-lg p-6 flex items-center mb-10 justify-between">
//                     <div className="flex">
//                       {/* {console.log("pic",userInfo.user_data.profilePicture)} */}
//                         <img
//                             src=" https://via.placeholder.com/150"
//                             alt="User"
//                             className="w-24 h-24 rounded-full mr-6"
//                         />
//                         <div>
//                             <h2 className="text-2xl font-semibold">{userInfo?.name || "User Name"}</h2>
//                             <p className="text-gray-600">{userInfo?.email || "user@example.com"}</p>
//                             <p className="text-gray-600">{userInfo?.phone || "user@example.com"}</p>
//                             {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                                 Edit Profile
//                             </button> */}
//                         </div>
//                     </div>
//                     <div className="flex flex-col">
//                         <button
//                             className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                             onClick={Logout}
//                         >
//                             Logout
//                         </button>
//                         <button
//                             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
//                                         key={order._id}
//                                         className="flex justify-between items-center border-b p-4"
//                                     >
//                                       {/* {console.log("order->",order.products[0].product.images[0])} */}
//                                       <div className="flex">
//                                         <div className="w-[60px]">
//                                           <img src={order.products[0].product.images[0]} width="50px" height="50px" />
//                                         </div>
//                                         <div>
//                                             {/* <p className="font-semibold">Order #{o}</p> */}
//                                             <p className={`text-sm font-semibold ${order.deliveryStatus === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
//                                                 <span className="font-semibold text-black">Delivery Status: </span>{order.deliveryStatus}
//                                             </p>
//                                             <p className={`text-sm font-semibold ${order.paymentStatus === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
//                                                 <span className="font-semibold text-black">Status:</span> {order.paymentStatus}</p>
//                                         </div>
//                                       </div>
//                                         <div>
//                                             <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                                             <p className="font-bold float-right">Item: {order.products.length}</p><br />
//                                             <p className="font-bold float-right">₹{order.totalAmount.toFixed(2)}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 {visibleOrders < userOrder.data.length && (
//                                     <div className="text-center p-4">
//                                         <button
//                                             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
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
//             {isOpenAddress && (
//                 <PopUpOpen>
//                     <AddressManager onClose={handleCloseAddress} />
//                 </PopUpOpen>
//             )}
//         </div>
//     );
// };

// export default Profile;

// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../useContextHook/context";
// import { useEffect, useState } from "react";
// import { FaTimes } from 'react-icons/fa';

// import PopUpOpen from "../User/popUpOpener";
// import AddressManager from "../User/Address";

// import "../pages/product.css"; // Import the CSS file

// // import './profile.css';  // Import the CSS file

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

//     return (
//         <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
//             <div className="container">
//                 {/* Profile Info */}
//                 <div className="profile-container">
//                     <div className="profile-info profile-info-md">
//                         <div className="relative">
//                             <img
//                                 src="https://via.placeholder.com/150"
//                                 alt="User"
//                                 className="profile-img"
//                             />
//                             <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600">
//                                 <FaTimes />
//                             </div>
//                         </div>
//                         <div className="text-center md:text-left mt-4 md:mt-0">
//                             <h2 className="profile-name">
//                                 {userInfo?.name || "User Name"}
//                             </h2>
//                             <p className="text-gray-600">{userInfo?.email || "user@example.com"}</p>
//                             <p className="text-gray-600">{userInfo?.phone || "user@example.com"}</p>
//                             <button className="profile-btn profile-btn-edit">
//                                 Edit Profile
//                             </button>
//                         </div>
//                     </div>
//                     <div className="profile-actions profile-actions-md">
//                         <button
//                             className="profile-btn profile-btn-logout"
//                             onClick={Logout}
//                         >
//                             Logout
//                         </button>
//                         <button
//                             className="profile-btn profile-btn-address"
//                             onClick={handleOpenAddress}
//                         >
//                             Address
//                         </button>
//                     </div>
//                 </div>

//                 {/* Orders Section */}
//                 <div className="orders-container">
//                     <h2 className="orders-header">Order History</h2>
//                     <div className="order-card">
//                         {userOrder?.data && userOrder.data.length > 0 ? (
//                             <>
//                                 {userOrder.data.slice(0, visibleOrders).map((order) => (
//                                     <div
//                                         key={order._id}
//                                         className="order-item order-card-md"
//                                     >
//                                         <div className="flex items-center mb-4 md:mb-0">
//                                             <div className="w-[60px]">
//                                                 <img src={order.products[0].product.images[0]} width="50px" height="50px" alt="Product" />
//                                             </div>
//                                             <div className="ml-4">
//                                                 <p className={`order-status ${order.deliveryStatus === "Cancelled" ? "order-status-cancelled" : "order-status-complete"}`}>
//                                                     <span className="font-semibold text-black">Delivery Status: </span>{order.deliveryStatus}
//                                                 </p>
//                                                 <p className={`order-status ${order.paymentStatus === "Pending" ? "order-status-pending" : "order-status-complete"}`}>
//                                                     <span className="font-semibold text-black">Status:</span> {order.paymentStatus}</p>
//                                             </div>
//                                         </div>
//                                         <div className="order-details order-details-md">
//                                             <p><span className="font-semibold text-black">Total:</span> ₹ {order.totalPrice}</p>
//                                             <button className="order-button">
//                                                 View Details
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </>
//                         ) : (
//                             <p>No Orders found.</p>
//                         )}
//                     </div>
//                     <div className="see-more-button">
//                         <button
//                             className="see-more-button-btn"
//                             onClick={showMoreOrders}
//                         >
//                             See More Orders
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Pop-Up for Address */}
//             {isOpenAddress && (
//                 <PopUpOpen onClose={handleCloseAddress}>
//                     <AddressManager />
//                 </PopUpOpen>
//             )}
//         </div>
//     );
// };

// export default Profile;



import { useNavigate } from "react-router-dom";
import { useAppContext } from "../useContextHook/context";
import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

import PopUpOpen from "../User/popUpOpener";
import AddressManager from "../User/Address";

const Profile = () => {
    const { handleLogOut, role, setrole, getUserOrder, userOrder, userInfo, } = useAppContext();
    const navigate = useNavigate();
    const [isOpenAddress, setOpenAddresses] = useState(false);
    const [visibleOrders, setVisibleOrders] = useState(2); // Default to show 2 orders

    useEffect(() => {
        getUserOrder(); // Fetch user orders when the component mounts
    }, []); // Run only once

    const Logout = () => {
        handleLogOut();
        setrole('');
        navigate('/');
    };

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
        <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Info */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center mb-10 justify-between hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="relative">
                            <img
                                src="https://via.placeholder.com/150"
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
                            <p className="text-gray-600">{userInfo?.phone || "user@example.com"}</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mt-4 md:mt-0 md:space-x-4">
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                            onClick={Logout}
                        >
                            Logout
                        </button>
                        <button
                            className="mt-4 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                            onClick={handleOpenAddress}
                        >
                            Address
                        </button>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
                    <div className="bg-white shadow-md rounded-lg">
                        {userOrder?.data && userOrder.data.length > 0 ? (
                            <>
                                {userOrder.data.slice(0, visibleOrders).map((order) => (
                                    <div
                                    key={order._id}
                                    className="flex flex-col md:flex-row justify-between items-center border-b p-4"
                                    >
                                        {/* {console.log(order.products[0].product.images[0])} */}
                                        <div className="flex items-center mb-4 md:mb-0">
                                            <div className="w-[60px]">
                                                {/* <img src={order.products[0].product.images[0]} width="50px" height="50px" alt="Product" /> */}
                                            </div>
                                            <div className="ml-4">
                                                <p className={`text-sm font-semibold ${order.deliveryStatus === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
                                                    <span className="font-semibold text-black">Delivery Status: </span>{order.deliveryStatus}
                                                </p>
                                                <p className={`text-sm font-semibold ${order.paymentStatus === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                                                    <span className="font-semibold text-black">Status:</span> {order.paymentStatus}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 text-center md:text-right">
                                            <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
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
