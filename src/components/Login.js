import React from 'react';
import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }
    function onChangePassword(e) {
        setPassword(e.target.value);
    }
    async function onClickBtn(e) {
        e.preventDefault();
        setMsg('Checking credentials');
        try {
            const response = await fetch(
                'https://blog-api-hs2t.onrender.com/auth/log-in',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );
            const json = await response.json();
            if (!response.ok) {
                throw json;
            }
            localStorage.setItem('token', json.token);
            setMsg('Successful login');
            window.location.replace('/posts');
        } catch (err) {
            setMsg(err.message);
        }
    }

    return (
        <form>
            <p>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={onChangeUsername}
                />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={onChangePassword}
                />
            </p>
            <p>{msg}</p>
            <button onClick={onClickBtn}>Log in</button>
        </form>
    );
}
