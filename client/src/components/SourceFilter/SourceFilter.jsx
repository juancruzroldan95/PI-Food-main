import React from 'react';
import { useDispatch } from 'react-redux';
import { setSourceFilter } from '../../redux/actions';
import styles from './SourceFilter.module.css';

const SourceFilter = () => {
  const dispatch = useDispatch();

  const handleSourceButton = (e) => {
    dispatch(setSourceFilter(e.target.value));
  }

  return (
    <div className={styles.sourceFilter}>
      <button value="both" onClick={handleSourceButton} >All recipes</button>
      <button value="api" onClick={handleSourceButton} >API recipes</button>
      <button value="db" onClick={handleSourceButton} >Database recipes</button>
    </div>
  )
}

export default SourceFilter;