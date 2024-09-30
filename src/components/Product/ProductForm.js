import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const schema = yup.object().shape({
    name: yup.string().required('Tên sản phẩm là bắt buộc'),
    price: yup.number().required('Giá sản phẩm là bắt buộc').positive('Giá phải lớn hơn 0').typeError(`Giá sản phẩm phải là một số`).integer('Giá sản phẩm phải là số nguyên dương'),
});

const ProductForm = ({ selectedProduct, onSuccess }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            price: '',
        },
    });

    useEffect(() => {
        if (selectedProduct) {
            reset(selectedProduct);
        }
    }, [selectedProduct, reset]);

    const onSubmit = async (data) => {
        try {
            if (selectedProduct) {
                await axios.put(`http://localhost:5000/posts/${selectedProduct.id}`, data);
            } else {
                await axios.post('http://localhost:5000/posts/', data);
            }
            onSuccess();
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                <input {...register('name')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
                <input type="number" {...register('price')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                {selectedProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
            </button>
        </form>
    );
};

export default ProductForm; 
