import axios, { Axios } from 'axios';
import { mockTransactions } from './mockResponse';

class APITransactions {
    private axiosInstance: Axios;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
        });
    }

    async getTransactions() {
        return this.axiosInstance.get('/transactions');
    }

    async getTransactionsMock() {
        return mockTransactions;
    }
}

export default new APITransactions();