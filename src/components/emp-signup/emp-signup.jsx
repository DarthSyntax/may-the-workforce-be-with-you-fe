import React, { useState, useContext } from 'react';
import './emp-signup.css';
import { Link } from 'react-router-dom';
import { StateContext } from '../../context';

const EmployerSignUp = ({ setLogin }) => {
  const { setToken, setCurrentUser } = useContext(StateContext);
  const [employerName, setEmployerName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');

  const handleClick = () => {
    setLogin(true);
  };

  const handleSubmit = async () => {
    const req = await fetch('http://localhost:9000/employers/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employer_name: employerName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    });

    const reqJson = req.json();
    setToken(reqJson.headers.Authorization.split(' ')[1]);
    setCurrentUser(reqJson.data);
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
            onChange={() => setEmployerName(employerName)}
          />
          <input
            type='email'
            className='input'
            placeholder='Email'
            value={email}
            onChange={() => setEmail(email)}
          />
          <input
            type='password'
            className='input'
            placeholder='Password'
            value={password}
            onChange={() => setPassword(password)}
          />
          <input
            type='password'
            className='input'
            placeholder='Confirm Password'
            value={passwordConfirmation}
            onChange={() => setPasswordConfirmation(passwordConfirmation)}
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
