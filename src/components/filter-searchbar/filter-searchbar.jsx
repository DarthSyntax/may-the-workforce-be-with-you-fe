import React from 'react';
import './filter-searchbar.css';

const FilterSearchbar = () => {
  return (
    <div className='input__container'>
      <label className='input__label'>Job Title</label>
      <input
        placeholder='Choose your path, Padawan...'
        className='input'
        name='text'
        type='text'
      />
      <p className='input__description'>What position do you want??</p>
    </div>
  );
};

export default FilterSearchbar;
