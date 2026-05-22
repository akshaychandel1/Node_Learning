import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNoteStore } from '../store/noteStore';
import { useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
export const Dashboard = () => {
    const { user, logout } = useAuthStore();
    const { notes, fetchNotes } = useNoteStore();
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchNotes();
    }, []);
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500", children: [_jsx("header", { className: "glass-effect border-b border-white border-opacity-20", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6 flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white", children: "Notes App" }), _jsxs("p", { className: "text-white opacity-90 mt-1", children: ["Welcome, ", user?.name, "!"] })] }), user?.role === 'admin' && (_jsx("div", { className: "flex items-center space-x-4", children: _jsx("a", { href: "/admin/users", className: "btn-secondary", children: "Manage Users" }) })), _jsx("button", { onClick: handleLogout, className: "btn-secondary", children: "Logout" })] }) }), _jsxs("main", { className: "max-w-6xl mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-white", children: "Your Notes" }), _jsx("button", { onClick: () => setShowForm(!showForm), className: "btn-primary", children: showForm ? 'Cancel' : '+ New Note' })] }), showForm && _jsx(NoteForm, { onClose: () => setShowForm(false) }), notes.length === 0 ? (_jsx("div", { className: "text-center py-16", children: _jsx("p", { className: "text-2xl text-white opacity-75", children: "No notes yet. Create your first note!" }) })) : (_jsx(NoteList, { notes: notes }))] })] }));
};
