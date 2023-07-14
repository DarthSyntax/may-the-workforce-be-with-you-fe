import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpLoginPage from './pages/signup-login-page/signup-login-page';
import EmployerSignUpLoginPage from './pages/emp-signup-login-page/emp-signup-login-page';
import { StateContext } from './context';
import Header from './components/header/header';
import FilterSearchbar from './components/filter-searchbar/filter-searchbar';
import HomePage from './pages/home-page/home-page';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);

  const states = {
    token,
    setToken,
    currentUser,
    setCurrentUser,
    search,
    setSearch,
    jobs,
    setJobs,
  };

  return (
    <StateContext.Provider value={states}>
      <Router>
        <div className='container'>
          <div className='header'>
            <Header />
          </div>
          <div className='filter'>{token && <FilterSearchbar />}</div>
          <div className='content'>
            <Routes>
              <Route
                exact
                path='/'
                element={token ? <HomePage /> : <SignUpLoginPage />}
              />
              <Route
                path='/employers'
                element={<EmployerSignUpLoginPage />}
              ></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </StateContext.Provider>
  );
}

export default App;
