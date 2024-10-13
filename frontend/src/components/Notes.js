import React, { useState, useEffect } from 'react';
import './Notes.css';
import Editor from './Editor';
const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({
        title: '',
        content: '',
        tags: '',
        date: new Date().toISOString().split('T')[0],
    });
    
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [noteIdToEdit, setNoteIdToEdit] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [showNotes, setShowNotes] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/notes', {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch notes');

                const data = await response.json();
                setNotes(data);
            } catch (error) {
                alert(error.message);
            }
        };

        fetchNotes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewNote((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noteToSubmit = {
            ...newNote,
            tags: newNote.tags.split(',').map(tag => tag.trim()),
        };

        try {
            const method = editMode ? 'PUT' : 'POST';
            const url = editMode ? `/api/notes/${noteIdToEdit}` : '/api/notes';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify(noteToSubmit),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save note');
            }

            const savedNote = await response.json();
            setNotes((prev) => editMode
                ? prev.map(note => (note.id === noteIdToEdit ? savedNote : note))
                : [...prev, savedNote]
            );

            alert(editMode ? 'Note updated successfully!' : 'Note saved successfully!');
        } catch (error) {
            alert(error.message);
        } finally {
            resetNewNote();
            setShowForm(false);
            setEditMode(false);
        }
    };

    const handleEdit = (noteId) => {
        const noteToEdit = notes.find((note) => note.id === noteId);
        if (noteToEdit) {
            setNewNote({
                title: noteToEdit.title,
                content: noteToEdit.content,
                tags: noteToEdit.tags.join(', '),
                date: noteToEdit.date,
            });
            setEditMode(true);
            setNoteIdToEdit(noteId);
            setShowForm(true);
        }
    };

    const handleDelete = async (noteId) => {
        try {
            const response = await fetch(`/api/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete note');
            }

            setNotes((prev) => prev.filter((note) => note.id !== noteId));
            alert('Note deleted successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    const resetNewNote = () => {
        setNewNote({
            title: '',
            content: '',
            tags: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="notes">
            <h1>My Notes</h1>
            <div className="button-group">
                <button onClick={() => setShowSearch(prev => !prev)}>
                    {showSearch ? 'Hide Search' : 'Show Search'}
                </button>
                <button onClick={() => setShowForm(prev => !prev)}>
                    {showForm ? (editMode ? 'Cancel Edit' : 'Hide Form') : (editMode ? 'Edit Notes' : 'Add New Notes')}
                </button>
                <button onClick={() => setShowEditor(prev => !prev)}>
                    {showEditor ? 'Hide Editor' : 'Show Editor'}
                </button>
                <button onClick={() => setShowNotes(prev => !prev)}>
                    {showNotes ? 'Hide Notes' : 'Show Notes'}
                </button>
            </div>

            {showSearch && (
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            )}

            {showNotes && filteredNotes.length > 0 && (
                <div className="notes-list">
                    {filteredNotes.map((note) => (
                        <div key={note.id} className="note-item">
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                            <p><strong>Tags:</strong> {note.tags.join(', ')}</p>
                            <p><strong>Date:</strong> {new Date(note.date).toLocaleDateString()}</p>
                            <div className="note-buttons">
                                <button className="edit" onClick={() => handleEdit(note.id)}>Edit</button>
                                <button className="delete" onClick={() => handleDelete(note.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div>
                    <h2>{editMode ? 'Edit Note' : 'Add a New Note'}</h2>
                    <form className="notes-form" onSubmit={handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newNote.title}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={newNote.content}
                            onChange={handleChange}
                            rows="5"
                            required
                        />
                        <label htmlFor="tags">Tags (comma-separated):</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={newNote.tags}
                            onChange={handleChange}
                        />
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={newNote.date}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">{editMode ? 'Update Note' : 'Add Note'}</button>
                    </form>
                </div>
            )}

            {showEditor && <Editor />}
        </div>
    );
};

export default Notes;
