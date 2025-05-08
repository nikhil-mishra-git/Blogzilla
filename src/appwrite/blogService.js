import conf from "../Conf/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class BlogServices {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create a new blog post
    async createBlog({ title, content, postImage, userId }) {
        try {
            const blogCreated = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    postImage,
                    userId,
                }
            );
            return blogCreated;
        } catch (error) {
            console.error("Appwrite service :: createBlog :: error", error);
            return null;
        }
    }

    // Update an existing blog post
    async updateBlog(blogID, { title, content, postImage }) {
        try {
            const updatedBlog = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                blogID,
                {
                    title,
                    content,
                    postImage,
                }
            );
            return updatedBlog;
        } catch (error) {
            console.error("Appwrite service :: updateBlog :: error", error);
            return null;
        }
    }

    // Delete a blog post
    async deleteBlog(blogID) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                blogID
            );
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteBlog :: error", error);
            return false;
        }
    }

    // Get a single blog post by ID
    async getOneBlog(blogID) {
        try {
            const blog = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                blogID
            );
            return blog;
        } catch (error) {
            console.error("Appwrite service :: getOneBlog :: error", error);
            return null;
        }
    }

    // Get all Post
    async getAllBlog() {
        try {
            const blogs = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.orderDesc("$createdAt")]
            );
            return blogs;
        } catch (error) {
            console.error("Appwrite service :: getAllBlog :: error", error);
            return null;
        }
    }


    // File Services

    async uploadImage(file) {
        try {

            const uploadedImage = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

            return uploadedImage;

        } catch (error) {
            console.error("Appwrite service :: getAllBlog :: error", error);
            return false;
        }
    }

    async deleteImage(imageID) {
        try {

            const deletedImage = await this.bucket.deleteFile(
                conf.appwriteBucketId,
                imageID
            )

            return true

        } catch (error) {
            console.error("Appwrite service :: deleteImage :: error", error);
            return false;
        }
    }

    async getImagePrev(imageID) {
        const prevImage = this.bucket.getFilePreview(
            conf.appwriteBucketId,
            imageID
        )

        return prevImage;

    }

}

const blogService = new BlogServices();
export default blogService;
