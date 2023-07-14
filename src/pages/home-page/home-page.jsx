import React, { useContext } from 'react';
import './home-page.css';
import { StateContext } from '../../context';
import JobList from '../../components/job-list/job-list';

const HomePage = () => {
  const { jobs } = useContext(StateContext);
};

export default HomePage;
