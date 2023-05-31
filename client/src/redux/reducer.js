import {
  GET_ALL_RECIPES,
  // GET_RECIPE_DETAIL,
  GET_DIETS,
  GET_RECIPES_BY_NAME,
  SORT_RECIPES_BY,
  SET_ORIGIN_FILTER,
  SET_DIET_FILTER
} from "./types";
import { allRecipes } from './dataAux';

const initialState = {
  recipes: [],
  diets: [],
  allRecipes: allRecipes,
  dietFilter: [],
  originFilter: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload
      };
    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload
      };
    case SORT_RECIPES_BY:
      switch(action.payload) {
        case ('nameAsc'):
          return {
            ...state,
            recipes: state.recipes.sort((a, b) => (a.name > b.name) ? 1 : -1)
          };
        case ('nameDesc'):
          return {
            ...state,
            recipes: state.recipes.sort((a, b) => (a.name < b.name) ? 1 : -1)
          };
        case ('ratingDesc'):
          return {
            ...state,
            recipes: state.recipes.sort((a, b) => (a.rating > b.rating) ? 1 : -1)
          };
        case ('ratingAsc'):
          return {
            ...state,
            recipes: state.recipes.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
          };
        default:
          return { ...state }
      };
      case SET_ORIGIN_FILTER:
        switch(action.payload) {
          case ('api'):
            return {
              ...state,
              originFilter: action.payload,
              recipes: state.allRecipes.filter((recipe) => recipe.created === false)
            };
          case ('database'):
            return {
              ...state,
              originFilter: action.payload,
              recipes: state.allRecipes.filter((recipe) => recipe.created === true)
            };
          case ('both'):
            return {
              ...state,
              originFilter: action.payload,
              recipes: state.allRecipes.filter((recipe) => recipe.created === false || recipe.created === true)
            };
          default:
            return {...state};
        }

      case SET_DIET_FILTER:
        const filteredRecipes = state.allRecipes.filter((recipe) =>
          recipe.diets.some((diet) => action.payload.includes(diet.name))
        );
        return {
          ...state,
          dietFilter: action.payload,
          recipes: filteredRecipes
        };
    default:
      return {...state};
  };
};

export default rootReducer;