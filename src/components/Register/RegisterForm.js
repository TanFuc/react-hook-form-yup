import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiLocal from "../../api/apiLocal";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập tên đăng nhập"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: yup
      .string()
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .max(20, "Mật khẩu tối đa 20 ký tự")
      .required("Vui lòng nhập mật khẩu"),
    confirmPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu xác thực")
      .oneOf([yup.ref("password"), null], "Mật khẩu xác thực không khớp"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const response = await apiLocal.post("/posts", userData);
      alert("Đăng ký thành công");
      reset();
    } catch (error) {
      alert("Đăng ký thất bại");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Tên đăng nhập</label>
          <input
            {...register("username")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            {...register("email")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Xác nhận mật khẩu</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
