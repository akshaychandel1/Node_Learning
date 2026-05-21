import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNoteStore } from '../store/noteStore';
import NoteForm from './NoteForm';
const NoteList = ({ notes }) => {
    const { deleteNote } = useNoteStore();
    const [editingNote, setEditingNote] = useState(null);
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [editingNote && (_jsx("div", { className: "col-span-full", children: _jsx(NoteForm, { editingNote: editingNote, onClose: () => setEditingNote(null) }) })), notes.map((note) => (_jsxs("div", { className: "card glass-effect bg-white bg-opacity-95", children: [_jsx("h3", { className: "text-xl font-bold text-gray-800 mb-2", children: note.title }), _jsx("p", { className: "text-gray-600 mb-4 line-clamp-3", children: note.content }), _jsxs("div", { className: "flex gap-2 mt-4", children: [_jsx("button", { onClick: () => setEditingNote(note), className: "flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors", children: "Edit" }), _jsx("button", { onClick: () => note.id && deleteNote(note.id), className: "flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors", children: "Delete" })] }), note.createdAt && (_jsx("p", { className: "text-sm text-gray-500 mt-3", children: new Date(note.createdAt).toLocaleDateString() }))] }, note.id)))] }));
};
export default NoteList;
