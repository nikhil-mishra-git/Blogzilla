import conf from "../Conf/conf";
import { Client, Account, ID } from "appwrite";

// Create a Class
class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userCreate = await this.account.create(ID.unique(), email, password, name);
            if (userCreate) {
                await this.loginAccount({ email, password });
            } else {
                return userCreate;
            }
        } catch (error) {
            throw error;
        }
    }

    async loginAccount({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async logOut() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const userGet = await this.account.get();
            if (userGet) return user;
        } catch (error) {
           console.log("Appwrite :: User Get Error : ",error);
        }

        return null;

    }
}


// Create a Object
const authService = new AuthService();
// Export Object Directly
export default authService;
