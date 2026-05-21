import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
