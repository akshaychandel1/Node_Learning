import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
export const JWTMiddleware = ({ children }) => {
    const { initAuth, token } = useAuthStore();
    useEffect(() => {
        initAuth();
    }, []);
    return _jsx(_Fragment, { children: children });
};
// Token validation
export const isTokenValid = (token) => {
    if (!token)
        return false;
    try {
        const parts = token.split('.');
        if (parts.length !== 3)
            return false;
        const decoded = JSON.parse(atob(parts[1]));
        const expirationTime = decoded.exp * 1000;
        return Date.now() < expirationTime;
    }
    catch (error) {
        return false;
    }
};
// Get token from storage
export const getToken = () => {
    return localStorage.getItem('token');
};
// Check if user is authenticated
export const isAuthenticated = () => {
    const token = getToken();
    return token ? isTokenValid(token) : false;
};
