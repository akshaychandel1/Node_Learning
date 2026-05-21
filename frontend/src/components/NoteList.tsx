import { useState } from 'react';
import { Note } from '../types';
import { useNoteStore } from '../store/noteStore';
import NoteForm from './NoteForm';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const { deleteNote } = useNoteStore();
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {editingNote && (
        <div className="col-span-full">
          <NoteForm
            editingNote={editingNote}
            onClose={() => setEditingNote(null)}
          />
        </div>
      )}

      {notes.map((note) => (
        <div key={note.id} className="card glass-effect bg-white bg-opacity-95">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setEditingNote(note)}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => note.id && deleteNote(note.id)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>

          {note.createdAt && (
            <p className="text-sm text-gray-500 mt-3">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NoteList;
