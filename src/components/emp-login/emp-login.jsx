import React, { useState, useContext } from 'react';
import './emp-login.css';
import { Link, useNavigate } from 'react-router-dom';
import { StateContext } from '../../context';

const EmployerLogin = ({ setLogin }) => {
  const { setToken, setCurrentEmployer, setJobs, currentEmployer } =
    useContext(StateContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setLogin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = await fetch('http://localhost:9000/employers/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employer: { email: email, password: password },
      }),
    });

    const reqJson = await req.json();
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      setToken(authHeader.split(' ')[1]);
      await setCurrentEmployer(reqJson.data);
    }
  };

  return (
    <div className='form-box'>
      <form className='form'>
        <span className='title'>Employer Log in</span>
        <span className='subtitle'>Log in to your account</span>
        <div className='form-container'>
          <input
            type='text'
            className='input'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            className='input'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Sign in</button>
      </form>
      <div className='form-section'>
        <p>
          Job seeker? Sign up <Link to='/'>here</Link>{' '}
        </p>
        <p>
          Don't have an account? <Link onClick={handleClick}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default EmployerLogin;
