import React, { useEffect, useState } from "react";
import { useAppContext } from "../useContextHook/context";

const ManageUsers = () => {
  const { getUsers, editUser, deleteUser } = useAppContext();
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, [getUsers]);

  // Handle user edit
  const handleEdit = async (userId) => {
    const updatedData = {
      name: prompt("Enter new name:"),
      email: prompt("Enter new email:"),
      role: prompt("Enter new role (user/admin):"),
    };

    if (updatedData.name && updatedData.email && updatedData.role) {
      const updatedUser = await editUser(userId, updatedData);
      if (updatedUser) {
        setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));
      }
    }
  };

  // Handle user delete
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Manage Users</h1>
      <p className="text-gray-600 mb-6">View, edit, or remove users.</p>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm uppercase font-medium">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 px-6 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
