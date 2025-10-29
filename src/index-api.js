import React from 'react';
import { createRoot } from 'react-dom/client';
import ApiExample from './ApiExample.jsx';

// Crear el root de React
const container = document.getElementById('root');
const root = createRoot(container);

// Renderizar el componente
root.render(<ApiExample />);
