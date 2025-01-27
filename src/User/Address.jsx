import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../useContextHook/context";

const AddressManager = ({ onClose }) => {
  const {
    addresses,
    loading,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
  } = useAppContext();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district:"",
    state: "",
    country: "India",
    landmark: "",
    isDefault: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      pincode: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      district:"",
      state: "",
      country: "India",
      landmark: "",
      isDefault: false,
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateAddress(editId, formData);
        toast.success("Address updated successfully!");
      } else {
        const newAddress = await addAddress(formData);
        toast.success("Address added successfully!");
      }
      resetForm();
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setDeletingId(id);
      try {
        await deleteAddress(id);
        toast.success("Address deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete address. Please try again.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleEdit = (address) => {
    setIsEditing(true);
    setEditId(address._id);
    setFormData(address);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    //bg-white shadow-md rounded-md
    <div className="p-4  w-[90%] mx-auto">
        <div className="bg-white w-[100%] p-4 shadow-md rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Addresses</h1>
                <button onClick={onClose}>
                <FaTimes className="text-xl" />
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    name="addressLine1"
                    placeholder="Address Line 1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    name="addressLine2"
                    placeholder="Address Line 2 (Optional)"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    name="district"
                    placeholder="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark (Optional)"
                    value={formData.landmark}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                />
                <label className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    />
                    <span>Set as default address</span>
                </label>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                    isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                    } text-white px-4 py-2 rounded-md`}
                >
                    {isEditing ? (isSubmitting ? "Updating..." : "Update Address") : isSubmitting ? "Adding..." : "Add Address"}
                </button>
                </form>

                {/* Address List */}
                <div className="p-4 bg-white shadow-md rounded-md w-[100%] mx-auto">
                <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : addresses.length > 0 ? (
                    addresses.map((address) => (
                    <div key={address._id} className="border p-4 rounded-md mb-4">
                        <p>
                        <strong>Name:</strong> {address.fullName}
                        </p>
                        <p>
                        <strong>Phone:</strong> {address.phone}
                        </p>
                        <p>
                        <strong>Address:</strong> {address.addressLine1}, {address.addressLine2},{" "}
                        {address.city}, {address.state}, {address.pincode},{" "}
                        {address.country}
                        </p>
                        <p>
                        <strong>Landmark:</strong> {address.landmark}
                        </p>
                        <p>
                        <strong>Default:</strong> {address.isDefault ? "Yes" : "No"}
                        </p>
                        <div className="flex space-x-4 mt-2">
                        <button
                            onClick={() => handleEdit(address)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(address._id)}
                            disabled={deletingId === address._id}
                            className={`${
                            deletingId === address._id
                                ? "bg-red-300"
                                : "bg-red-500 hover:bg-red-600"
                            } text-white px-4 py-2 rounded-md`}
                        >
                            {deletingId === address._id ? "Deleting..." : "Delete"}
                        </button>
                        </div>
                    </div>
                    ))
                ) : (
                    <p>No addresses saved yet.</p>
                )}
                </div>
            </div>

        </div>
    </div>
  );
};

export default AddressManager;
