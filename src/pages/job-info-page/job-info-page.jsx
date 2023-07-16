import React, { useLayoutEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './job-info-page.css';
import { StateContext } from '../../context';

const JobInfoPage = () => {
  const { token, job_id } = useParams();
  const navigate = useNavigate();
  const [jobInfo, setJobInfo] = useState(null);
  const { currentUser, currentEmployer } = useContext(StateContext);

  const handleClick = (e) => {
    navigate(`/employers/${e.target.value}`);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const req = await fetch(`http://localhost:9000/jobs/${job_id}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        full_name: currentUser.full_name,
      }),
    });

    const reqJson = await req.json();
    console.log(reqJson);
  };

  const handleEdit = (e) => {
    e.preventDefault();
  };

  const getJobInfo = async () => {
    const req = await fetch(`http://localhost:9000/jobs/${job_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const reqJson = await req.json();
    await setJobInfo(reqJson.job);
  };

  useLayoutEffect(() => {
    if (!jobInfo) {
      getJobInfo();
    }
  }, []);

  return (
    <div className='job-info-page'>
      <h4>Job Title: {jobInfo?.title}</h4> <br />
      <div className='employer-listing' onClick={handleClick}>
        Employer
      </div>{' '}
      <br />
      <span>Salary: {jobInfo?.salary}</span> <br />
      <br />
      <span>Experience Level: {jobInfo?.exp_level}</span> <br />
      <br />
      <span>Job Description: {jobInfo?.description}</span> <br />
      <br />
      {currentEmployer ? (
        <button onClick={handleEdit}>Edit</button>
      ) : (
        <button onClick={handleApply}>Apply</button>
      )}
    </div>
  );
};

export default JobInfoPage;
