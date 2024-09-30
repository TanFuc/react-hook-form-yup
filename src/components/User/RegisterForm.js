import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    username: yup.string().required('Vui lòng nhập tên đăng nhập'),
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
    captcha: yup.string()
        .required('Vui lòng nhập mã xác nhận')
        .oneOf(['12345'], 'Mã xác nhận không đúng'),
});

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/register', data);
            alert('Đăng ký thành công');
        } catch (error) {
            alert('Đăng ký thất bại');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700">Tên đăng nhập</label>
                    <input
                        {...register('username')}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-red-500 text-sm">{errors.username?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        {...register('email')}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-red-500 text-sm">{errors.email?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Mật khẩu</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <p className="text-red-500 text-sm">{errors.password?.message}</p>

                </div>


                <div className='mb-4'>
                    <label className='block text-gray-700'>Xác nhận mật khẩu</label>
                    <input type='password' {...register('confirmpassword')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <p className="text-red-500 text-sm">{errors.password?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Mã xác nhận (12345)</label>
                    <input {...register('captcha')} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <p className="text-red-500 text-sm">{errors.captcha?.message}</p>
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
