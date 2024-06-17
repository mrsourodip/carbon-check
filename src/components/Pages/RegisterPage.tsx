import React from 'react';
import { Form, TextInput, Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

// const RegisterPage: React.FC = () => {
//   const history = useNavigate();

//   return (
//     <div
//       className='register-page'
//       style={{ display: 'flex', height: '100vh', padding: '20px', gap: '20px' }}
//     >
//       <div className='left-panel'>
//         <h1>REGISTER NOW TO LEARN MORE ABOUT IBM CARBON!</h1>
//       </div>
//       <div className='right-panel'>
//         <div className='form-container'>
//           <h2>FORM</h2>
//           <Form>
//             <div className='bx--form-item'>
//               <TextInput
//                 id='name'
//                 labelText='Name'
//                 className='bx--text-input'
//               />
//             </div>
//             <div className='bx--form-item'>
//               <TextInput
//                 id='email'
//                 labelText='Email'
//                 className='bx--text-input'
//               />
//             </div>
//             <div className='bx--form-item'>
//               <TextInput
//                 id='password'
//                 labelText='Password'
//                 type='password'
//                 className='bx--text-input'
//               />
//             </div>
//             <div className='button-group'>
//               <Button kind='primary' type='submit'>
//                 Submit
//               </Button>
//               <Button kind='secondary' onClick={() => history('/')}>
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

const RegisterPage: React.FC = () => {
  const history = useNavigate();

  return (
    <div
      className='register-page'
      style={{ display: 'flex', height: '100vh', padding: '20px', gap: '20px' }}
    >
      <div className='left-panel'>
        <h1>REGISTER NOW TO LEARN MORE ABOUT IBM CARBON!</h1>
      </div>
      <div className='right-panel'>
        <div className='form-container'>
          <h2>FORM</h2>
          <Form>
            <div className='bx--form-item'>
              <TextInput
                id='name'
                labelText='Name'
                className='bx--text-input'
              />
            </div>
            <div className='bx--form-item'>
              <TextInput
                id='email'
                labelText='Email'
                className='bx--text-input'
              />
            </div>
            <div className='bx--form-item'>
              <TextInput
                id='password'
                labelText='Password'
                type='password'
                className='bx--text-input'
              />
            </div>
            <div className='button-group'>
              <Button kind='primary' onClick={() => history('/multi-step')}>
                Next
              </Button>
              <Button kind='secondary' onClick={() => history('/')}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
