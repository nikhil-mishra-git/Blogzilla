import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaImage } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import blogServices from '../services/blogService'
import { useSelector } from 'react-redux'

const BlogForm = ({ defaultValues = {}, onSubmitSuccess }) => {
    const [previewImage, setPreviewImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.userData)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: defaultValues.title || '',
            content: defaultValues.content || '',
            image: null,
        }
    })

    const imageFile = watch('image')

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0]
            setPreviewImage(URL.createObjectURL(file))
        }
    }, [imageFile])

    const onSubmit = async (data) => {
        setUploading(true)
        setError('')

        try {
            let imageUrl = defaultValues.coverImage || ''

            // Upload new image if selected
            if (data.image && data.image.length > 0) {
                const uploaded = await blogServices.uploadFile(data.image[0])
                if (!uploaded?.$id) throw new Error('Image upload failed')

                const previewUrl = blogServices.filePreview(uploaded.$id)
                imageUrl = previewUrl.URL
            }

            if (!imageUrl) {
                throw new Error('Cover image is required. Please upload one.')
            }

            // Prepare blog data
            const payload = {
                title: data.title,
                content: data.content,
                coverImage: imageUrl,
                userId: authStatus?.$id || 'anonymous'
            }

            let result
            if (defaultValues.$id) {
                result = await blogServices.updateBlog(defaultValues.$id, payload)
            } else {
                result = await blogServices.createBlog(payload)
            }

            if (result) {
                reset()
                if (onSubmitSuccess) {
                    onSubmitSuccess()
                } else {
                    navigate('/')
                }
            } else {
                throw new Error('Blog operation failed')
            }

        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setUploading(false)
        }
    }

    return (
        <section className="min-h-screen px-4 py-12">
            <div className="max-w-[1350px] mx-auto bg-white border border-gray-200 shadow-sm rounded-xl p-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                    {defaultValues.$id ? "Update Blog" : "Write an Amazing Blog"}
                </h2>

                {error && <p className="text-red-600 text-center mb-6">{error}</p>}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col lg:flex-row gap-12"
                >
                    {/* Image Upload */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Post Image</h3>
                        <div className="border-3 border-dashed border-gray-300 bg-gray-100 rounded-xl h-[360px] flex items-center justify-center relative hover:bg-gray-200 transition">
                            <label
                                htmlFor="image"
                                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-600"
                            >
                                {previewImage || defaultValues.coverImage ? (
                                    <img
                                        src={previewImage || defaultValues.coverImage}
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

                    {/* Blog Info */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Post Info</h3>

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">Title</label>
                            <input
                                id="title"
                                type="text"
                                {...register("title", { required: true })}
                                placeholder="Amazing Blog Title"
                                className="w-full px-5 py-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.title && <p className="text-sm text-red-500 mt-1">Title is required</p>}
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-600 mb-2">Content</label>
                            <textarea
                                id="content"
                                {...register("content", { required: true })}
                                placeholder="Write something amazing..."
                                className="w-full px-5 py-3 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black h-60 resize-none"
                            ></textarea>
                            {errors.content && <p className="text-sm text-red-500 mt-1">Content is required</p>}
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
        </section>
    )
}

export default BlogForm
