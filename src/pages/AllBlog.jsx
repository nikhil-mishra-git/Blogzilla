import React, { useEffect, useState } from 'react'
import blogService from '../services/blogService'
import { Container, BlogCard } from '../components'

const AllBlog = () => {

    const [blogs, setBlogs] = useState([])
    useEffect(() => {}, [])

    blogService.getAllBlog([])
        .then((blog) => {
            blog ? setBlogs(blog.documents) : null
        })

    return (
        <div className='py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {blogs.map((blog) => (
                        <div key={blog.$id} className='p-2 w-1/4'>
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllBlog