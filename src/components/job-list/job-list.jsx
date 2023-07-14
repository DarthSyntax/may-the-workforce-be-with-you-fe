import React from 'react';
import './job-list.css';
import Job from '../job/job';

const JobList = (jobsList) => {
  return (
    <div>
      {jobsList.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
