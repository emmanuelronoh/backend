import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

const Editor = ({ onSave }) => {
    const [content, setContent] = useState('');
    const [charCount, setCharCount] = useState(0);
    const CHAR_LIMIT = 2000; // Set your character limit

    useEffect(() => {
        // Load saved content from localStorage
        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
            setContent(savedContent);
            setCharCount(savedContent.length);
        }
    }, []);

    // Auto-save functionality
    useEffect(() => {
        const autoSave = () => {
            localStorage.setItem('editorContent', content);
        };
        const autoSaveInterval = setInterval(autoSave, 5000);

        return () => clearInterval(autoSaveInterval); // Cleanup on unmount
    }, [content]);

    const handleContentChange = (value) => {
        if (value.length <= CHAR_LIMIT) {
            setContent(value);
            setCharCount(value.length);
        }
    };

    const handleSave = async () => {
        localStorage.setItem('editorContent', content);
        
        // Call the onSave function passed from parent to handle saving
        if (onSave) {
            try {
                await onSave(content);
                alert('Content saved to database!');
                setContent(''); // Clear the editor content
                setCharCount(0); // Reset character count
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <div className="editor-container">
            <h2>Editor</h2>
            <ReactQuill
                value={content}
                onChange={handleContentChange}
                modules={Editor.modules}
                formats={Editor.formats}
            />
            <div className="editor-footer">
                <button className="save-button" onClick={handleSave}>Save</button>
                <p>{charCount}/{CHAR_LIMIT} characters</p>
            </div>
        </div>
    );
};

// Define modules and formats for ReactQuill editor
Editor.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image', 'video'],
        [{ 'align': [] }],
        ['clean']
    ],
};

Editor.formats = [
    'header', 'font', 'list', 'bold', 'italic', 'underline', 'strike', 'link', 'image', 'video', 'align'
];

export default Editor;
