import React from 'react';
import { Grid, Row, Column, TextInput, Button } from '@carbon/react';
import 'carbon-components/css/carbon-components.min.css';
import './FormComponent.css';

const FormComponent: React.FC = () => {
  return (
    <div className='container'>
      <Grid fullWidth>
        <Row>
          <Column lg={4} md={4} sm={12}>
            <TextInput
              id='name'
              labelText='Name'
              placeholder='Enter your name'
              required
            />
          </Column>
          <Column lg={4} md={4} sm={12}>
            <TextInput
              id='email'
              labelText='Email'
              type='email'
              placeholder='Enter your email'
              required
            />
          </Column>
          <Column lg={4} md={4} sm={12}>
            <TextInput
              id='phone'
              labelText='Phone'
              type='tel'
              placeholder='Enter your phone number'
              required
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Button type='submit' className='submit-button'>
              Submit
            </Button>
          </Column>
        </Row>
      </Grid>
    </div>
  );
};

export default FormComponent;
