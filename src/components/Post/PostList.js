import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Có lỗi: ', error);
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${id}`);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Post List</h1>
            <div className="flex justify-end mb-4">
                <Link
                    to="/create/post"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Tạo bài viết
                </Link>
            </div>
            <ul className="space-y-4">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <li
                            key={post.id}
                            className="bg-white p-4 shadow-md rounded flex justify-between items-center"
                        >
                            <div className="p-4 bg-gray-100 rounded-md shadow-md">
                                <span className="block text-lg font-semibold text-blue-600 mb-2">{post.title}</span>
                                <span className="block text-md font-medium text-gray-800 mb-2">{post.views} views</span>
                                <span className="block text-sm font-normal text-gray-600">{post.description}</span>
                            </div>

                            <div className="flex space-x-2">
                                <Link
                                    to={`/update/${post.id}`}
                                    className="bg-yellow-400 text-white py-1 px-3 rounded hover:bg-yellow-500"
                                >
                                    Sửa
                                </Link>
                                <button
                                    onClick={() => deletePost(post.id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="bg-white p-4 shadow-md rounded text-center">Không có bài viết để hiển thị</li>
                )}
            </ul>
        </div>
    );
};

export default PostList;
