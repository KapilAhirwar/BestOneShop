import React, { useState } from "react";
import { useAppContext } from "../../useContextHook/context";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductDetailsPage = () => {
  const { products, addToCart } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  let product = location.state?.product;

  const productSize = product?.size[0].split(',');
  const productColor = product?.color[0].split(',');
  // console.log("item page -> ", product);
  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleProductDetail = (post) => {
    navigate("/ProductDetail", { state: { product: post }, replace: true });
  };

  if (!product) {
    return <div className="text-center mt-10">Product not found!</div>;
  }

  const relatedProducts = products.filter((item) => item._id !== product._id);

  // const handleAddToCart = () => {
  //   // Logic to add the product to the cart (could be saving to context or redux)
  //   console.log("color : ",selectedColor, "size : ",selectedSize);
  //   if(selectedColor.length != 0 || selectedSize.length != 0 ){
  //     addToCart(product);
  //     toast.success("Item added to Cart");
  //   }else{
  //     alert("Select Product Color and Size");
  //   }
  //   console.log("Product added to cart", { selectedColor, selectedSize });
  // };

  // const handleAddToCart = () => {
  //   if(selectedColor && selectedSize){
  //     addToCart(product,selectedColor,selectedSize);
  //     toast.success("Item added to Cart");
  //   } else {
  //     alert("Select Product Color and Size");
  //   }
  //   // console.log("Product added to cart", { selectedColor, selectedSize });
  // };

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("Select Product Color and Size");
      return;
    }

    try {
      setLoading(true); // disable button
      await addToCart(product, selectedColor, selectedSize); 
      toast.success("Item added to Cart");
    } catch (err) {
      toast.error("Failed to add item");
    } finally {
      setLoading(false); // enable button again
    }
  };


  // const handleColorSelection = (color) => {
  //   if (selectedColor.includes(color)) {
  //     setSelectedColor(selectedColor.filter(c => c !== color)); // Deselect color
  //   } else {
  //     setSelectedColor([...selectedColor, color]); // Select color
  //   }
  // };

  // const handleSizeSelection = (size) => {
  //   if (selectedSize.includes(size)) {
  //     setSelectedSize(selectedSize.filter(s => s !== size)); // Deselect size
  //   } else {
  //     setSelectedSize([...selectedSize, size]); // Select size
  //   }
  // };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Product Details Section */}
      <div className="flex flex-col p-5 lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        {/* Product Image Section */}
        <div className="w-full lg:w-1/2 bg-white">
          <div className="relative">
            {/* Main Image */}
            <img
              src={mainImage}
              alt={product.name}
              className="object-cover w-[80%] h-full border border-gray-300"
            />
          </div>

          {/* Small Images */}
          <div className="flex mt-4 space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - ${index}`}
                className={`w-[15%]  cursor-pointer border-2 rounded-lg ${
                  mainImage === image
                    ? "border-blue-600"
                    : "border-gray-300 hover:border-blue-400"
                }`}
                onClick={() => setMainImage(image)} // Update main image on click
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Color Selection */}
          {/* <div className="mb-4">
            <span className="text-gray-500 font-medium">Color: </span>
            <div className="flex gap-5 ml-7 mt-4">
              {productColor?.map((color, index) => (
                <div key={index} className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={color}
                    checked={selectedColor.includes(color)}
                    onChange={() => handleColorSelection(color)}
                    className="mr-2"
                  />
                  <label htmlFor={color} className="text-gray-800">{color}</label>
                </div>
              ))}
            </div>
          </div> */}
          <div className="mb-4">
            <span className="text-gray-500 font-medium">Color: </span>
            <div className="flex gap-5 ml-7 mt-4">
              {productColor?.map((color, index) => (
                <div key={index} className="flex items-center justify-center">
                  <input
                    type="radio"
                    name="productColor"
                    id={color}
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="mr-2"
                  />
                  <label htmlFor={color} className="text-gray-800">{color}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {/* <div className="mb-4">
            <span className="text-gray-500 font-medium">Size: </span>
            <div className="flex gap-5 ml-7 mt-4">
              {productSize?.map((size, index) => (
                <div key={index} className="flex ">
                  <input
                    type="checkbox"
                    id={size}
                    checked={selectedSize.includes(size)}
                    onChange={() => handleSizeSelection(size)}
                    className="mr-2"
                  />
                  <label htmlFor={size} className="text-gray-800">{size}</label>
                </div>
              ))}
            </div>
          </div> */}
          <div className="mb-4">
            <span className="text-gray-500 font-medium">Size: </span>
            <div className="flex gap-5 ml-7 mt-4">
              {productSize?.map((size, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="productSize"
                    id={size}
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                    className="mr-2"
                  />
                  <label htmlFor={size} className="text-gray-800">{size}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-gray-500 font-medium">Price: </span>
            <span className="text-lg font-bold text-green-600">${product.price}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            // className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            disabled={loading}  // disable when loading
            className={`w-full px-4 py-2 font-medium rounded-lg 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Selected Colors and Sizes */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Selected Colors and Sizes</h2>

        {/* Selected Colors */}
        {/* <div className="mb-6">
          <h3 className="text-lg font-semibold">Colors:</h3>
          <div className="grid grid-cols-4 gap-4">
            {selectedColor.length > 0 ? (
              selectedColor.map((color, index) => (
                <div key={index} className="flex items-center justify-center border p-2 rounded-lg">
                  <span className="text-gray-800">{color}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No colors selected</p>
            )}
          </div>
        </div> */}

        {/* Selected Sizes */}
        {/* <div>
          <h3 className="text-lg font-semibold">Sizes:</h3>
          <div className="grid grid-cols-4 gap-4">
            {selectedSize.length > 0 ? (
              selectedSize.map((size, index) => (
                <div key={index} className="flex items-center justify-center border p-2 rounded-lg">
                  <span className="text-gray-800">{size}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No sizes selected</p>
            )}
          </div>
        </div> */}
      </div>

      {/* Related Products Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.map((item) => (
            <div
              key={item._id}
              onClick={() => handleProductDetail(item)}
              className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="object-cover h-40 w-full"
              />
              <div className="p-3">
                <h3 className="text-sm font-bold text-gray-800 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
