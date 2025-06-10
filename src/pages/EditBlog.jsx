import React, { useEffect, useState } from 'react'
import { Container, BlogForm } from '../components'
import blogServices from '../services/blogService'
import { useNavigate, useParams } from 'react-router-dom'

const EditBlog = () => {

    const [blog, setBlog] = useState(null)
    const { blogId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (blogId) {
            blogServices.getBlog(blogId)
                .then((blog) => {
                    if (blog) {
                        setBlog(blog)
                    }
                })
        } else {
            navigate('/')
        }
    }, [blogId, navigate])


    return blog ? (
        <div className='py-8'>
            <Container>
                <BlogForm blog={blog}/>
            </Container>
        </div>
    ) : null
    
}

export default EditBlog