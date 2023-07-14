import React, { useContext, useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { StateContext } from '../../context';

const SignUp = ({ setLogin }) => {
  const { setToken, setCurrentUser } = useContext(StateContext);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');

  const handleClick = () => {
    setLogin(true);
  };

  const handleSubmit = async () => {
    const req = await fetch('http://localhost:9000/users/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    });

    const reqJson = await req.json();
    setToken(reqJson.headers.Authorization.split(' ')[1]);
    setCurrentUser(reqJson.data);
  };

  return (
    <div className='form-box'>
      <form className='form'>
        <span className='title'>Sign up</span>
        <span className='subtitle'>Create a free account with your email.</span>
        <div className='form-container'>
          <input
            type='text'
            className='input'
            placeholder='Full Name'
            value={fullName}
            onChange={() => setFullName(fullName)}
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
          Employer? Sign up <Link to='/employers'>here</Link>{' '}
        </p>
        <p>
          Have an account? <Link onClick={handleClick}>Log in</Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default SignUp;