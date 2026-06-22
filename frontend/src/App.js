import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Productos from './pages/Productos';
import Categorias from './pages/Categorias';
import Movimientos from './pages/Movimientos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/movimientos" element={<Movimientos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
