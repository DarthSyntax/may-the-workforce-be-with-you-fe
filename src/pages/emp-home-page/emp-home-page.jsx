import React, { useContext, useLayoutEffect } from 'react';
import './emp-home-page.css';
import { StateContext } from '../../context';
import JobList from '../../components/job-list/job-list';
import EmployerAddJobModal from '../../components/emp-add-job-modal/emp-add-job-modal';

const EmployerHomePage = () => {
  const { currentEmployer, jobs, setJobs } = useContext(StateContext);

  const fetchJobs = async () => {
    const res = await fetch(
      `http://localhost:9000/employers/${currentEmployer.id}`
    );
    const resJson = await res.json();

    setJobs(resJson.jobs);
  };

  useLayoutEffect(() => {
    if (!jobs) {
      fetchJobs();
    }
  }, [jobs]);

  return (
    <div className='emp-home-page'>
      <EmployerAddJobModal />
      <h3>List of posted Jobs: </h3>
      <JobList jobs={jobs} />
    </div>
  );
};

export default EmployerHomePage;
