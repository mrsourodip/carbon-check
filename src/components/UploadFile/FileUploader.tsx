import React from 'react';
import { FileUploader } from '@carbon/react';

const UploadFile: React.FC = () => {
  return (
    <div className='bx--form-item'>
      <FileUploader
        filenameStatus='edit'
        labelTitle='Upload'
        labelDescription='Only .jpg and .png files. 500kb max file size.'
        buttonLabel='Add file'
        accept={['.jpg', '.png']}
      />
    </div>
  );
};

export default UploadFile;
