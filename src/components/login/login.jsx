import React, { useState, useContext } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { StateContext } from '../../context';

const Login = ({ setLogin }) => {
  const { setToken, setCurrentUser } = useContext(StateContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    setLogin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = await fetch('http://localhost:9000/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: { email: email, password: password },
      }),
    });
    const reqJson = await req.json();
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      setToken(authHeader.split(' ')[1]);
      setCurrentUser(reqJson.data);
    }
  };

  return (
    <div className='form-box'>
      <form className='form'>
        <span className='title'>Log in</span>
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
          Employer? Sign up <Link to='/employers'>here</Link>{' '}
        </p>
        <p>
          Don't have an account? <Link onClick={handleClick}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
