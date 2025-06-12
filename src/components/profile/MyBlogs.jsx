import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import blogServices from '../../services/blogService';
import { BlogCard, Container, Loader } from '../../components';

const MyBlogs = () => {
    const userData = useSelector((state) => state.auth.userData);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            if (!userData?.$id) return;

            try {
                const userBlogs = await blogServices.getUserBlogs(userData.$id);
                setBlogs(userBlogs);
            } catch (err) {
                console.error('Error fetching user blogs:', err);
                setError('Failed to load your blogs. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, [userData]);

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh]">
                <Loader message="Loading your blogs..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh]">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <Container className="py-8">
            <header className="max-w-3xl mx-auto mb-12 text-center">
                <h1 className="text-3xl font-bold text-zinc-700 my-4">Your Blog Posts</h1>
                <p className="text-gray-600 text-base">
                    These are all the blogs you've created under your account.
                </p>
            </header>

            {blogs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        You haven’t created any blogs yet. Time to write something awesome!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.$id} {...blog} />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default MyBlogs;
