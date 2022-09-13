import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import Register from './components/layout/Register';
import Login  from './components/layout/Login';
import Alert from './components/layout/Alert';
import CreateProfile from './components/profile-forms/CreateProfile';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/Dashboard/Dashboard';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import PrivateRoute from './components/Routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';


    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
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
          <Route path="/create-profile" element={<PrivateRoute component={CreateProfile}/>}/>
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard}/>}/>
          <Route path="/add-experience" element={<PrivateRoute component={AddExperience}/>}/>
          <Route path="/add-education" element={<PrivateRoute component={AddEducation}/>}/>
        </Routes>
      </section>
    </Router>
  </Provider>
)};

export default App;
