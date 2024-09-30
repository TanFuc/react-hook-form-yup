import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts/');
            setProducts(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

    const handleSuccess = () => {
        fetchProducts();
        setSelectedProduct(null);
    };

    return (
        <div className="container mx-auto py-8">
            <ProductForm selectedProduct={selectedProduct} onSuccess={handleSuccess} />
            <ul className="mt-8 space-y-4">
                {products.map(product => (
                    <li key={product.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm">
                        <div className="p-4 bg-gray-100 rounded-md shadow-md">
                            <span className="block text-lg font-semibold text-blue-600 mb-2">{product.title}</span>
                            <span className="block text-md font-medium text-gray-800 mb-2">{product.views} views</span>
                            <span className="block text-sm font-normal text-gray-600">{product.description}</span>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => setSelectedProduct(product)} className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition duration-200">
                                Chỉnh sửa
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200">
                                Xóa
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
