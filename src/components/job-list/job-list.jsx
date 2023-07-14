import React from 'react';
import './job-list.css';
import Job from '../job/job';

const JobList = ({ jobs }) => {
  return (
    <div className='job-list'>
      {jobs?.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
