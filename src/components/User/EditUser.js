import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import apiLocal from "../../api/apiLocal";

export const EditUser = () => {
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập tên đăng nhập"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: yup
      .string()
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .max(20, "Mật khẩu tối đa 20 ký tự"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchUser = async () => {
    try {
      const res = await apiLocal.get(`/posts/${id}`);
      setValue("username", res.data.username);
      setValue("email", res.data.email);
      setValue("password", res.data.password);
    } catch {
      console.error("Có lỗi khi lấy user:", errors);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await apiLocal.put(`/posts/${id}`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      alert("Cập nhật thông tin thành công");
      navigate("/list");
    } catch (error) {
      alert("Cập nhật thông tin thất bại");
    }
  };

  const handleBack = () => {
    navigate("/list");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Cập nhật thông tin
      </h2>
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Cập nhật
        </button>
      </form>

      <button
        onClick={handleBack}
        className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
      >
        Trở về
      </button>
    </div>
  );
};
