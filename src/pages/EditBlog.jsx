import React, { useEffect, useState } from 'react'
import { Container, BlogForm } from '../components'
import blogServices from '../services/blogService'
import { useNavigate, useParams } from 'react-router-dom'

const EditBlog = () => {

    const [blog, setBlog] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            blogServices.getBlog(id)
                .then((blog) => {
                    if (blog) {
                        setBlog(blog)
                    }
                })
        } else {
            navigate('/')
        }
    }, [id, navigate])


    return blog ? (
        <div className='py-8'>
            <Container>
                <BlogForm defaultValues={{ ...blog }} />
            </Container>
        </div>
    ) : null;


}

export default EditBlog