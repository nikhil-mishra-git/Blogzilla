import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import blogServices from "../services/blogService";
import { Container, Notification, Loader } from "../components";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";


const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [post, setPost] = useState(null);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (id) {
      blogServices.getBlog(id).then((data) => {
        if (data) setPost(data);
        else navigate("/not-found");
      });
    } else {
      navigate("/not-found");
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      const deleted = await blogServices.deleteBlog(post.$id);
      if (deleted) {
        await blogServices.deleteFile(post.coverImage);
        Notification.success("Blog deleted successfully!");
        navigate("/");
      } else {
        Notification.error("Failed to delete the blog.");
      }
    }
  };

  return (
    <Container className="py-12">
      {/* Back Button */}
      <div className="my-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-4 cursor-pointer rounded-full bg-gray-100 text-gray-800 hover:bg-zinc-200 text-sm font-medium transition"
        >
          <FaArrowLeft size={12} />
          Back
        </button>
      </div>

      {post ? (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Banner */}
          <img
            src={blogServices.filePreview(post.coverImage)}
            alt="Blog Cover"
            className="w-full h-full object-cover"
          />

          {/* Author Info */}
          <div className="bg-gray-100 px-6 py-3 flex justify-between text-sm text-gray-700 font-medium">
            <span>By : <span className="font-semibold">{post.author}</span></span>
            <span>Publish Date : {new Date(post.$createdAt).toLocaleDateString('en-IN')}</span>
          </div>

          {/* Post Content */}
          <div className="px-6 py-8 space-y-6">
            <h1 className="text-3xl font-bold text-zinc-800">{post.title}</h1>
            <p className="text-lg leading-relaxed text-zinc-800 whitespace-pre-line">
              {post.content}
            </p>
          </div>

          {/* Action Buttons */}
          {isAuthor && (
            <div className="flex border-t border-gray-200">

              <Link
                to={`/editblog/${post.$id}`}
                className="w-1/2 flex items-center justify-center py-4 cursor-pointer text-l font-semibold text-blue-800 hover:bg-blue-500 hover:text-white transition"
              >
                <FaEdit size={20} className="mr-2" />
                Edit Post
              </Link>

              <button
                onClick={handleDelete}
                className="w-1/2 flex items-center justify-center py-4 cursor-pointer text-l font-semibold text-red-600 hover:bg-red-500 hover:text-white transition"
              >
                <FaTrash size={20} className="mr-2" />
                Delete Post
              </button>
            </div>
          )}

        </div>
      ) : (
        <div className="h-[60vh] flex items-center justify-center text-lg text-gray-500">
          <Loader message="Loading Blog.." />
        </div>
      )}
    </Container>
  );
};

export default BlogPage;
