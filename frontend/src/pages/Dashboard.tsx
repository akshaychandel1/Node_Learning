import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNoteStore } from '../store/noteStore';
import { useNavigate, Link } from 'react-router-dom';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const { notes, fetchNotes } = useNoteStore();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';
  const perms = user?.permissions || {};
  const canView = isAdmin || !!perms.view;
  const canCreate = isAdmin || !!perms.create;

  useEffect(() => {
    if (canView) fetchNotes();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      {/* Header */}
      <header className="glass-effect border-b border-white border-opacity-20">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Notes App</h1>
            <p className="text-white opacity-90 mt-1">Welcome, {user?.name}!</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-white bg-opacity-20 rounded text-xs text-white capitalize">
              {user?.role}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {isAdmin && (
              <Link to="/admin/users" className="btn-secondary">Manage Users</Link>
            )}
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Your Notes</h2>
          {canCreate && (
            <button onClick={() => setShowForm(!showForm)} className="btn-primary">
              {showForm ? 'Cancel' : '+ New Note'}
            </button>
          )}
        </div>

        {/* Permission badges */}
        {!isAdmin && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {(['view', 'create', 'edit', 'delete'] as const).map((p) => (
              <span
                key={p}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  perms[p]
                    ? 'bg-green-400 text-green-900'
                    : 'bg-white bg-opacity-20 text-white opacity-60'
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        )}

        {showForm && <NoteForm onClose={() => setShowForm(false)} />}

        {!canView ? (
          <div className="text-center py-16">
            <p className="text-2xl text-white opacity-75">You don't have permission to view notes.</p>
            <p className="text-white opacity-60 mt-2">Contact an admin to grant you view access.</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-white opacity-75">No notes yet. Create your first note!</p>
          </div>
        ) : (
          <NoteList notes={notes} />
        )}
      </main>
    </div>
  );
};
