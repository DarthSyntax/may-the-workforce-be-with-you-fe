import React, { useContext, useLayoutEffect } from 'react';
import './home-page.css';
import { StateContext } from '../../context';
import JobList from '../../components/job-list/job-list';
import FilterSearchBar from '../../components/filter-searchbar/filter-searchbar';

const HomePage = () => {
  const { jobs, setJobs } = useContext(StateContext);

  const fetchJobs = async () => {
    const res = await fetch('http://localhost:9000/jobs');
    const data = await res.json();
    await setJobs(data);
  };

  useLayoutEffect(() => {
    if (!jobs) {
      fetchJobs();
    }
  }, []);

  return (
    <div className='home-page'>
      <FilterSearchBar />
      <div className='home-page-jobs'>
        <JobList jobs={jobs} />
      </div>
    </div>
  );
};

export default HomePage;
