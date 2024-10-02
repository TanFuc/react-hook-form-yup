import apiLocal from "../../api/apiLocal";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ListUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await apiLocal.get("/posts");
      setUsers(response.data);
    } catch (error) {
      console.error("Có lỗi: ", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await apiLocal.delete(`/posts/${id}`);
      setUsers(users.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-400 to-blue-500 min-h-screen p-8">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          Danh sách người dùng
        </h1>
        <div className="flex justify-end mb-6">
          <Link
            to="/register"
            className="bg-gradient-to-r from-green-400 to-green-500 text-white py-3 px-6 rounded-lg shadow hover:from-green-500 hover:to-green-600 transition-all"
          >
            Đăng ký người dùng mới
          </Link>
        </div>
        <div className="overflow-x-auto">
          <ul className="space-y-6">
            {users.length > 0 ? (
              users.map((post) => (
                <li
                  key={post.id}
                  className="bg-white p-6 shadow-lg rounded-md flex justify-between items-center transition-transform transform hover:-translate-y-2"
                >
                  <div>
                    <span className="block text-xl font-bold text-indigo-600 mb-1">
                      Tên người dùng: {post.username}
                    </span>
                    <span className="block text-md text-gray-700">
                      Gmail: {post.email}
                    </span>
                    <span className="block text-sm text-gray-500">
                      Mật khẩu: {post.password}
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      to={`/update/${post.id}`}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition-all"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => deleteUser(post.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition-all"
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center bg-gray-100 p-6 rounded-md shadow">
                Không có người dùng để hiển thị
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
