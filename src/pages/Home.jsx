import React, { useEffect, useState } from 'react'
import { Container, BlogCard, Loader } from '../components'
import blogService from '../services/blogService'

const Home = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogService.getAllBlog([])
                if (response && response.documents) {
                    setBlogs(response.documents)
                }
            } catch (err) {
                setError('Failed to fetch blogs. Please try again later.')
                console.error('Error fetching blogs:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [])

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh]">
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full flex justify-center items-center min-h-[60vh]">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        )
    }

    return (
        <Container className="py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h1>
            
            {blogs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No blogs found. Be the first to create one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard 
                            key={blog.$id || blog.id}
                            title={blog.title}
                            content={blog.content}
                            author={blog.author || 'Anonymous'}
                            date={blog.createdAt || new Date().toISOString()}
                            id={blog.$id || blog.id}
                            image={blog.image}
                        />
                    ))}
                </div>
            )}
        </Container>
    )
}

export default Home