import { Client, Account, ID } from "appwrite";
import conf from '../config/conf'

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createUser({ email, password, name }) {
        try {
            const userCreated = await this.account.create(ID.unique(), email, password, name)
            return userCreated ? await this.loginUser({ email, password }) : null;

        } catch (error) {
            console.log("Error while SignUp :: ", error);
        }
    }

    async loginUser({ email, password }) {
        try {
            const userLoginSession = await this.account.createEmailPasswordSession(email, password)
            return userLoginSession ? userLoginSession : null

        } catch (error) {
            console.log("Error while Login :: ", error);
        }
    }

    async logout() {
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Error while Logout :: ", error);
        }
    }

    async getUser() {
        try {
            const userData = await this.account.get();
            return userData ? userData : null;
        } catch (error) {
            console.log("Error while GetUser Data :: ", error);
        }
        return null;
    }

}

const authService = new AuthService();
export default authService