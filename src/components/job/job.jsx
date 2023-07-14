import React from 'react';
import { useNavigate } from 'react-router-dom';
import './job.css';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div className='job-listing' onClick={handleClick}>
      <span>Job Title: {job.title}</span> <br />
      <span>Job Description: {job.description}</span> <br />
      <span>Salary: {job.salary}</span> <br />
      <span>Experience Level: {job.exp_level}</span>
    </div>
  );
};

export default Job;
