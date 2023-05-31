import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {
  return (
    <div className={styles.card}>
      <img src={props.image} alt={props.name} />
      <Link to={`/detail/${props.id}`} key={props.id} className={styles.cardLink}>
        <h2>{props.name}</h2>
      </Link>
      <ul>
        {props.diets.map(diet => (
          <li key={diet}>{diet}</li>
        ))}
      </ul>
    </div>
  )
}

export default Card