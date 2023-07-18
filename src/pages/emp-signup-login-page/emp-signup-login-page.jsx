import React, { useState } from 'react';
import './emp-signup-login-page.css';
import EmployerSignUp from '../../components/emp-signup/emp-signup';
import EmployerLogin from '../../components/emp-login/emp-login';

const EmployerSignUpLoginPage = () => {
  const [login, setLogin] = useState(false);
  return (
    <div className='auth-container'>
      {!login ? (
        <EmployerLogin setLogin={setLogin} />
      ) : (
        <EmployerSignUp setLogin={setLogin} />
      )}
    </div>
  );
};

export default EmployerSignUpLoginPage;
