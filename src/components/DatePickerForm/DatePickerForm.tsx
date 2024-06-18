import React from 'react';
import { DatePicker, DatePickerInput } from '@carbon/react';

const DatePickerComponent: React.FC = () => {
  return (
    <div className='bx--form-item'>
      <DatePicker dateFormat='m/d/Y' datePickerType='single'>
        <DatePickerInput
          id='date-picker-single'
          placeholder='mm/dd/yyyy'
          labelText='Select Date'
          type='text'
        />
      </DatePicker>
    </div>
  );
};

export default DatePickerComponent;
