import React, { useState, useContext } from 'react';
import './emp-add-job-modal.css';
import {
  Button,
  Modal,
  Box,
  Typography,
  MenuItem,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import { StateContext } from '../../context';

const EmployerAddJobModal = () => {
  const [open, setOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const { setJobs, currentEmployer } = useContext(StateContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jobTitle && description && salary && experienceLevel) {
      const req = await fetch('http://localhost:9000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employer_id: currentEmployer.id,
          title: jobTitle,
          description: description,
          salary: salary,
          exp_level: experienceLevel,
        }),
      });

      const reqJson = await req.json();
      console.log(reqJson);
      setJobs((prev) => [reqJson, ...prev]);

      console.log('Form submitted:', {
        jobTitle,
        description,
        salary,
        experienceLevel,
      });

      // Reset form values
      setJobTitle('');
      setDescription('');
      setSalary('');
      setExperienceLevel('');

      // Close the modal
      handleClose();
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <div className='emp-add-job'>
      <Button variant='contained' onClick={handleOpen}>
        Add New Job
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant='h6' component='h2'>
            Add New Job
          </Typography>
          <Typography variant='body1'>Define job details below.</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Job Title'
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              fullWidth
              required
              margin='normal'
            />
            <TextareaAutosize
              aria-label='Description'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rowsMin={3}
              fullWidth
              required
              style={{ marginTop: '16px', marginBottom: '16px' }}
            />
            <TextField
              label='Salary'
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              type='number'
              fullWidth
              required
              margin='normal'
            />
            <TextField
              select
              label='Experience Level'
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              fullWidth
              required
              margin='normal'
            >
              <MenuItem value='Entry Level'>Entry Level</MenuItem>
              <MenuItem value='Mid Level'>Mid Level</MenuItem>
              <MenuItem value='Senior Level'>Senior Level</MenuItem>
            </TextField>
            <Button
              type='submit'
              variant='contained'
              style={{ marginTop: '16px' }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EmployerAddJobModal;
