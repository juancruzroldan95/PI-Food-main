import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSourceFilter } from '../../redux/actions';
import styles from './SourceFilter.module.css';

const SourceFilter = () => {
  const [selectedSource, setSelectedSource] = useState("both");
  const dispatch = useDispatch();

  const handleSourceButton = (e) => {
    setSelectedSource(e.target.value);
    dispatch(setSourceFilter(e.target.value));
  }

  return (
    <div className={styles.sourceFilter}>
      <button
        value="both"
        onClick={handleSourceButton}
        className={`${styles.sourceFilterButton} ${selectedSource === "both" && styles.selected}`}
      >
        All recipes
      </button>
      <button
        value="api"
        onClick={handleSourceButton}
        className={`${styles.sourceFilterButton} ${selectedSource === "api" && styles.selected}`}
      >
        API recipes
      </button>
      <button
        value="db"
        onClick={handleSourceButton}
        className={`${styles.sourceFilterButton} ${selectedSource === "db" && styles.selected}`}
      >
        Database recipes
      </button>
    </div>
  )
}

export default SourceFilter;