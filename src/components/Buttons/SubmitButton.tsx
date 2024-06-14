import React from 'react';
import { Button } from '@carbon/react';

interface PrimaryButtonProps {
  buttonName: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ buttonName }) => {
  return (
    <Button type='submit' kind='primary' className='bx--btn--primary'>
      {buttonName}
    </Button>
  );
};

export default PrimaryButton;
