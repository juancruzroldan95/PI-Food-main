import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "./Detail.module.css"

const Detail = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    const getRecipeDetail = async () => {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      setRecipeDetail(response.data);
    };
    getRecipeDetail();
  }, [id]);

  const createMarkup = () => {
    return {__html: recipeDetail.summary};
  };

  return (
    <div>
      {recipeDetail ? (
        <div className={styles.recipeDetail}>
          <h1>{recipeDetail.name}</h1>
          <img src={recipeDetail.image} alt={recipeDetail.name} />
          <h3>Summary</h3>
          <p dangerouslySetInnerHTML={createMarkup()} />
          {recipeDetail.steps.length !== 0 && <h3>Steps</h3>}
          <ol>
            {recipeDetail.steps.map((step) => (
              <li key={step.number}>
                {/* <span>{step.number}. </span> */}
                <p>{step.step}</p>
              </li>
            ))}
          </ol>
          <h3>Diets</h3>
          <ul className={styles.diets}>
            {recipeDetail.diets.map((diet) => (
              <li key={diet} className={styles.diet}>
                {diet}
              </li>
            ))}
          </ul>
          <h3>Health Score</h3>
          <span>{recipeDetail.healthScore}</span>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Detail;