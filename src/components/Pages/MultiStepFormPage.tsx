import React, { useState } from 'react';
import {
  Form,
  ProgressIndicator,
  ProgressStep,
  TextInput,
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import DataTableComponent from './DataModel';
import Button from '../Button/Button';
import DatePickerComponent from '../DatePickerForm/DatePickerForm';
import UploadFile from '../UploadFile/FileUploader';
import TreeNodeComponent from '../Tree/TreeNodeComponent';

const MultiStepFormPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [isNode3Expanded, setIsNode3Expanded] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/register');
    }
  };

  const handleSelect = (event: { id: string }) => {
    const { id } = event;
    setSelectedNodes((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((nodeId) => nodeId !== id)
        : [...prevSelected, id]
    );
  };

  const toggleNode3Expansion = () => {
    setIsNode3Expanded(!isNode3Expanded);
  };

  return (
    <div
      className='multi-step-form-page'
      style={{ display: 'flex', height: '100vh', padding: '20px', gap: '20px' }}
    >
      <div className='left-panel'>
        <h1>REGISTER NOW TO LEARN MORE ABOUT IBM CARBON!</h1>
      </div>
      <div className='right-panel'>
        <div className='form-container'>
          <h2>Multi-Step Form With Progress Indicator</h2>
          <ProgressIndicator currentIndex={currentStep}>
            <ProgressStep label='Step 1' description='Personal Info' />
            <ProgressStep label='Step 2' description='Upload File' />
            <ProgressStep label='Step 3' description='Review' />
            <ProgressStep label='Step 4' description='Data Table' />
          </ProgressIndicator>
          {currentStep === 0 && (
            <Form>
              <DatePickerComponent />
              <div className='button-group'>
                <Button kind='secondary' onClick={handlePrev}>
                  Back
                </Button>
                <Button kind='primary' onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
          {currentStep === 1 && (
            <Form>
              <UploadFile />
              <div className='button-group'>
                <Button kind='secondary' onClick={handlePrev}>
                  Back
                </Button>
                <Button kind='primary' onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
          {currentStep === 2 && (
            <Form>
              <TreeNodeComponent
                selectedNodes={selectedNodes}
                handleSelect={handleSelect}
                toggleNode3Expansion={toggleNode3Expansion}
                isNode3Expanded={isNode3Expanded}
              />
              <div className='button-group'>
                <Button kind='secondary' onClick={handlePrev}>
                  Back
                </Button>
                <Button kind='primary' onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
          {currentStep === 3 && (
            <Form>
              <DataTableComponent />
              <div className='button-group'>
                <Button kind='secondary' onClick={handlePrev}>
                  Back
                </Button>
                <Button kind='primary' onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepFormPage;
