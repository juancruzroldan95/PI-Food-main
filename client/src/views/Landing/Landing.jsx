import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Landing.module.css'

const Landing = () => {
  return (
    <div className={styles.landing}>
      <h1>Welcome to my Food App!</h1>
      <p>Explore thousands of recipes and add your own!</p>
      <Link to="/home">
        <button>Explore</button>
      </Link>
    </div>
  )
}

export default Landing