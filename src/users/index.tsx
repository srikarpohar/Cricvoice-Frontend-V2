import React from 'react';
import { createRoot } from 'react-dom/client';
import { UsersApp } from './UsersApp';

const container = document.getElementById('users');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <UsersApp />
    </React.StrictMode>
)
