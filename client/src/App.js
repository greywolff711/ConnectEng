import React,{Fragment, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes,Switch} from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import Register from './components/layout/Register';
import { Login } from './components/layout/Login';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//Redux
import { Provider } from 'react-redux';
import store from './store';


    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      console.log(localStorage.token);
      setAuthToken(localStorage.token);
    }
const App=()=> {
  useEffect(() => {
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());
  }, []);

  return(
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
)};

export default App;
