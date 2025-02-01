import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { useAppContext } from "../useContextHook/context";
import "./product.css"

const Home = () => {
  const { products, GetProduct } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      await GetProduct();
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();

    // Check if the screen is mobile or desktop
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <Spinner />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <p className="text-center text-gray-600 text-lg">No Data Found</p>
      </div>
    );
  }

  return (
    <div
      className="container"
    >
      {products.map((post) => (
        <div key={post._id}>
          <Product post={post} />
        </div>
      ))}
    </div>
  );
};

export default Home;
