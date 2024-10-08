import { Link, Route, Routes } from "react-router-dom";
import React from "react";
import RegisterForm from "../../components/Register/RegisterForm";
import { ListUser } from "../../components/User/ListUser";
import { EditUser } from "../../components/User/EditUser";

const Navbar = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 to-blue-400 min-h-screen font-sans">
        <nav className="p-6 fixed top-0 left-0 w-full z-10 bg-opacity-90 backdrop-blur-lg shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-3xl font-extrabold text-white"></div>
            <div className="flex space-x-6">
              <Link
                to="/list"
                className="text-white hover:bg-white hover:text-blue-900 transition-all duration-300 px-4 py-2 rounded-md border border-white"
              >
                Danh sách
              </Link>
              <Link
                to="/register"
                className="text-white hover:bg-white hover:text-blue-900 transition-all duration-300 px-4 py-2 rounded-md border border-white"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </nav>

        <div className="pt-24">
          <Routes>
            <Route path="/list" element={<ListUser />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/update/:id" element={<EditUser />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Navbar;
