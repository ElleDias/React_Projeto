import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//Função responsavel por renderizar o App.js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
  //React.StrictMode facilita o acesso ao documero, por conta dele a mensagem vem duplicada
  <React.StrictMode>
    <App />
  </React.StrictMode>
);