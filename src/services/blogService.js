import { Client, Storage, ID, Databases, Query } from "appwrite";
import conf from '../config/conf'

export class BlogService {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createBlog({ title, content, coverImage, userId, author }) {
        try {

            const blogCreated = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    coverImage,
                    userId,
                    author
                }
            )

            return blogCreated ? blogCreated : null;


        } catch (error) {
            console.error("Appwrite service :: createBlog :: error", error);
            return null;
        }
    }

    async updateBlog(blogID, { title, content, coverImage }) {
        try {

            const blogUpdated = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                blogID,
                {
                    title,
                    content,
                    coverImage
                }
            )

            return blogUpdated ? blogUpdated : null

        } catch (error) {
            console.error("Appwrite service :: updateBlog :: error", error);
            return null;
        }
    }

    async deleteBlog(blogID) {
        try {

            const blogDeleted = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                blogID
            )

            return blogDeleted ? true : null

        } catch (error) {
            console.error("Appwrite service :: Delete Blog :: error", error);
            return null;
        }
    }

    async getBlog(blogID) {
        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                blogID
            )

        } catch (error) {
            console.error("Appwrite service :: Get Blog :: error", error);
            return null;
        }
    }

    async getAllBlog() {
        try {

            const getAllBlog = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.orderDesc('$createdAt')]
            )

            return getAllBlog ? getAllBlog : null

        } catch (error) {
            console.error("Appwrite service :: Get AllBlog :: error", error);
            return null;
        }
    }

    // File Related

    async uploadFile(file) {
        try {
            const uploadedFile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return uploadedFile;
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return null;
        }
    }

    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileID);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    filePreview(fileID) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileID);
        } catch (error) {
            console.log("Appwrite service :: filePreview :: error", error);
            return null;
        }
    }

}

const blogServices = new BlogService();
export default blogServices;
