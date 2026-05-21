import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuthStore } from '../store/authStore';
export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await authService.login(formData.email, formData.password);
            setAuth(response.user, response.token);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4", children: _jsxs("div", { className: "glass-effect rounded-2xl p-8 w-full max-w-md shadow-2xl", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2 text-center", children: "Welcome Back" }), _jsx("p", { className: "text-white text-center mb-8 opacity-90", children: "Login to your account" }), error && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-white font-semibold mb-2", children: "Email" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, placeholder: "you@example.com", className: "input-field", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white font-semibold mb-2", children: "Password" }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleChange, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "input-field", required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full mt-6 disabled:opacity-50", children: loading ? 'Logging in...' : 'Login' })] }), _jsxs("p", { className: "text-center text-white mt-6", children: ["Don't have an account?", ' ', _jsx("a", { href: "/register", className: "font-bold hover:underline", children: "Sign Up" })] })] }) }));
};
