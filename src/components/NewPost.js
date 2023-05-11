import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

export default function NewPost() {
    const editorRef = useRef(null);
    const [title, setTitle] = useState('');

    function onChangeTitle(e) {
        setTitle(e.target.value);
    }

    const submitPost = async (e) => {
        e.preventDefault();
        const response = await fetch(
            'https://blog-api-hs2t.onrender.com/posts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    content: editorRef.current.getContent().trim(),
                    title: title,
                }),
            }
        );
        const json = await response.json();
        console.log(json);
        window.location.replace('/posts');
    };

    return (
        <form>
            <p>
                <label htmlFor="title">Title: </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={onChangeTitle}
                />
            </p>
            <Editor
                apiKey={process.env.REACT_APP_API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
            <button onClick={submitPost}>Submit</button>
            <div className="message"></div>
        </form>
    );
}
