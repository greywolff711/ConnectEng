import React,{Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes,Switch} from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { Register } from './components/layout/Register';
import { Login } from './components/layout/Login';
const App=()=> (
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Landing/>}/>
    </Routes>
    <section className='container'>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </section>
  </Router>
);

export default App;
