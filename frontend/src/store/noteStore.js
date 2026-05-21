import { create } from 'zustand';
import { noteService } from '../services/api';
export const useNoteStore = create((set) => ({
    notes: [],
    loading: false,
    error: null,
    fetchNotes: async () => {
        set({ loading: true, error: null });
        try {
            const notes = await noteService.getAllNotes();
            set({ notes, loading: false });
        }
        catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    addNote: async (note) => {
        try {
            const newNote = await noteService.createNote(note);
            set((state) => ({ notes: [...state.notes, newNote] }));
        }
        catch (error) {
            set({ error: error.message });
        }
    },
    updateNote: async (id, note) => {
        try {
            const updated = await noteService.updateNote(id, note);
            set((state) => ({
                notes: state.notes.map((n) => (n.id === id ? updated : n)),
            }));
        }
        catch (error) {
            set({ error: error.message });
        }
    },
    deleteNote: async (id) => {
        try {
            await noteService.deleteNote(id);
            set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
        }
        catch (error) {
            set({ error: error.message });
        }
    },
    setNotes: (notes) => set({ notes }),
}));
