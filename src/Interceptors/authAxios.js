import { useContext, useMemo } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

const authAxios = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

const WithAxios = ({ children }) => {
    const user = useContext(UserContext);
        authAxios.interceptors.request.use(async config => {
            if (!user[0]?.accessToken) return config;
            config.headers = { 
                'Authorization': `Bearer ${user[0].accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Origin': true
            }
            return config;
        }, error => {
            Promise.reject(error)
        });
        authAxios.interceptors.response.use((response) => {
            if (response.data?.accessToken)
                response.accessToken = response.data.accessToken;
            if (response?.accessToken) user[1]({accessToken:response.accessToken});
            else user[1]({});
            return response;
        }, async error  =>  {
            const originalRequest = error.config;
            if (error.response?.status === 403) {
                const token = await authAxios.get('/auth/refresh', { withCredentials: true });
                if (!token) return Promise.reject(error);
                user[1]({accessToken:token?.accesstoken});
                return authAxios(originalRequest);
            }
            return Promise.reject(error);
        })

    return children;
}

export default WithAxios;
export {authAxios};