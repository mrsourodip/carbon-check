import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/Pages/WelcomePage';
import RegisterPage from './components/Pages/RegisterPage';
import MultiStepFormPage from './components/Pages/MultiStepFormPage';
import DataTables from './components/DataTable/DataTable';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={WelcomePage} />
        <Route path='/register' Component={RegisterPage} />
        <Route path='/multi-step' Component={MultiStepFormPage} />
        <Route path='/data-table' Component={DataTables} />
      </Routes>
    </Router>
  );
};

export default App;
