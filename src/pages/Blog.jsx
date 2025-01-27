const Blog = () => {
    const blogs = [
        {
          id: 1,
          title: "Top 10 T-Shirt Styling Tips for 2025",
          description: "Discover how to style your T-shirts to look trendy and chic this season.",
          image: "https://via.placeholder.com/400x250", // Replace with real image URLs
          link: "/blog/top-10-t-shirt-styling-tips",
        },
        {
          id: 2,
          title: "Sustainability in Fashion: Our Commitment",
          description: "Learn how YourShop is contributing to sustainable fashion practices.",
          image: "https://via.placeholder.com/400x250",
          link: "/blog/sustainability-in-fashion",
        },
        {
          id: 3,
          title: "How to Customize Your T-Shirts with Unique Designs",
          description: "A step-by-step guide to creating custom T-shirts for yourself or your business.",
          image: "https://via.placeholder.com/400x250",
          link: "/blog/customize-your-tshirts",
        },
      ];
    
      return (
        <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
          <div className="container mx-auto px-4">
            {/* <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Blogs</h1> */}
            
            {/* Blog List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                    <p className="text-gray-600 mt-2">{blog.description}</p>
                    <a
                      href={blog.link}
                      className="text-blue-500 hover:underline mt-4 inline-block"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default Blog;