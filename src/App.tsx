import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { AccessTokenProvider } from './contexts/AccessTokenContext';
import Router from './routing/Router';
import Header from './header/Header';

function App() {

  return (
    <BrowserRouter>
      <AccessTokenProvider>
        <Header />
        <Router />
      </AccessTokenProvider>
    </BrowserRouter>
  );
}

export default App
