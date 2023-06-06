import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDietFilter } from '../../redux/actions';
import styles from '../DietFilter/DietFilter.module.css';

const DietFilter = () => {
  const diets = useSelector((state) => state.diets);
  const recipes = useSelector((state) => state.recipes);
  let dietFilter = useSelector((state) => state.dietFilter);
  const dispatch = useDispatch();

  const handleDietChange = (e) => {
    if (dietFilter.includes(e.target.value)) {
      dietFilter = dietFilter.filter((diet) => diet !== e.target.value);
      dispatch(setDietFilter(dietFilter));
    } else {
      dietFilter.push(e.target.value);
      dispatch(setDietFilter(dietFilter));
    }
  };

  const countRecipesPerDiet = (diet) => {
    const filteredRecipes = recipes.filter((recipe) => recipe.diets.includes(diet));
    return filteredRecipes.length;
  };

  return (
    <div>
      <h3>Diets</h3>
      <div className={styles.dietFilter}>
        {diets.map((diet) => (
          <div key={diet.id} className={styles.dietFilterItem}>
            <input id={diet.id} type="checkbox" value={diet.name} onChange={handleDietChange} className={styles.dietCheckbox}/>
            <label title={diet.name} className={styles.dietLabel}>
              <span>{diet.name}</span>
              <span> ({countRecipesPerDiet(diet.name)})</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DietFilter;