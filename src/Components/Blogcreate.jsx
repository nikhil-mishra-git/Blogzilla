import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';

const Blogcreate = () => {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Post Created:', formData);
    };

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="max-w-[1350px] mx-auto bg-white border border-gray-200 shadow-sm rounded-xl p-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                    Create a New Blog Post
                </h2>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* LEFT SIDE: Image Upload */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Post Image</h3>
                        <div className="border-3 border-dashed border-gray-300 bg-gray-100 rounded-xl h-[360px] flex items-center justify-center relative hover:bg-gray-200 transition">
                            <label
                                htmlFor="image"
                                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-600"
                            >
                                {formData.image ? (
                                    <img
                                        src={URL.createObjectURL(formData.image)}
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
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                        {formData.image && (
                            <p className="mt-3 text-sm text-gray-500 text-center">{formData.image.name}</p>
                        )}
                    </div>

                    {/* RIGHT SIDE: Form Fields */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full lg:w-1/2 flex flex-col justify-center space-y-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Post Info</h3>

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Amazing Blog Title"
                                className="w-full px-5 py-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-600 mb-2">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="your-blog-slug"
                                className="w-full px-5 py-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-600 mb-2">Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write something amazing..."
                                className="w-full px-5 py-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black h-60 resize-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition font-semibold text-lg"
                        >
                            Publish Post
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Blogcreate;
