import {toast as toastHot} from "react-hot-toast";

const loadRazorpayScript = () =>
    new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

const ProceedWithRazorpay = async ({ orderId, total, billingDetails, key, paymentVerify, order, setPaymentLoader }) => {
    
    // console.log("Arguments for Razorpay:", { order });
    // Load Razorpay SDK dynamically
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
        toastHot.error("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // Validate API Key
    const razorpayKey = key || process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_M5FB2A2lt5JanY';
    if (!razorpayKey) {
        console.error("Razorpay API key is missing.");
        toastHot.error("Payment gateway is not configured.");
        return;
    }

    const options = {
        key: razorpayKey,
        amount: Math.round(total * 100), // Amount in smallest currency unit (paise)
        name: "BestOne",
        description: "Payment for Order",
        image: "https://your-website.com/logo.png", // Your logo URL
        order_id: orderId,
        handler: function (response) {
            toastHot.success("Payment Successful ");
            paymentVerify( response, order); // Call the passed PaymentSuccess handler
        },
        prefill: {
            name: billingDetails.name,
            email: billingDetails.email,
            contact: billingDetails.phone,
        },
        notes: {
            address: billingDetails.address,
        },
        theme: {
            color: "#F37254",
        },
    };

    // Handle payment failure
    setPaymentLoader(false);
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
        console.error("Payment failed", response);
        toastHot.error("Payment failed. Please try again.");
    });

    // Open Razorpay checkout
    rzp1.open();
};

export default ProceedWithRazorpay;