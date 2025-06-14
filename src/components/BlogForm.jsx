import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import blogServices from '../services/blogService';
import { Container, Input, Notification } from '../components';
import { FaImage } from 'react-icons/fa';

const BlogForm = ({ defaultValues = {}, onSubmitSuccess }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
    } = useForm({
        defaultValues: {
            title: defaultValues?.title || '',
            content: defaultValues?.content || '',
            image: null,
            postId: defaultValues?.$id || '',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [previewImage, setPreviewImage] = useState('');
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    // Watching file input
    const imageFile = watch('image');

    const getFilePreviewUrl = (fileID) => {
        try {
            return blogServices.filePreview(fileID);
        } catch (err) {
            console.error("Error getting file preview URL:", err);
            return '';
        }
    };

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            const objectUrl = URL.createObjectURL(file);
            setPreviewImage(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (defaultValues.coverImage) {
            const url = getFilePreviewUrl(defaultValues.coverImage);
            setPreviewImage(url);
        } else {
            setPreviewImage('');
        }
    }, [imageFile, defaultValues.coverImage]);

    const onSubmit = async (data) => {
        const toastId = Notification.loading("Publishing your blog...");
        setUploading(true);
        setError('');

        try {
            if (!userData?.$id) throw new Error('You must be logged in to submit a blog.');

            if (!defaultValues.coverImage && (!data.image || data.image.length === 0)) {
                throw new Error("Please upload a blog image.");
            }

            let imageId = defaultValues.coverImage || '';

            // Upload new image if selected
            if (data.image && data.image.length > 0) {
                const uploaded = await blogServices.uploadFile(data.image[0]);
                if (!uploaded?.$id) throw new Error('Image upload failed');

                imageId = uploaded.$id;

                // Delete old image if replaced
                if (defaultValues.coverImage && uploaded.$id !== defaultValues.coverImage) {
                    await blogServices.deleteFile(defaultValues.coverImage);
                }
            }

            const payload = {
                title: data.title,
                content: data.content,
                coverImage: imageId,
                userId: userData.$id,
                author: userData.name,
            };

            let result;
            if (defaultValues?.$id) {
                result = await blogServices.updateBlog(defaultValues.$id, payload);
            } else {
                result = await blogServices.createBlog(payload);
            }

            if (result) {
                reset();
                Notification.success(
                    defaultValues?.$id
                        ? "Blog updated successfully ✅"
                        : "Blog published successfully 🎉",
                    { id: toastId }
                );

                if (onSubmitSuccess) {
                    onSubmitSuccess();
                } else {
                    navigate(`/blog/${result.$id}`);
                }
            } else {
                throw new Error('Failed to save blog');
            }

        } catch (err) {
            Notification.error(err.message || "Something went wrong ", { id: toastId });
            setError(err.message || 'Something went wrong');
        } finally {
            setUploading(false);
        }
    };

    if (!userData) {
        return (
            <section className="min-h-[50vh] flex items-center justify-center px-4">
                <p className="text-lg text-gray-700">Please log in to write a blog.</p>
            </section>
        );
    }

    return (
        <Container className="py-4">
            <div className="mx-auto rounded-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                    {defaultValues.$id ? 'Update Blog' : 'Write an Amazing Blog'}
                </h2>

                {error && <p className="text-red-600 text-center mb-6">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-12">
                    {/* Image Upload Section */}
                    <div className="w-full lg:w-1/3 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Blog Image</h3>
                        <div className="border-3 border-dashed border-gray-300 bg-gray-100 rounded-xl h-[360px] flex items-center justify-center relative hover:bg-gray-200 transition">
                            <label
                                htmlFor="image"
                                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-600"
                            >
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="max-h-full max-w-full object-contain rounded-lg"
                                    />
                                ) : (
                                    <>
                                        <FaImage className="text-4xl mb-2" />
                                        <span className="text-sm font-medium">Click to upload image</span>
                                    </>
                                )}
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                {...register("image")}
                                className="hidden"
                            />
                        </div>
                        {imageFile?.[0]?.name && (
                            <p className="mt-3 text-sm text-gray-500 text-center">{imageFile[0].name}</p>
                        )}
                    </div>

                    {/* Blog Content Section */}
                    <div className="w-full lg:w-2/3 flex flex-col justify-center space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">Title</label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Amazing Blog Title"
                                className="w-full px-5 py-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                                {...register("title", { required: true })}
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-600 mb-2">Content</label>
                            <textarea
                                id="content"
                                {...register("content", { required: true })}
                                placeholder="Write something amazing..."
                                className="w-full px-5 py-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black h-100 md:h-80 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition font-semibold text-lg"
                        >
                            {uploading ? "Publishing..." : defaultValues.$id ? "Update Post" : "Publish Post"}
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default BlogForm;
