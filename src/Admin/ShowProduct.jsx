import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useAppContext } from '../useContextHook/context';
import AddProduct from './AddProduct';
import Modal from './Modal';
import EditProduct from './EditProduct';

const ShowProducts = () => {
    const { show, setShow, ProductDelete, adminProducts } = useAppContext();
    const [editProduct, setEditProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);


    const handleDelete = async(id) => {
        await ProductDelete(id);
        // deleteProduct(id);
    };

    const handleEdit = (product) => {
        setIsEditOpen(true);
        setShow(true);
        setEditProduct(product);
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
        setShow(false);
    }


    const handleAddProductClick = () => {
        setIsModalOpen(true);
        setShow(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setShow(false);
    };

    return (
        <div className="p-6 w-full">
            {!show && (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
                    <button
                        onClick={handleAddProductClick}
                        className="px-4 py-2 bg-blue-500 text-white rounded mb-4 inline-block"
                    >
                        Add Product
                    </button>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-center">Photo</th>
                                    <th className="py-2 px-4 border-b text-center">Name</th>
                                    <th className="py-2 px-4 border-b text-center">Category</th>
                                    <th className="py-2 px-4 border-b text-center">Price</th>
                                    <th className="py-2 px-4 border-b text-center">Stock</th>
                                    <th className="py-2 px-4 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminProducts.map((product) => (
                                    <tr key={product._id} className="text-center">
                                        <td className="py-2 px-2 border-b flex justify-center items-center">
                                            <img src={`${product.images[0]}`} width="60px" alt={product.name} />
                                        </td>
                                        <td className="py-2 px-4 border-b">{product.name}</td>
                                        <td className="py-2 px-4 border-b">{product.category}</td>
                                        <td className="py-2 px-4 border-b">RS. {product.price}</td>
                                        <td className="py-2 px-4 border-b">{product.stock}</td>
                                        <td className="py-2 px-4 border-b">
                                            <div className='flex justify-center items-center gap-4'>
                                                <button
                                                    className="text-blue-500"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    <FaEdit className="w-[2rem] h-[1.5rem]" />
                                                </button>
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    <FaTrashAlt className="w-[2rem] h-[1.5rem]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal for adding product */}
            {isModalOpen && (
                <Modal>
                    <AddProduct onClose={handleCloseModal} />
                </Modal>
            )}
            {isEditOpen && (
                <Modal>
                    <EditProduct onClose={handleCloseEdit} Data={editProduct} Edit={setEditProduct} />
                </Modal>
            )}
        </div>
    );
};

export default ShowProducts;
