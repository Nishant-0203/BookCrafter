import React from 'react'
import { Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />}/>
    </Routes>
  )
}
export default App;