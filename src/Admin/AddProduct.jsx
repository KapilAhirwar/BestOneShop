import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../useContextHook/context';
import { FaTimes } from 'react-icons/fa';

const AddProduct = ({ onClose }) => {
  const { show, setShow, formData, addProduct, GetProduct } = useAppContext();
  const [loading, setLoading] = useState(false);
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    size: [],
    color: [],
    material: '',
    tags: '',
    images: [], // Array for storing multiple image URLs
  });

  const [imageFiles, setImageFiles] = useState([]); // Store multiple selected images
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle multiple sizes
  const handleSizeChange = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      size: value.split(',').map((size) => size.trim()), // Convert comma-separated string to array
    }));
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      color: value.split(',').map((color) => color.trim()), // Convert comma-separated string to array
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('category', product.category);
    formData.append('size', product.size.join(', ')); // Convert array to comma-separated string if needed
    formData.append('color', product.color);
    formData.append('material', product.material);
    formData.append('tags', product.tags);

    // Debug FormData
    for (const imageFile of imageFiles) {
      formData.append('productImages', imageFile);
    }

    // for (const [key, value] of formData.entries()) {
    //   if (key === 'productImages') {
    //     console.log(key, value.name); // File object ka naam dikhayega
    //   } else {
    //     console.log(key, value); // Normal string values dikhayega
    //   }
    // }

    // Form validation
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.stock ||
      !product.category ||
      !product.size.length ||
      !product.color ||
      !product.material ||
      !product.tags
    ) {
      setError('All fields are required.');
      return;
    }

    
    try {
      console.log("adding...");
      await addProduct();
      setLoading(false);
      await GetProduct();
      setProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        size: [],
        color: [],
        material: '',
        tags: '',
        images: [],
      });
      setImageFiles([]); // Clear the image files
      // setShow(false);
      onClose();
      console.log("added...");

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {show && (
        <div className="p-6 w-full max-w-4xl mx-auto flex flex-col bg-gray-200 rounded-[1rem] m-[1rem]">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <button className="text-bold" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Sizes (comma-separated)</label>
              <input
                type="text"
                name="size"
                value={product.size.join(', ')}
                onChange={handleSizeChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={product.color}
                onChange={handleColorChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Material</label>
              <input
                type="text"
                name="material"
                value={product.material}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Tags</label>
              <input
                type="text"
                name="tags"
                value={product.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Upload Images (multiple allowed)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImageFiles(e.target.files)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Adding Product..." : "Add Product"}              
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
