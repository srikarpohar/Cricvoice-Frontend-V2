import React from 'react';
import { createRoot } from 'react-dom/client';
import { CommonApp } from './CommonApp';

const container = document.getElementById('shared');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <CommonApp />
    </React.StrictMode>
)
