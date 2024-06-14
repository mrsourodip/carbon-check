import React from 'react';
import { useField } from 'formik';
import { TextInput } from '@carbon/react';

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  labelText: string;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  labelText,
  errors,
  touched,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className='bx--row'>
      <div className='bx--col'>
        <label htmlFor={id} className='bx--label'>
          {label}
        </label>
        <TextInput
          id={id}
          name={name}
          labelText={labelText}
          invalid={Boolean(errors[name] && touched[name])}
          invalidText={errors[name]}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          className='bx--text-input'
        />
        {errors[name] && touched[name] && (
          <div className='error-message'>{errors[name]}</div>
        )}
      </div>
    </div>
  );
};

export default FormField;
