import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './Pages/Login.jsx';
import Countries from './Pages/Countries.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/countries" element={ <Countries /> } />
    </Routes>
  );
}

export default App;
