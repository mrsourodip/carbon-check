import React from 'react';
import { Button as CarbonButton } from '@carbon/react';

interface ButtonProps {
  kind: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ kind, onClick, children }) => {
  return (
    <CarbonButton kind={kind} onClick={onClick}>
      {children}
    </CarbonButton>
  );
};

export default Button;
