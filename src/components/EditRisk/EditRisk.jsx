import React, { useState, useEffect } from 'react';
import {
  Modal,
  TextInput,
  Dropdown,
  Button,
  TextArea,
  DatePicker,
  DatePickerInput,
  ProgressIndicator,
  ProgressStep,
} from '@carbon/react';
import { User, Document, Settings } from '@carbon/icons-react';
import './EditRisk.css';
import AdvancedModal from './AdvancedModal';

const EditRiskDialog = ({ open, onClose, riskData, onSave }) => {
  const [activePanel, setActivePanel] = useState('riskDetails');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState('');
  const [impact, setImpact] = useState('');
  const [owner, setOwner] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [advancedModalOpen, setAdvancedModalOpen] = useState(false);

  useEffect(() => {
    if (riskData && riskData.cells) {
      riskData.cells.forEach((cell) => {
        switch (cell.info.header) {
          case 'name':
            setName(cell.value);
            break;
          case 'description':
            setDescription(cell.value);
            break;
          case 'type':
            setType(cell.value);
            break;
          case 'level':
            setLevel(cell.value);
            break;
          case 'impact':
            setImpact(cell.value);
            break;
          case 'owner':
            setOwner(cell.value);
            break;
          case 'creationDate':
            setCreationDate(cell.value);
            break;
          default:
            break;
        }
      });
    }
  }, [riskData]);

  const handleSave = () => {
    if (!name || !description) {
      alert('Name and Description are mandatory');
      return;
    }
    onSave({ name, description, type, level, impact, owner, creationDate });
    onClose();
  };

  const renderRiskDetailsPanel = () => (
    <div className='panel'>
      <h4 className='panel-title'>Risk Details</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <TextInput
        id='name'
        labelText='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextArea
        id='description'
        labelText='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className='drop-down row'>
        <Dropdown
          id='type'
          titleText='Type'
          label=''
          items={['Sensitive Access', 'Non-sensitive Access']}
          selectedItem={type}
          onChange={(e) => setType(e.selectedItem)}
        />
        <Dropdown
          id='level'
          titleText='Level'
          label=''
          items={['Low', 'Medium', 'High']}
          selectedItem={level}
          onChange={(e) => setLevel(e.selectedItem)}
        />
      </div>
      <TextArea
        id='impact'
        labelText='Impact'
        value={impact}
        onChange={(e) => setImpact(e.target.value)}
        disabled
      />
      <div className='owner-row'>
        <TextInput
          id='owner'
          labelText='Owner'
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          disabled
        />
        <Button onClick={() => setAdvancedModalOpen(true)}>Advanced</Button>
      </div>
      <DatePicker
        dateFormat='Y-m-d H:i:s'
        datePickerType='single'
        value={creationDate}
      >
        <DatePickerInput
          id='creation-date'
          placeholder='yyyy-mm-dd hh:mm:ss'
          labelText='Creation Date'
          value={creationDate}
          onChange={(e) => setCreationDate(e.target.value)}
        />
      </DatePicker>
    </div>
  );

  const renderBusinessActivitiesPanel = () => (
    <div className='panel'>
      <h4 className='panel-title'>Business Activities</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <TextInput
        id='name'
        labelText='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextArea
        id='description'
        labelText='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className='drop-down row'>
        <Dropdown
          id='type'
          titleText='Type'
          label=''
          items={['Sensitive Access', 'Non-sensitive Access']}
          selectedItem={type}
          onChange={(e) => setType(e.selectedItem)}
        />
        <Dropdown
          id='level'
          titleText='Level'
          label=''
          items={['Low', 'Medium', 'High']}
          selectedItem={level}
          onChange={(e) => setLevel(e.selectedItem)}
        />
      </div>
      <TextArea
        id='impact'
        labelText='Impact'
        value={impact}
        onChange={(e) => setImpact(e.target.value)}
        disabled
      />
      <div className='owner-row'>
        <TextInput
          id='owner'
          labelText='Owner'
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          disabled
        />
        <Button onClick={() => setAdvancedModalOpen(true)}>Advanced</Button>
      </div>
      <DatePicker
        dateFormat='Y-m-d H:i:s'
        datePickerType='single'
        value={creationDate}
      >
        <DatePickerInput
          id='creation-date'
          placeholder='yyyy-mm-dd hh:mm:ss'
          labelText='Creation Date'
          value={creationDate}
          onChange={(e) => setCreationDate(e.target.value)}
        />
      </DatePicker>
    </div>
  );

  const renderMitigationControlsPanel = () => (
    <div className='panel'>
      <h4 className='panel-title'>MitigationControls</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <TextInput
        id='name'
        labelText='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextArea
        id='description'
        labelText='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className='drop-down row'>
        <Dropdown
          id='type'
          titleText='Type'
          label=''
          items={['Sensitive Access', 'Non-sensitive Access']}
          selectedItem={type}
          onChange={(e) => setType(e.selectedItem)}
        />
        <Dropdown
          id='level'
          titleText='Level'
          label=''
          items={['Low', 'Medium', 'High']}
          selectedItem={level}
          onChange={(e) => setLevel(e.selectedItem)}
        />
      </div>
      <TextArea
        id='impact'
        labelText='Impact'
        value={impact}
        onChange={(e) => setImpact(e.target.value)}
        disabled
      />
      <div className='owner-row'>
        <TextInput
          id='owner'
          labelText='Owner'
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          disabled
        />
        <Button onClick={() => setAdvancedModalOpen(true)}>Advanced</Button>
      </div>
      <DatePicker
        dateFormat='Y-m-d H:i:s'
        datePickerType='single'
        value={creationDate}
      >
        <DatePickerInput
          id='creation-date'
          placeholder='yyyy-mm-dd hh:mm:ss'
          labelText='Creation Date'
          value={creationDate}
          onChange={(e) => setCreationDate(e.target.value)}
        />
      </DatePicker>
    </div>
  );

  const getCurrentIndex = () => {
    switch (activePanel) {
      case 'riskDetails':
        return 0;
      case 'businessActivities':
        return 1;
      case 'mitigationControls':
        return 2;
      default:
        return 0;
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < 2) {
      switch (currentIndex) {
        case 0:
          setActivePanel('businessActivities');
          break;
        case 1:
          setActivePanel('mitigationControls');
          break;
        default:
          break;
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      switch (currentIndex) {
        case 1:
          setActivePanel('riskDetails');
          break;
        case 2:
          setActivePanel('businessActivities');
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        primaryButtonText='Save changes'
        secondaryButtonText='Cancel'
        onRequestClose={onClose}
        onRequestSubmit={handleSave}
        size='lg'
      >
        <div className='edit-risk-dialog'>
          <div className='sidebar'>
            <h4 className='title-sidebar'>Edit Risk</h4>
            <p className='sidebar-p'>Make changes to your risk settings.</p>
            <ProgressIndicator vertical currentIndex={getCurrentIndex()}>
              <ProgressStep
                label='Risk Details'
                description='Edit Risk Details'
              />
              <ProgressStep
                label='Business Activities'
                description='Edit Business Activities'
              />
              <ProgressStep
                label='Mitigation Controls'
                description='Edit Mitigation Controls'
              />
            </ProgressIndicator>
          </div>
          <div className='panel-content'>
            {activePanel === 'riskDetails' && renderRiskDetailsPanel()}
            {activePanel === 'businessActivities' &&
              renderBusinessActivitiesPanel()}
            {activePanel === 'mitigationControls' &&
              renderMitigationControlsPanel()}
            <div className='navigation-buttons'>
              <Button
                className='prev-button'
                onClick={handlePrevious}
                disabled={getCurrentIndex() === 0}
              >
                Previous
              </Button>
              <Button
                className='next-button'
                onClick={handleNext}
                disabled={getCurrentIndex() === 2}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <AdvancedModal
        isOpen={advancedModalOpen}
        onClose={() => setAdvancedModalOpen(false)}
        onSelect={(selectedRow) =>
          setOwner(
            selectedRow.cells.find((cell) => cell.info.header === 'name').value
          )
        }
      />
    </>
  );
};

export default EditRiskDialog;
