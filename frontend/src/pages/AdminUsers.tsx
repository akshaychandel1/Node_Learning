import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { userService } from '../services/api';
import { User } from '../types';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const PERMISSIONS = ['view', 'create', 'edit', 'delete'] as const;

export const AdminUsers = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

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

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const togglePermission = (idx: number, key: string) => {
    const copy = [...users];
    const perms: any = { ...(copy[idx].permissions || {}) };
    perms[key] = !perms[key];
    copy[idx] = { ...copy[idx], permissions: perms };
    setUsers(copy);
  };

  const changeRole = (idx: number, role: string) => {
    const copy = [...users];
    copy[idx] = { ...copy[idx], role } as any;
    setUsers(copy);
  };

  const saveRow = async (u: any) => {
    setSavingId(u.id);
    try {
      await userService.setPermissions(u.id, u.role, u.permissions || {});
      showToast(`Saved permissions for ${u.name}`, true);
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to save', false);
    } finally {
      setSavingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-white font-semibold transition-all ${
            toast.ok ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="glass-effect border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">User Management</h1>
            <p className="text-white opacity-90 mt-1">Assign roles and permissions</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="btn-secondary">Dashboard</Link>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-2xl text-white opacity-75">Loading users...</p>
          </div>
        ) : (
          <div className="glass-effect rounded-2xl overflow-hidden shadow-2xl">
            <table className="min-w-full">
              <thead>
                <tr className="bg-white bg-opacity-10 border-b border-white border-opacity-20">
                  <th className="px-4 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">Name</th>
                  <th className="px-4 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">Email</th>
                  <th className="px-4 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">Role</th>
                  {PERMISSIONS.map((p) => (
                    <th key={p} className="px-4 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">
                      {p}
                    </th>
                  ))}
                  <th className="px-4 py-4 text-center text-white font-semibold text-sm uppercase tracking-wider">Save</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr
                    key={u.id}
                    className="border-b border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 transition-colors"
                  >
                    <td className="px-4 py-4 text-white font-medium">{u.name}</td>
                    <td className="px-4 py-4 text-white opacity-80 text-sm">{u.email}</td>
                    <td className="px-4 py-4 text-center">
                      <select
                        value={(u as any).role || 'user'}
                        onChange={(e) => changeRole(idx, e.target.value)}
                        className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-1 text-sm border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                      >
                        <option value="user" className="text-gray-800">User</option>
                        <option value="manager" className="text-gray-800">Manager</option>
                        <option value="admin" className="text-gray-800">Admin</option>
                      </select>
                    </td>
                    {PERMISSIONS.map((p) => (
                      <td key={p} className="px-4 py-4 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!u.permissions?.[p]}
                            onChange={() => togglePermission(idx, p)}
                          />
                          <div className="w-10 h-6 bg-white bg-opacity-20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 peer-checked:bg-green-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </td>
                    ))}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => saveRow(u)}
                        disabled={savingId === u.id}
                        className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
                      >
                        {savingId === u.id ? 'Saving...' : 'Save'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white opacity-60">No users found.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUsers;
