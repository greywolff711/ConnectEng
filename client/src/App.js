import React,{Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes,Switch} from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import Register from './components/layout/Register';
import { Login } from './components/layout/Login';
import Alert from './components/layout/Alert';
//Redux
import { Provider } from 'react-redux';
import store from './store';

const App=()=> (
  <Provider store={store}>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
      <section className='container'>
        <Alert/>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </section>
    </Router>
  </Provider>
);

export default App;
