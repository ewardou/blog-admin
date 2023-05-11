import React from 'react';
import { useState, useEffect } from 'react';

function Checkbox({ post }) {
    const [checkbox, setCheckbox] = useState(false);

    async function onChangeCheckbox(e) {
        const state = e.target.checked;
        setCheckbox(state);
        await fetch(`https://blog-api-hs2t.onrender.com/posts/${post._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                isPublic: state,
            }),
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((e) => console.error(e));
    }

    useEffect(() => {
        (async () => {
            await fetch(`https://blog-api-hs2t.onrender.com/posts/${post._id}`)
                .then((response) => response.json())
                .then((json) => setCheckbox(json.isPublic))
                .catch((e) => console.error(e));
        })();
    }, []);

    return (
        <input type="checkbox" checked={checkbox} onChange={onChangeCheckbox} />
    );
}

export default function Posts() {
    const [posts, setPosts] = useState(null);

    async function getPosts() {
        try {
            const response = await fetch(
                'https://blog-api-hs2t.onrender.com/posts',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            const json = await response.json();
            setPosts(json);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {posts ? (
                posts.map((post) => (
                    <div key={post._id}>
                        <p>{post.title}</p>
                        <Checkbox post={post} />
                    </div>
                ))
            ) : (
                <h1>No posts</h1>
            )}
        </div>
    );
}
