import React from 'react';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import Navbar from './components/Navbar/Navbar'; // Ensure Navbar's path matches your structure
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart'; // Updated path to ensure correct import
import Profile from './components/Navbar/Profile/Profile'
import CustomerRoute from './Routers/CustomerRoute'

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      {/* Render components based on the current page or logic */}
      <Home />
      <Cart />
      <Profile/>
      <CustomerRoute/>
    </ThemeProvider>
  );
}

export default App;
