import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@carbon/react';

interface SecondaryButtonProps {
  buttonName: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ buttonName }) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/')}
      kind='secondary'
      className='bx--btn--secondary'
    >
      {buttonName}
    </Button>
  );
};

export default SecondaryButton;
