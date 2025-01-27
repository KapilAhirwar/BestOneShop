const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
          <div className="container mx-auto px-4">
            {/* <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h1> */}
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
              {/* Image Section */}
              <div className="lg:w-1/2">
                <img
                  src="https://via.placeholder.com/600x400" // Replace with your T-shirt business image
                  alt="Our Story"
                  className="rounded-lg shadow-lg"
                />
              </div>
    
              {/* Content Section */}
              <div className="lg:w-1/2">
                <p className="text-gray-700 text-lg mb-4">
                  Welcome to <strong>YourShop</strong>, where style meets comfort! We specialize in delivering premium-quality T-shirts that make you stand out. Our collection is designed to cater to every style and personality.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  At <strong>YourShop</strong>, we believe in sustainability and comfort. Each product is crafted with care, ensuring you receive the best experience. From trendy designs to custom prints, we’ve got you covered!
                </p>
                <p className="text-gray-700 text-lg">
                  Join us on our journey to redefine fashion and make a statement with your unique style. Thank you for supporting our small business!
                </p>
              </div>
            </div>
    
            {/* Mission Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Our Mission</h2>
              <p className="text-gray-700 text-center text-lg mx-auto max-w-2xl">
                To provide affordable, high-quality T-shirts that reflect individuality and inspire confidence. We are committed to sustainability and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      );
}

export default About;