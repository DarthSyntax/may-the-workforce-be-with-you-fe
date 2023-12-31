import React, { useState, useContext } from 'react';
import './emp-signup.css';
import { Link } from 'react-router-dom';
import { StateContext } from '../../context';

const EmployerSignUp = ({ setLogin }) => {
  const { setToken, setCurrentEmployer } = useContext(StateContext);
  const [employerName, setEmployerName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    setLogin(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = await fetch('http://localhost:9000/employers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employer: {
          employer_name: employerName,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      }),
    });

    const authHeader = req.headers.get('Authorization');
    const reqJson = await req.json();

    if (authHeader) {
      setToken(authHeader.split(' ')[1]);
      setCurrentEmployer(reqJson.data);
    }
  };

  return (
    <div className='form-box'>
      <form className='form'>
        <span className='title'>Employer Sign up</span>
        <span className='subtitle'>Create a free account with your email.</span>
        <div className='form-container'>
          <input
            type='text'
            className='input'
            placeholder='Employer Name'
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          <input
            type='email'
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
          <input
            type='password'
            className='input'
            placeholder='Confirm Password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Sign up</button>
      </form>
      <div className='form-section'>
        <p>
          Job seeker? Sign up <Link to='/'>here</Link>{' '}
        </p>
        <p>
          Have an account? <Link onClick={handleClick}>Log in</Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default EmployerSignUp;
