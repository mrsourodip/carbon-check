import React from 'react';
import { Button } from '@carbon/react';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  return (
    <div
      className='welcome-page'
      style={{ display: 'flex', height: '100vh', padding: '20px', gap: '20px' }}
    >
      <div className='left-panel'>
        <h1>WELCOME</h1>
        <p>USER</p>
      </div>
      <div className='right-panel'>
        <div className='content-box'>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance.
          </p>
        </div>
        <div className='button-group'>
          <Link to='/register'>
            <Button kind='primary'>REGISTER</Button>
          </Link>
          <Button kind='secondary'>LEARN MORE</Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
