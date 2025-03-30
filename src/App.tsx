import React, { useContext } from 'react';
import './App.css'
import Spinner from './components/Spinner';
import { ProductContextData } from './context/ContextData';
import MainLayout from './Panel/MainLayout';
import { BrowserRouter as Router } from "react-router-dom";
import AutoLogout from './components/AutoLogout';

function App() {
  let getUserRole: string | null = null;

  const context = useContext(ProductContextData)
  if (!context) {
    throw new Error('it should not be null');
  }
  const { appLoader } = context
  const storedProfile = localStorage.getItem('userProfile');
  if (storedProfile) {
    try {
      const parsedProfile = JSON.parse(storedProfile);
      getUserRole = parsedProfile?.role || null;
    } catch (error) {
      console.error('Error parsing user profile from local storage:', error);
    }
  }


  return (
   <React.Fragment>
     <Router>
      <MainLayout userRole={getUserRole} />
      {appLoader && <Spinner />}
      <AutoLogout/>
    </Router>
   
   </React.Fragment>
  )
}

export default App
