import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getDiets } from '../../redux/actions';
import { NAME_ERROR_MSG, IMAGE_ERROR_MSG, SUMMARY_ERROR_MSG, HEALTHSCORE_ERROR_MSG, STEPS_ERROR_MSG, DIETS_ERROR_MSG } from './validationMessages';
import { isValidUrl } from '../../utilities/utilities';
import styles from './Form.module.css';

const Form = () => {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const history = useHistory();
  const [recipe, setRecipe] = useState({
    name: '',
    image: '',
    summary: '',
    healthScore: 0,
    steps: [],
    diets: [] // Array of diets IDs (integers)
  });
  const [errors, setErrors] = useState({
    name: '',
    image: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: ''
  });
  useEffect(() => { dispatch(getDiets()) }, [dispatch]);
  
  const validate = (recipe, name, index) => {
    switch (name) {
      case "name":
        if (recipe.name.length < 4) {
          setErrors({ ...errors, name: NAME_ERROR_MSG});
        } else {
          setErrors({ ...errors, name: ''});
        };
        if (!recipe.name) setErrors({ ...errors, name: `${name} cant be empty`})
        break;
      case "image":
        if (!isValidUrl(recipe.image)) {
          setErrors({ ...errors, image: IMAGE_ERROR_MSG});
        } else {
          setErrors({ ...errors, image: ''});
        };
        if (!recipe.image) setErrors({ ...errors, image: `${name} cant be empty`})
        break;
      case "summary":
        if (recipe.summary.length < 6) {
          setErrors({ ...errors, summary: SUMMARY_ERROR_MSG});
        } else {
          setErrors({ ...errors, summary: ''});
        };
        if (!recipe.summary) setErrors({ ...errors, summary: `${name} cant be empty`})

        break;
      case "healthScore":
        if (recipe.healthScore < 1 || recipe.healthScore > 100) {
          setErrors({ ...errors, healthScore: HEALTHSCORE_ERROR_MSG });
        } else {
          setErrors({ ...errors, healthScore: '' });
        };
        break;
      case "steps":
        if (!recipe.steps[index].step) {
          setErrors({ ...errors, steps: STEPS_ERROR_MSG });
        } else {
          setErrors({ ...errors, steps: '' });
        };
        break;
      case "diets":
        if (recipe.diets.length === 0) {
          setErrors({ ...errors, diets: DIETS_ERROR_MSG });          
        } else {
          setErrors({ ...errors, diets: '' });
        };
        break;
      default:
        break;
    };
  };

  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setRecipe({ ...recipe, name: value });
        validate({ ...recipe, name: value }, name);
        break;
      case "image":
        setRecipe({ ...recipe, image: value});
        validate({ ...recipe, image: value}, name);
        break;
      case "summary":
        setRecipe({ ...recipe, summary: value});
        validate({ ...recipe, summary: value}, name);
        break;
      case "healthScore":
        setRecipe({ ...recipe, healthScore: value});
        validate({ ...recipe, healthScore: value}, name);
        break;
      case "steps":
        const newSteps = [...recipe.steps];
        newSteps[index] = {
          number: index + 1,
          step: value
        };
        setRecipe({ ...recipe, steps: newSteps});
        validate({ ...recipe, steps: newSteps}, name, index);
        break;
      case "diets":
        if (recipe.diets.includes(parseInt(value))) {
          setRecipe({
            ...recipe,
            diets: recipe.diets.filter((dietId) => dietId !== parseInt(value)),
          });
          validate({
            ...recipe,
            diets: recipe.diets.filter((dietId) => dietId !== parseInt(value)),
          }, name);
        } else {
          setRecipe({
            ...recipe,
            diets: [ ...recipe.diets, parseInt(value)] // push() method cause unexpected behavior when pushing a single value to an empty array.
          });
          validate({
            ...recipe,
            diets: [ ...recipe.diets, parseInt(value)]
          }, name);
        };
        break;
      default:
        break;
    };
  };

  const handleAddStep = (index) => {
    setRecipe({
      ...recipe,
      steps: [ ...recipe.steps, { number: index + 1, step: '' } ]
    });
  };

  const handleDeleteStep = (index) => {
    const newSteps = [ ...recipe.steps ];
    newSteps.splice(index, 1);
    setRecipe({
      ...recipe,
      steps: newSteps
    });
  };

  const isFormValid = () => {
    if (!recipe.name || !recipe.image || !recipe.summary || recipe.healthScore < 1 || recipe.healthScore > 100 || recipe.diets.length === 0 || errors.name || errors.image || errors.summary || errors.healthScore || errors.steps || errors.diets) {
      return false;
    } else {
      return true;
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:3001/recipes", recipe)
    .then(res => history.push(`detail/${res.data.id}`))
    .catch(res => alert("There is already a recipe with that name"));
  };

  return (
    <form className={styles.createRecipeForm} onSubmit={handleSubmit}>
      <div className={styles.formTitle}>
        <h1 name="title">Add a new recipe!</h1>
      </div>
      <div>
        <div className={styles.formInput}>
          <label htmlFor="name">Name of the recipe:</label>
          <input type="text" name="name" value={recipe.name} onChange={handleFormChange} />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.formInput}>
          <label htmlFor="image">URL image: </label>
          <input type="text" name="image" value={recipe.image} onChange={handleFormChange} />
          {errors.image && <span className={styles.error}>{errors.image}</span>}
        </div>
        <div className={styles.formInput}>
          <label htmlFor="summary">Summary: </label>
          <input type="text" name="summary" value={recipe.summary} onChange={handleFormChange} />
          {errors.summary && <span className={styles.error}>{errors.summary}</span>}
        </div>
        <div className={styles.formInput}>
          <label htmlFor="healthScore">Health score: </label>
          <input type="number" name="healthScore" value={recipe.healthScore} onChange={handleFormChange} />
          {errors.healthScore && <span className={styles.error}>{errors.healthScore}</span>}
        </div>
        <div className={styles.formInput}>
          <label htmlFor="steps">Steps <span>(you can add any step you want!)</span></label>
          <div>
            {recipe.steps.map((step, index) => (
              <div className={styles.stepItem} key={index}>
                <input
                  type="text"
                  name="steps"
                  placeholder="Step description"
                  value={step.step}
                  onChange={(event) => handleFormChange(event, index)}
                />
                {!recipe.steps[index].step && <span className={styles.error}>{errors.steps}</span>}
                <button className={styles.removeStepButton} type="button" onClick={() => handleDeleteStep(index)}>
                  -
                </button>
              </div>
            ))}
          </div>
          <button className={styles.addStepButton} type="button" onClick={() => handleAddStep(recipe.steps.length)}>
            Add Step
          </button>
        </div>
        <div>
          <h3 htmlFor="diets">Diets</h3>
          {errors.diets && <span className={styles.error}> ({errors.diets})</span>}
          {diets.map((diet) => (
            <div className={styles.dietItem} key={diet.id}>
              <input type="checkbox" name="diets" value={diet.id} onChange={handleFormChange}/>
              <span>{diet.name}</span>
            </div>
          ))}
        </div>
        <div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid()}
          >
            Create recipe!
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form;