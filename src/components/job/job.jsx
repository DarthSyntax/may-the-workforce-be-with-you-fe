import React from 'react';
import './job.css';

const Job = ({ job }) => {
  return (
    <div className='job-listing'>
      <span>{job.name}</span> <br />
      <span>{job.description}</span> <br />
      <span>{job.salary}</span> <br />
    </div>
  );
};

export default Job;
