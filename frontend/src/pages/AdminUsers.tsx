import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { userService } from '../services/api';
import { User } from '../types';
import { Navigate } from 'react-router-dom';

const defaultPermissions = { view: false, create: false, edit: false, delete: false };

export const AdminUsers = () => {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await userService.getAllUsers();
        setUsers(data.map((u: any) => ({ ...u, permissions: u.permissions || {} })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  const togglePermission = (idx: number, key: string) => {
    const copy = [...users];
    const perms = copy[idx].permissions || {};
    perms[key] = !perms[key];
    copy[idx].permissions = perms;
    setUsers(copy);
  };

  const changeRole = (idx: number, role: string) => {
    const copy = [...users];
    (copy[idx] as any).role = role;
    setUsers(copy);
  };

  const saveRow = async (u: any) => {
    try {
      await userService.setPermissions(u.id, u.role, u.permissions || {});
      alert('Saved');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white rounded">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">View</th>
              <th className="p-2">Create</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">
                  <select value={(u as any).role || 'user'} onChange={(e) => changeRole(idx, e.target.value)}>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" checked={!!u.permissions?.view} onChange={() => togglePermission(idx, 'view')} />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" checked={!!u.permissions?.create} onChange={() => togglePermission(idx, 'create')} />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" checked={!!u.permissions?.edit} onChange={() => togglePermission(idx, 'edit')} />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" checked={!!u.permissions?.delete} onChange={() => togglePermission(idx, 'delete')} />
                </td>
                <td className="p-2">
                  <button onClick={() => saveRow(u)} className="btn-primary">Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
