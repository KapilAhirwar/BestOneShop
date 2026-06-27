import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../useContextHook/context';

const EditProduct = ({ onClose, Data, Edit }) => {
    const {deleteProductImage, EditProductData, GetProduct, GetAdminProduct} = useAppContext();
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
    images: [], // Existing images
  });

  const [newImages, setNewImages] = useState([]); // Newly added images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Populate product data when component mounts
  useEffect(() => {
    if (Data) {
      setProduct({
        name: Data.name || '',
        description: Data.description || '',
        price: Data.price || '',
        stock: Data.stock || '',
        category: Data.category || '',
        size: Data.size || [],
        color: Data.color || [],
        material: Data.material || '',
        tags: Data.tags || '',
        images: Data.images || [],
      });
    }
  }, [Data]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle multiple sizes
  const handleSizeChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      size: e.target.value.split(',').map((size) => size.trim()),
    }));
  };

  const handleColorChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      color: e.target.value.split(',').map((color) => color.trim()),
    }));
  };

  // Handle removing an image
  const handleRemoveImage = async(index,image) => {
    console.log("delete image -> ", image, Data._id);
    await deleteProductImage(Data._id,image);

    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle new image uploads
  const handleNewImageUpload = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('category', product.category);
    formData.append('size', product.size.join(','));
    formData.append('color', product.color.join(','));
    formData.append('material', product.material);
    formData.append('tags', product.tags);

    // Add remaining images
    product.images.forEach((image, index) => {
      formData.append(`existingImages[${index}]`, image);
    });

    // Add new images
    newImages.forEach((image, index) => {
      formData.append(`productImages`, image);
    });

    // for (const [key, value] of formData.entries()) {
    //   if (key === 'productImages') {
    //     console.log(key, value.name); // File object ka naam dikhayega
    //   } else {
    //     console.log(key, value); // Normal string values dikhayega
    //   }
    // }

    try {
      // Make API call to update product
      await EditProductData(formData,Data._id);
      await GetProduct();
      await GetAdminProduct();
      setLoading(false);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to update product');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto flex flex-col bg-gray-200 rounded-[1rem] m-[1rem]">

      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <button onClick={onClose} className="text-red-500 text-lg">
          <FaTimes />
        </button>
      </div>

      {/* {error && <p className="text-red-500 mb-3">{error}</p>} */}
        <div className='overflow-y-auto h-full w-[100%]'>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <label className="block mb-1">Name</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div>
                <label className="block mb-1">Description</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div>
                <label className="block mb-1">Price</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div>
                <label className="block mb-1">Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div>
                <label className="block mb-1">Category</label>
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div>
                <label className="block mb-1">Sizes (comma-separated)</label>
                <input
                    type="text"
                    name="size"
                    value={product.size.join(', ')}
                    onChange={handleSizeChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div>
                <label className="block mb-1">Colors (comma-separated)</label>
                <input
                    type="text"
                    name="color"
                    value={product.color.join(', ')}
                    onChange={handleColorChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div>
                <label className="block mb-1">Material</label>
                <input
                    type="text"
                    name="material"
                    value={product.material}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div>
                <label className="block mb-1">Tags</label>
                <input
                    type="text"
                    name="tags"
                    value={product.tags}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
                </div>
                <div>
                <label className="block mb-1">Images</label>
                <div className="flex space-x-2">
                    {product.images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image} alt="product" className="w-16 h-16 object-cover" />
                        <button
                        type="button"
                        className="absolute top-0 right-0 text-red-500 bg-white rounded-full"
                        onClick={() => handleRemoveImage(index,image)}
                        >
                        <FaTimes />
                        </button>
                    </div>
                    ))}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleNewImageUpload}
                    className="mt-2"
                />
                </div>
                <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default EditProduct;
