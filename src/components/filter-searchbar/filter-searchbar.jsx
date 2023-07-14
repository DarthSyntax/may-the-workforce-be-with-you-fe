import React, { useContext, useState } from 'react';
import './filter-searchbar.css';
import { StateContext } from '../../context';

const FilterSearchBar = () => {
  const { search, setSearch, token } = useContext(StateContext);
  const [searchTerms, setSearchTerms] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const urlFriendlyTerms = e.target.value.replace(' ', '_');
    const req = fetch(`http://localhost:9000/jobs/search/${urlFriendlyTerms}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const reqJson = req.json();

    setSearch(reqJson.data);
  };

  return (
    <div className='input__container'>
      <label className='input__label'>Job Title</label>
      <input
        placeholder='Choose your path, Padawan...'
        className='input'
        name='text'
        type='text'
        value={searchTerms}
        onChange={(e) => setSearchTerms(e.target.value)}
      />
      <p className='input__description'>What position do you want??</p>
    </div>
  );
};

export default FilterSearchBar;
