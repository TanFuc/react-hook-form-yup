import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
});

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/login', data);
            alert('Đăng nhập thành công');
        } catch (error) {
            alert('Đăng nhập thất bại');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        {...register('email')}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-red-500 text-sm">{errors.email?.message}</p>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">Mật khẩu</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-red-500 text-sm">{errors.password?.message}</p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
