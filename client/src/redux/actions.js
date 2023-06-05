import {
  GET_ALL_RECIPES,
  SET_CURRENT_RECIPES,
  GET_RECIPE_DETAIL,
  GET_DIETS,
  GET_RECIPES_BY_NAME,
  SET_SORT_TYPE,
  SET_SOURCE_FILTER,
  SET_DIET_FILTER
} from "./types";
import axios from 'axios';
import { allRecipes } from './dataAux';

// export const getAllRecipes = () => {
//   return async function (dispatch) {
//     const response = await axios.get('http://localhost:3001/recipes');
//     const allRecipes = response.data;
//     console.log(allRecipes);
//     dispatch({ type: GET_ALL_RECIPES, payload: allRecipes });
//   };
// };

export const getAllRecipes = () => {
  return {
    type: GET_ALL_RECIPES,
    payload: allRecipes
  };
};

export const setCurrentRecipes = (currentRecipes) => {
  return {
    type: SET_CURRENT_RECIPES,
    payload: currentRecipes
  }
};

export const getRecipeDetail = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    const recipeDetail = response.data;
    dispatch({ type: GET_RECIPE_DETAIL, payload: recipeDetail });
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/diets');
    const allDiets = response.data;
    dispatch({ type: GET_DIETS, payload: allDiets });
  };
};

export const getRecipesByName = (name) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    const searchedRecipes = response.data;
    dispatch({ type: GET_RECIPES_BY_NAME, payload: searchedRecipes })
  };
};

export const sortRecipesBy = (sortType) => {
  return {
    type: SET_SORT_TYPE,
    payload: sortType
  };
};

export const setSourceFilter = (sourceType) => {
  return {
    type: SET_SOURCE_FILTER,
    payload: sourceType
  };
};

export const setDietFilter = (selectedDiets) => {
  return {
    type: SET_DIET_FILTER,
    payload: selectedDiets
  };
};