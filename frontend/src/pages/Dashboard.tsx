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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      {/* Header */}
      <header className="glass-effect border-b border-white border-opacity-20">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Notes App</h1>
            <p className="text-white opacity-90 mt-1">Welcome, {user?.name}!</p>
          </div>
          {user?.role === 'admin' && (
            <div className="flex items-center space-x-4">
              <a href="/admin/users" className="btn-secondary">Manage Users</a>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Your Notes</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ New Note'}
          </button>
        </div>

        {showForm && <NoteForm onClose={() => setShowForm(false)} />}

        {notes.length === 0 ? (
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
