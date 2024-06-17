import React, { useState } from 'react';
import {
  Form,
  Button,
  ProgressIndicator,
  ProgressStep,
  DatePicker,
  DatePickerInput,
  FileUploader,
  Modal,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TextInput,
} from '@carbon/react';

import TreeView from '@carbon/react/lib/components/TreeView/TreeView';
import TreeNode from '@carbon/react/lib/components/TreeView/TreeNode';

import { useNavigate } from 'react-router-dom';

// const MultiStepFormPage = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedNodes, setSelectedNodes] = useState([]);
//   const navigate = useNavigate();

//   const handleNext = () => {
//     if (currentStep < 2) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Final step action (e.g., submit the form)
//       navigate('/');
//     }
//   };

//   const handlePrev = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSelect = (event) => {
//     const { id } = event;
//     setSelectedNodes((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((nodeId) => nodeId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   return (
//     <div
//       className='multi-step-form-page'
//       style={{ display: 'flex', height: '100vh', padding: '20px', gap: '20px' }}
//     >
//       <div className='left-panel'>
//         <h1>REGISTER NOW TO LEARN MORE ABOUT IBM CARBON!</h1>
//       </div>
//       <div className='right-panel'>
//         <div className='form-container'>
//           <h2>Multi-Step Form</h2>
//           <ProgressIndicator currentIndex={currentStep}>
//             <ProgressStep label='Step 1' description='Personal Info' />
//             <ProgressStep label='Step 2' description='Upload File' />
//             <ProgressStep label='Step 3' description='Review' />
//           </ProgressIndicator>
//           {/* date-picker */}
//           {currentStep === 0 && (
//             <Form>
//               <div className='bx--form-item'>
//                 <DatePicker dateFormat='m/d/Y' datePickerType='single'>
//                   <DatePickerInput
//                     id='date-picker-single'
//                     placeholder='mm/dd/yyyy'
//                     labelText='Select Date'
//                     type='text'
//                   />
//                 </DatePicker>
//               </div>
//               <div className='button-group'>
//                 <Button
//                   kind='secondary'
//                   onClick={handlePrev}
//                   disabled={currentStep === 0}
//                 >
//                   Back
//                 </Button>
//                 <Button kind='primary' onClick={handleNext}>
//                   Next
//                 </Button>
//               </div>
//             </Form>
//           )}
//           {/* File Upload  */}
//           {currentStep === 1 && (
//             <Form>
//               <div className='bx--form-item'>
//                 <FileUploader
//                   filenameStatus='edit'
//                   labelTitle='Upload'
//                   labelDescription='Only .jpg and .png files. 500kb max file size.'
//                   buttonLabel='Add file'
//                   accept={['.jpg', '.png']}
//                 />
//               </div>
//               <div className='button-group'>
//                 <Button kind='secondary' onClick={handlePrev}>
//                   Back
//                 </Button>
//                 <Button kind='primary' onClick={handleNext}>
//                   Next
//                 </Button>
//               </div>
//             </Form>
//           )}
//           {/* tree-view */}
//           {currentStep === 2 && (
//             <Form>
//               <TreeView
//                 label='TreeView'
//                 selected={selectedNodes}
//                 onSelect={handleSelect}
//               >
//                 <TreeNode id='node-1' label='Node 1' isExpanded>
//                   <TreeNode id='node-1-1' label='Node 1.1' />
//                 </TreeNode>
//                 <TreeNode id='node-2' label='Node 2' />
//               </TreeView>
//               <div className='button-group'>
//                 <Button kind='secondary' onClick={handlePrev}>
//                   Back
//                 </Button>
//                 <Button kind='primary' onClick={handleNext}>
//                   Submit
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

const MultiStepFormPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    row: string;
    column: string;
  } | null>(null);
  const [cellData, setCellData] = useState<{
    [key: string]: { [key: string]: string };
  }>({});
  const [modalInput, setModalInput] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step action (e.g., submit the form)
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelect = (event: any) => {
    const { id } = event;
    setSelectedNodes((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((nodeId) => nodeId !== id)
        : [...prevSelected, id]
    );
  };

  const openModal = (row: string, column: string) => {
    setSelectedCell({ row, column });
    setModalInput(cellData[row]?.[column] || '');
    setModalOpen(true);
  };

  const handleModalSave = () => {
    if (selectedCell) {
      setCellData((prevData) => ({
        ...prevData,
        [selectedCell.row]: {
          ...prevData[selectedCell.row],
          [selectedCell.column]: modalInput,
        },
      }));
      setModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const columns = ['p', 'q', 'r', 's'];
  const rows = ['w', 'x', 'y', 'z'];

  const tableHeaders = columns.map((col) => ({ header: col, key: col }));
  const tableRows = rows.map((row) => ({
    id: row,
    ...columns.reduce((acc, col) => {
      acc[col] = cellData[row]?.[col] || '';
      return acc;
    }, {} as { [key: string]: string }),
  }));

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
          <h2>Multi-Step Form</h2>
          <ProgressIndicator currentIndex={currentStep}>
            <ProgressStep label='Step 1' description='Personal Info' />
            <ProgressStep label='Step 2' description='Upload File' />
            <ProgressStep label='Step 3' description='Review' />
            <ProgressStep label='Step 4' description='Data Table' />
          </ProgressIndicator>

          {currentStep === 0 && (
            <Form>
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
              <div className='button-group'>
                <Button
                  kind='secondary'
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                >
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
              <div className='bx--form-item'>
                <FileUploader
                  filenameStatus='edit'
                  labelTitle='Upload'
                  labelDescription='Only .jpg and .png files. 500kb max file size.'
                  buttonLabel='Add file'
                  accept={['.jpg', '.png']}
                />
              </div>
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
              <TreeView selected={selectedNodes} onSelect={handleSelect}>
                <TreeNode id='node-1' label='Node 1' isExpanded>
                  <TreeNode id='node-1-1' label='Node 1.1' />
                </TreeNode>
                <TreeNode id='node-2' label='Node 2' />
              </TreeView>
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
              <DataTable rows={tableRows} headers={tableHeaders}>
                {({ rows, headers, getHeaderProps, getRowProps }) => (
                  <Table>
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableHeader
                            {...getHeaderProps({ header })}
                            key={header.key}
                            onClick={(
                              event: React.MouseEvent<
                                HTMLButtonElement,
                                MouseEvent
                              >
                            ) => {
                              // Handle click event for table header
                              console.log('Header clicked:', header.key);
                            }}
                          >
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow {...getRowProps({ row })} key={row.id}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </DataTable>

              <Modal
                open={modalOpen}
                modalHeading={`Enter data for ${selectedCell?.row}, ${selectedCell?.column}`}
                primaryButtonText='Save'
                secondaryButtonText='Cancel'
                onRequestSubmit={handleModalSave}
                onRequestClose={handleModalClose}
              >
                <TextInput
                  id='modal-input'
                  labelText='Data'
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                />
              </Modal>

              <div className='button-group'>
                <Button kind='secondary' onClick={handlePrev}>
                  Back
                </Button>
                <Button kind='primary' onClick={handleNext}>
                  Submit
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
