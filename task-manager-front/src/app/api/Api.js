import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response) {

            console.error('Erro na resposta:', error.response);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {

            console.error('Erro na requisição:', error.request);
        } else {

            console.error('Erro ao configurar a requisição:', error.message);
        }

        return Promise.reject(error.response);
    }
);

export default api;