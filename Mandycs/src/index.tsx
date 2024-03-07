import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Asume que tienes este archivo para estilos globales de tu aplicación
import App from './App'; // El componente raíz de tu aplicación, ubicado en src/App.tsx
import './assets/fonts/fonts.css'; // Ajusta la ruta según sea necesario


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
