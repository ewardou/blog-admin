import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Posts from './components/Posts';
import NewPost from './components/NewPost';

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/new-post" element={<NewPost />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;
