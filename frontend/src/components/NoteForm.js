import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNoteStore } from '../store/noteStore';
const NoteForm = ({ onClose, editingNote }) => {
    const { addNote, updateNote } = useNoteStore();
    const [formData, setFormData] = useState({
        title: editingNote?.title || '',
        content: editingNote?.content || '',
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingNote?.id) {
                await updateNote(editingNote.id, formData);
            }
            else {
                await addNote(formData);
            }
            onClose();
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "glass-effect rounded-2xl p-8 mb-8", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-white font-semibold mb-2", children: "Title" }), _jsx("input", { type: "text", name: "title", value: formData.title, onChange: handleChange, placeholder: "Note title...", className: "input-field", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-white font-semibold mb-2", children: "Content" }), _jsx("textarea", { name: "content", value: formData.content, onChange: handleChange, placeholder: "Write your note here...", rows: 5, className: "input-field resize-none", required: true })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { type: "submit", disabled: loading, className: "btn-primary flex-1 disabled:opacity-50", children: loading ? 'Saving...' : 'Save Note' }), _jsx("button", { type: "button", onClick: onClose, className: "btn-secondary flex-1", children: "Cancel" })] })] }) }));
};
export default NoteForm;
