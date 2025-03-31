import axios from "axios";

class UsersService {
    static BASE_URL = "http://localhost:8080"

    static async login(email, password) {
        try {
            const response = await axios.post(`${UsersService.BASE_URL}/login`, { email, password })
            return response.data;

        } catch (err) {
            throw err;
        }
    }

    static async register(userData, token) {
        try {
            const response = await axios.post(`${UsersService.BASE_URL}/register`, userData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllUsers(token) {
        try {
            const response = await axios.get(`${UsersService.BASE_URL}/userList`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteUser(userId, token) {
        try {
            const response = await axios.delete(`${UsersService.BASE_URL}/delete/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data;
        } catch (err) {
            throw err;
        }
    }


    static async updateUser(userId, userData, token) {
        try {
            const response = await axios.put(`${UsersService.BASE_URL}/update/${userId}`, userData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UsersService;