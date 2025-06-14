import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import blogServices from '../../services/blogService';
import { BlogCard, Container, Loader } from '../../components';

const SavedBlogs = () => {
    const userData = useSelector((state) => state.auth.userData);

    const [savedBlogs, setSavedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedBlogs = async () => {
            if (!userData?.$id) return;

            try {
                const allBlogsResponse = await blogServices.getAllBlog();
                const allBlogs = allBlogsResponse?.documents || [];

                const filtered = allBlogs.filter(blog => blog.savedBy?.includes(userData.$id));

                setSavedBlogs(filtered);
            } catch (err) {
                console.error('Error fetching saved blogs:', err);
                setError('Failed to load your saved blogs. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchSavedBlogs();
    }, [userData]);

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh] px-4">
                <Loader message="Loading your saved blogs..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh] px-4">
                <p className="text-red-500 text-lg text-center">{error}</p>
            </div>
        );
    }

    return (
        <div className="py-8 w-full max-w-[1400px] mx-auto">
            <header className="max-w-3xl mx-auto mb-10 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-700">Your Saved Blogs</h1>
                <p className="text-gray-500 text-sm mt-2">Blogs you have saved to read later</p>
            </header>

            {savedBlogs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        You haven’t saved any blogs yet. Explore and save your favorite posts!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...savedBlogs].reverse().map((blog) => (
                        <BlogCard key={blog.$id} {...blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedBlogs;
