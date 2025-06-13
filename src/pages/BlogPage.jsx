import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import blogServices from "../services/blogService";
import { Container, Notification, Loader } from "../components";
import { FaArrowLeft, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [post, setPost] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

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
        <div className="relative max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
          <img
            src={blogServices.filePreview(post.coverImage)}
            alt="Blog Cover"
            className="w-full h-full object-cover"
          />

          {/* Author and Date */}
          <div className="bg-gray-100 px-6 py-3 flex justify-between items-center text-sm text-gray-700 font-medium">
            <span>
              By: <span className="font-semibold">{post.author}</span>
            </span>
            <span>
              {new Date(post.$createdAt).toLocaleDateString("en-IN")}
            </span>
          </div>

          {/* Menu button */}
          {isAuthor && (
            <div className="absolute top-4 right-4 z-10 ">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition cursor-pointer"
              >
                <FaEllipsisV />
              </button>
              {showMenu && (
                <div className="mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md absolute right-0 z-20">
                  <Link
                    to={`/editblog/${post.$id}`}
                    className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100 text-blue-700"
                  >
                    <FaEdit />
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100 text-red-600"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Blog Content */}
          <div className="px-6 py-8 space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-800">{post.title}</h1>
            <p className="text-l md:text-lg text-justify leading-relaxed text-zinc-800 whitespace-pre-line">
              {post.content}
            </p>
          </div>
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
