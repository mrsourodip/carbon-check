import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/Pages/WelcomePage';
import RegisterPage from './components/Pages/RegisterPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={WelcomePage} />
        <Route path='/register' Component={RegisterPage} />
      </Routes>
    </Router>
  );
};

export default App;
