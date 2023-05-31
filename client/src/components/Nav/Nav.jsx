import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <div className={styles.nav}>
      <Link to="/home" className={styles.navLink}>Home</Link>
      <SearchBar />
      <Link to="/create" className={styles.navLink}>Add recipe!</Link>
    </div>
  )
};

export default Nav