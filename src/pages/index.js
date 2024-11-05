import React, { useState } from 'react';
import SignupForm from './api/SignupForm';
import LoginForm from '../../components/LoginForm';
import Widget from '../../components/Widget';
const HomePage = () => {
  // const [isLogin, setIsLogin] = useState(false);

  // const switchToSignup = () => setIsLogin(false);
  // const switchToLogin = () => setIsLogin(true);

  return (
    <div>
      {/* {isLogin ? (
        <LoginForm switchToSignup={switchToSignup} />
      ) : (
        <SignupForm switchToLogin={switchToLogin} />
      )} */}
      <Widget />
    </div>
    
  );
};

export default HomePage;
