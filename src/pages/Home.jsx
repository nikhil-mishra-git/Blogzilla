import React, { useEffect, useState } from 'react'
import { Container, BlogCard, Loader, HeroBanner, BlogCardSkeleton, HeroBannerSkeleton } from '../components'
import blogServices from '../services/blogService'
import { AiOutlineDownload } from "react-icons/ai";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [heroBlog, setHeroBlog] = useState(null);

    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogServices.getAllBlog([]);
                if (response && response.documents) {
                    const allBlogs = response.documents;
                    setBlogs(allBlogs);

                    if (allBlogs.length > 0) {
                        const randomIndex = Math.floor(Math.random() * allBlogs.length);
                        setHeroBlog(allBlogs[randomIndex]);
                    }
                }
            } catch (err) {
                setError('Failed to fetch blogs. Please try again later.');
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-[80vh] px-6 py-10">
                <HeroBannerSkeleton />
                <div className="text-center text-gray-500 text-lg mb-6">
                    Fetching latest blog posts...
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <BlogCardSkeleton key={index} />
                    ))}
                </div>
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

    const filteredBlogs = blogs.filter((b) => b.$id !== heroBlog?.$id);
    const visibleBlogs = filteredBlogs.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    return (
        <>
            {heroBlog && <HeroBanner blog={heroBlog} />}

            <Container className="py-8">
                <header className="max-w-3xl mx-auto mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-700 my-4">
                        Latest Blog Posts
                    </h1>
                    <p className="text-gray-600 text-xs md:text-l text-center">
                        Discover fresh insights and stories from our talented authors.
                    </p>
                </header>

                {visibleBlogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No blogs found. Be the first to create one!
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleBlogs.map((blog) => (
                                <BlogCard key={blog.$id} {...blog} />
                            ))}
                        </div>

                        {visibleCount < filteredBlogs.length && (
                            <div className="flex justify-center my-10">
                                <button
                                    onClick={handleLoadMore}
                                    className="flex items-center gap-2 px-6 py-2 cursor-pointer border-2 border-black text-black bg-white rounded-md hover:bg-black hover:text-white transition duration-300"
                                >
                                    Load More <AiOutlineDownload />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </>
    );
};

export default Home;
