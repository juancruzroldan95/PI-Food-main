import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRecipesByName } from '../../redux/actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
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
      <Link to="/home"><button onClick={handleSearch}>Search!</button></Link>
    </div>
  )
};

export default SearchBar