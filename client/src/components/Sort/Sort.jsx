import React from 'react';
import { useDispatch } from 'react-redux';
import { sortRecipesBy } from '../../redux/actions';
import styles from './Sort.module.css';

const Sort = () => {
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    dispatch(sortRecipesBy(event.target.value));
  };

  return (
    <div>
      <label htmlFor="sortSelect">Sort by: </label>
      <select id="sortSelect" name ="sortSelect" className={styles.sortSelect} onChange={handleSortChange}>
        <option value="none">None</option>
        <option value="ascending">Ascending (A to Z)</option>
        <option value="descending">Descending (Z to A)</option>
        <option value="topHealthScore">Top Health Score</option>
        <option value="lowHealthScore">Low Health Score</option>
      </select>
    </div>
  );
};

export default Sort;