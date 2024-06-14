import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from './FormField';
import PrimaryButton from '../Buttons/SubmitButton';
import SecondaryButton from '../Buttons/HomeButton';
import './FormPage.css';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  favoriteColor: string;
}

const FormPage: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    favoriteColor: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    favoriteColor: Yup.string().required('Required'),
  });

  const onSubmit = async (values: FormValues) => {
    const json = JSON.stringify(values, null, 2);
    console.log(json);
    alert('Form submitted successfully!');
  };

  return (
    <div className='form-page'>
      <h2 className='form-heading'>Let's get to know more about you</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className='form-container'>
            <div className='bx--grid'>
              <FormField
                label='Name'
                id='name'
                name='name'
                labelText='Name'
                errors={errors}
                touched={touched}
              />
              <FormField
                label='Email'
                id='email'
                name='email'
                labelText='Email'
                errors={errors}
                touched={touched}
              />
              <FormField
                label='Phone'
                id='phone'
                name='phone'
                labelText='Phone'
                errors={errors}
                touched={touched}
              />
              <FormField
                label='Password'
                id='password'
                name='password'
                labelText='Password'
                errors={errors}
                touched={touched}
              />
              <FormField
                label='Favorite Color'
                id='favoriteColor'
                name='favoriteColor'
                labelText='Favorite Color'
                errors={errors}
                touched={touched}
              />
              <div className='bx--row button-row'>
                <div className='bx--col'>
                  <PrimaryButton buttonName='Submit' />
                  <SecondaryButton buttonName='Home' />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormPage;
