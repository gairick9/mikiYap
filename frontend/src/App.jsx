import Navbar from './components/Navbar.jsx';

import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { useAuthStore } from './store/useAuthStore.js';

import { useThemeStore } from './store/useThemeStore.js';

import { useEffect } from 'react';

import {Loader} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();

  console.log( {onlineUsers }); 

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser) {
    return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-20 animate-spin"/>
    </div>
    )};

  return (

    <div data-theme={theme}>
        

    <Navbar/>

    <Routes>
      <Route path="/" element={authUser ? <HomePage/> : <Navigate to = "/login"/>}/>
      <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to = "/homepage"/>}/>
      <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to = "/homepage"/>}/>
      <Route path="/settings" element={<SettingsPage/>}/>
      <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to = "/login"/>}/>
      <Route path="/homepage" element={authUser ? <HomePage/> : <Navigate to = "/login"/>}/>

    </Routes>

    <Toaster/>
    </div>
    
  )
}

export default App;