import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card';
import styles from './Cards.module.css'

const Cards = () => {
  const currentRecipes = useSelector((state) => state.currentRecipes);
  
  return (
    <div className={styles.container}>
      {currentRecipes.map((recipe) => (
        <Card
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          image={recipe.image}
          diets={recipe.diets}
        />
      ))}
    </div>
  )
};

export default Cards