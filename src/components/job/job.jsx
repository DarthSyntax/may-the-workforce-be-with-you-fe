import React from 'react';
import { useNavigate } from 'react-router-dom';
import './job.css';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/jobs/${e.target.id}`);
  };

  return (
    <div className='job-listing' onClick={handleClick} id={`${job.id}`}>
      <span id={`${job.id}`}>Employer</span> <br />
      <span id={`${job.id}`}>Job Title: {job.title}</span> <br />
      <span id={`${job.id}`}>Salary: {job.salary}</span> <br />
      <span id={`${job.id}`}>Experience Level: {job.exp_level}</span>
    </div>
  );
};

export default Job;
