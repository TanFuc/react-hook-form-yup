import { Link, Route, Routes } from "react-router-dom";
import React from "react";
import LoginForm from "../../components/User/LoginForm";
import RegisterForm from "../../components/User/RegisterForm";

const Navbar = () => {
  return (
    <>
      <div className="bg-orange-400 min-h-screen font-bold">
        <nav className="p-4 fixed top-0 left-0 w-full z-10">
          <div className="container mx-auto flex justify-center items-center">
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-black focus:bg-green-400 focus:outline-none focus:ring-2 focus:ring-black-400 focus:ring-offset-2 px-3 py-2 rounded-md"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-black focus:bg-green-400 focus:outline-none focus:ring-2 focus:ring-black-400 focus:ring-offset-2 px-3 py-2 rounded-md"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </nav>

        <div className="pt-16">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Navbar;
