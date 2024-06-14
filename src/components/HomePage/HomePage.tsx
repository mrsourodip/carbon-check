import React from 'react';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToForm = () => {
    navigate('/form');
  };

  const navigateToDocs = () => {
    window.location.href = 'https://www.carbondesignsystem.com/';
  };

  return (
    <div className='home-page'>
      <h1>Welcome User</h1>
      <div className='button-container'>
        <Button onClick={navigateToForm} kind='primary'>
          Go to Form
        </Button>
        <Button onClick={navigateToDocs} kind='secondary'>
          Carbon Design Docs
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
