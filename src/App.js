
import './App.css';
import { Routes, Route, } from "react-router-dom"
import Login2 from './components/Login2';
import Register from './components/Register'
import Books from './components/Books';
import Home from './components/Home';
import DetailBook from './components/DetailBook'
import React from 'react';

function App() {
  return (

    <Routes>
      <Route path='' element={<Home />}></Route>
      <Route path='books' element={<Books />}></Route>
      <Route path='login' element={<Login2 />}></Route>
      <Route path='register' element={<Register />}></Route>
      <Route path='detail' element={<DetailBook />}/>
    </Routes>
  );
}

export default App;
