import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Dropdown, Button } from '@carbon/react';

const EditModal = ({ isOpen, onClose, onSave, rowData }) => {
  const [selectedSection, setSelectedSection] = useState('Risk Details');
  const [formData, setFormData] = useState({
    name: rowData.name,
    type: rowData.type,
    status: rowData.status,
    level: rowData.level,
  });

  useEffect(() => {
    setFormData({
      name: rowData.name,
      type: rowData.type,
      status: rowData.status,
      level: rowData.level,
    });
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropdownChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value.selectedItem,
    });
  };

  const isSaveDisabled =
    !formData.name || !formData.type || !formData.status || !formData.level;

  return (
    <Modal
      open={isOpen}
      modalHeading='Edit Risk'
      primaryButtonText='Save'
      secondaryButtonText='Cancel'
      onRequestClose={onClose}
      onRequestSubmit={() => onSave(formData)}
      primaryButtonDisabled={isSaveDisabled}
      secondaryButtonDisabled={false}
    >
      <div className='modal-content'>
        <div className='left-panel'>
          <Button
            kind='ghost'
            onClick={() => setSelectedSection('Risk Details')}
          >
            Risk Details
          </Button>
          <Button
            kind='ghost'
            onClick={() => setSelectedSection('Business Activities')}
            disabled
          >
            Business Activities
          </Button>
          <Button
            kind='ghost'
            onClick={() => setSelectedSection('Mitigation Controls')}
            disabled
          >
            Mitigation Controls
          </Button>
        </div>
        <div className='right-panel'>
          {selectedSection === 'Risk Details' && (
            <div className='risk-details'>
              <TextInput
                id='name'
                name='name'
                labelText='Name'
                value={formData.name}
                onChange={handleInputChange}
              />
              <Dropdown
                id='type'
                label='Type'
                items={['Type A', 'Type B', 'Type C']}
                selectedItem={formData.type}
                onChange={(e) => handleDropdownChange('type', e)}
              />
              <Dropdown
                id='status'
                label='Status'
                items={['Active', 'Inactive']}
                selectedItem={formData.status}
                onChange={(e) => handleDropdownChange('status', e)}
              />
              <Dropdown
                id='level'
                label='Level'
                items={['Low', 'Medium', 'High']}
                selectedItem={formData.level}
                onChange={(e) => handleDropdownChange('level', e)}
              />
            </div>
          )}
          {selectedSection !== 'Risk Details' && (
            <div className='placeholder'>
              <p>{selectedSection} content will go here.</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
