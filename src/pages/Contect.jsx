// const Contect = () => {
//     // return(
//     //     <div className="flex justify-center">
//     //         Contect page
//     //     </div>
//     // );
//     return (
//         <div className=" flex-col item-center w-full h-[50%] border-2">
//           {/* Header */}
//           {/* <header className="bg-blue-600 text-white py-4 w-[50%]">
//             <div className="container mx-auto text-center">
//               <h1 className="text-2xl font-bold">Contact Us</h1>
//             </div>
//           </header> */}
    
//           {/* Main Content */}
//           <main className="container mx-auto mt-8 px-4 w-[50%]">
//             <div className="container mx-auto text-center bg-blue-600 text-white rounded-md">
//               <h1 className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-2xl">Contact Us</h1>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
//               <p className="text-gray-600 mb-6">
//                 Have any questions or need assistance? Fill out the form below, and we’ll get back to you as soon as possible.
//               </p>
    
//               {/* Contact Form */}
//               <form className="space-y-4">
//                 {/* Name Field */}
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                     Your Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     required
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
    
//                 {/* Email Field */}
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Your Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     required
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
    
//                 {/* Message Field */}
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700">
//                     Your Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows="5"
//                     required
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   ></textarea>
//                 </div>
    
//                 {/* Submit Button */}
//                 <div>
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                   >
//                     Send Message
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </main>
//         </div>
//     );
// }

// export default Contect;


const Contect = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <main className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-blue-600">Contact Us</h1>
          <p className="text-gray-600">We’d love to hear from you!</p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contect;
