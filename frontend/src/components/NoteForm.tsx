import { useState } from 'react';
import { useNoteStore } from '../store/noteStore';
import { Note } from '../types';

interface NoteFormProps {
  onClose: () => void;
  editingNote?: Note;
}

const NoteForm = ({ onClose, editingNote }: NoteFormProps) => {
  const { addNote, updateNote } = useNoteStore();
  const [formData, setFormData] = useState({
    title: editingNote?.title || '',
    content: editingNote?.content || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingNote?.id) {
        await updateNote(editingNote.id, formData);
      } else {
        await addNote(formData);
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-8 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Note title..."
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your note here..."
            rows={5}
            className="input-field resize-none"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Note'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
