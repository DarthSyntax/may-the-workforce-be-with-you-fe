import React, { useState } from 'react';
import './signup-login-page.css';
import SignUp from '../../components/signup/signup';
import Login from '../../components/login/login';

const SignUpLoginPage = () => {
  const [login, setLogin] = useState(false);
  return (
    <div className='auth-container'>
      {login ? <Login setLogin={setLogin} /> : <SignUp setLogin={setLogin} />}
    </div>
  );
};

export default SignUpLoginPage;
