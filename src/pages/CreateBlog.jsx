import React, { useState, useEffect } from 'react';
import { Container, BlogForm, Loader } from '../components';

const CreateBlog = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader message='Loading Blog Form..' /></div>;

    return (
        <div className="py-8">
            <Container>
                <BlogForm />
            </Container>
        </div>
    );
};

export default CreateBlog;
