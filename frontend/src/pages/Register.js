import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuthStore } from '../store/authStore';
export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const response = await authService.register(formData.name, formData.email, formData.password);
            setAuth(response.user, response.token);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4", children: _jsxs("div", { className: "glass-effect rounded-2xl p-8 w-full max-w-md shadow-2xl", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2 text-center", children: "Create Account" }), _jsx("p", { className: "text-white text-center mb-8 opacity-90", children: "Join us today" }), error && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-white font-semibold mb-2", children: "Full Name" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, placeholder: "John Doe", className: "input-field", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white font-semibold mb-2", children: "Email" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, placeholder: "you@example.com", className: "input-field", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white font-semibold mb-2", children: "Password" }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleChange, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "input-field", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white font-semibold mb-2", children: "Confirm Password" }), _jsx("input", { type: "password", name: "confirmPassword", value: formData.confirmPassword, onChange: handleChange, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "input-field", required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full mt-6 disabled:opacity-50", children: loading ? 'Creating Account...' : 'Sign Up' })] }), _jsxs("p", { className: "text-center text-white mt-6", children: ["Already have an account?", ' ', _jsx("a", { href: "/login", className: "font-bold hover:underline", children: "Login" })] })] }) }));
};
