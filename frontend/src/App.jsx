import React from 'react'
import { Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Dashboard from './pages/DashBoardPage.jsx';
import EditorPage from './pages/EditorPage.jsx';
import ViewBookPage from './pages/ViewBookPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />}/>

      {/*Protected Routes*/}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/editor/:bookId" element={<ProtectedRoute><EditorPage /></ProtectedRoute>} />
      <Route path="/view-book/:bookId" element={<ProtectedRoute><ViewBookPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    </Routes>
  )
}
export default App;