import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { userService } from '../services/api';
import { Navigate } from 'react-router-dom';
const defaultPermissions = { view: false, create: false, edit: false, delete: false };
export const AdminUsers = () => {
    const { user } = useAuthStore();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await userService.getAllUsers();
                setUsers(data.map((u) => ({ ...u, permissions: u.permissions || {} })));
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoading(false);
            }
        })();
    }, []);
    if (!user)
        return _jsx(Navigate, { to: "/login", replace: true });
    if (user.role !== 'admin')
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    const togglePermission = (idx, key) => {
        const copy = [...users];
        const perms = copy[idx].permissions || {};
        perms[key] = !perms[key];
        copy[idx].permissions = perms;
        setUsers(copy);
    };
    const changeRole = (idx, role) => {
        const copy = [...users];
        copy[idx].role = role;
        setUsers(copy);
    };
    const saveRow = async (u) => {
        try {
            await userService.setPermissions(u.id, u.role, u.permissions || {});
            alert('Saved');
        }
        catch (err) {
            alert(err.response?.data?.error || 'Failed');
        }
    };
    return (_jsxs("div", { className: "max-w-6xl mx-auto p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "User Management" }), loading ? (_jsx("p", { children: "Loading..." })) : (_jsxs("table", { className: "min-w-full bg-white rounded", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "p-2", children: "Name" }), _jsx("th", { className: "p-2", children: "Email" }), _jsx("th", { className: "p-2", children: "Role" }), _jsx("th", { className: "p-2", children: "View" }), _jsx("th", { className: "p-2", children: "Create" }), _jsx("th", { className: "p-2", children: "Edit" }), _jsx("th", { className: "p-2", children: "Delete" }), _jsx("th", { className: "p-2", children: "Actions" })] }) }), _jsx("tbody", { children: users.map((u, idx) => (_jsxs("tr", { className: "border-t", children: [_jsx("td", { className: "p-2", children: u.name }), _jsx("td", { className: "p-2", children: u.email }), _jsx("td", { className: "p-2", children: _jsxs("select", { value: u.role || 'user', onChange: (e) => changeRole(idx, e.target.value), children: [_jsx("option", { value: "user", children: "User" }), _jsx("option", { value: "manager", children: "Manager" }), _jsx("option", { value: "admin", children: "Admin" })] }) }), _jsx("td", { className: "p-2 text-center", children: _jsx("input", { type: "checkbox", checked: !!u.permissions?.view, onChange: () => togglePermission(idx, 'view') }) }), _jsx("td", { className: "p-2 text-center", children: _jsx("input", { type: "checkbox", checked: !!u.permissions?.create, onChange: () => togglePermission(idx, 'create') }) }), _jsx("td", { className: "p-2 text-center", children: _jsx("input", { type: "checkbox", checked: !!u.permissions?.edit, onChange: () => togglePermission(idx, 'edit') }) }), _jsx("td", { className: "p-2 text-center", children: _jsx("input", { type: "checkbox", checked: !!u.permissions?.delete, onChange: () => togglePermission(idx, 'delete') }) }), _jsx("td", { className: "p-2", children: _jsx("button", { onClick: () => saveRow(u), className: "btn-primary", children: "Save" }) })] }, u.id))) })] }))] }));
};
export default AdminUsers;
