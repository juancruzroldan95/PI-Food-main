import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByName } from '../../redux/actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    dispatch(getRecipesByName(searchTerm));
  };

  return (
    <div className={styles.searchBar}>
      <input
        type='search'
        placeholder='For example: chicken'
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search!</button>
    </div>
  )
};

export default SearchBar