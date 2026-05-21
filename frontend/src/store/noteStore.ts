import { create } from 'zustand';
import { Note } from '../types';
import { noteService } from '../services/api';

interface NoteStore {
  notes: Note[];
  loading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  addNote: (note: Note) => Promise<void>;
  updateNote: (id: number, note: Note) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  setNotes: (notes: Note[]) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const notes = await noteService.getAllNotes();
      set({ notes, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addNote: async (note) => {
    try {
      const newNote = await noteService.createNote(note);
      set((state) => ({ notes: [...state.notes, newNote] }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateNote: async (id, note) => {
    try {
      const updated = await noteService.updateNote(id, note);
      set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? updated : n)),
      }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteNote: async (id) => {
    try {
      await noteService.deleteNote(id);
      set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  setNotes: (notes) => set({ notes }),
}));
