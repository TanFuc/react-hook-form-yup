import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [views, setViews] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/posts/${id}`);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setViews(response.data.views);
        } catch (error) {
            console.error('Có lỗi khi lấy bài viết:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:5000/posts/${id}`, { title, description, views });

            } else {
                await axios.post('http://localhost:5000/posts', { title, description, views });
            }
            navigate('/posts');
        } catch (error) {
            console.error('Có lỗi khi lưu bài viết:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">{id ? 'Chỉnh sửa bài viết' : 'Tạo bài viết'}</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Tiêu đề:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Mô tả:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Lượt xem:</label>
                    <input
                        type="number"
                        value={views}
                        onChange={(e) => setViews(Number(e.target.value))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 text-white font-semibold rounded ${id ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {id ? 'Cập nhật' : 'Tạo mới'}
                </button>
            </form>
        </div>
    );
};

export default PostForm;
