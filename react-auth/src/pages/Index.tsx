// import React from 'react'

// Import components
import LoginScreen from "../components/LoginScreen";
import RegisterScreen from "../components/RegisterScreen";

// States
import { useState } from "react";

const Home = () => {

  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');

  const switchToRegister = () => setCurrentScreen('register');
  const switchToLogin = () => setCurrentScreen('login');

  return (
    <>
      {currentScreen == "login" ? (
        <LoginScreen onSwitchToRegister={switchToRegister} />
      ): (
        <RegisterScreen onSwitchToLogin={switchToLogin} />
      )}
    </>
  );
}

export default Home;
