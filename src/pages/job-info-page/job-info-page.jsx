import React, { useLayoutEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './job-info-page.css';
import { StateContext } from '../../context';
import EmployerEditJobModal from '../../components/emp-edit-job-modal/emp-edit-job-modal';
import UserList from '../../components/user-list/user-list';

const JobInfoPage = () => {
  const { token, job_id } = useParams();
  const navigate = useNavigate();
  const [jobInfo, setJobInfo] = useState(null);
  const [users, setUsers] = useState(null);
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
    await setUsers(reqJson.users);
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
        <EmployerEditJobModal jobInfo={jobInfo} />
      ) : (
        <button onClick={handleApply}>Apply</button>
      )}
      <br />
      <br />
      <h4>List of applicants</h4>
      <UserList users={users} />
    </div>
  );
};

export default JobInfoPage;
