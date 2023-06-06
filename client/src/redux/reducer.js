import {
  GET_ALL_RECIPES,
  SET_CURRENT_RECIPES,
  // GET_RECIPE_DETAIL,
  GET_DIETS,
  GET_RECIPES_BY_NAME,
  SET_SORT_TYPE,
  SET_SOURCE_FILTER,
  SET_DIET_FILTER
} from "./types";
import { allRecipes } from './dataAux';

const initialState = {
  currentRecipes: [],
  recipes: [],
  diets: [],
  allRecipes: allRecipes,
  dietFilter: [],
  sourceFilter: 'both',
  sort: 'none'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload
      };
    case SET_CURRENT_RECIPES:
      return {
        ...state,
        currentRecipes: action.payload
      }
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
    case SET_SORT_TYPE:
      switch(action.payload) {
        case ('ascending'):
          const sortAscRecipes = [...state.recipes]; // We create a NEW (A COPY) array using the spread operator to ensure a new array REFERENCE is returned.
          sortAscRecipes.sort((a, b) => (a.name > b.name) ? 1 : -1); // The sort() method mutates the array in-place, so if you're directly modifying the existing state array, React may not detect the change and trigger a re-render.
          return {
            ...state,
            recipes: sortAscRecipes,
            sort: action.payload
          };
        case ('descending'):
          const sortDescRecipes = [...state.recipes];
          sortDescRecipes.sort((a, b) => (a.name < b.name) ? 1 : -1);
          return {
            ...state,
            recipes: sortDescRecipes,
            sort: action.payload
          };
        case ('lowHealthScore'):
          const sortTopHSRecipes = [...state.recipes];
          sortTopHSRecipes.sort((a, b) => (a.healthScore > b.healthScore) ? 1 : -1);
          return {
            ...state,
            recipes: sortTopHSRecipes,
            sort: action.payload
          };
        case ('topHealthScore'):
          const sortLowHSRecipes = [...state.recipes];
          sortLowHSRecipes.sort((a, b) => (a.healthScore < b.healthScore) ? 1 : -1);
          return {
            ...state,
            recipes: sortLowHSRecipes,
            sort: action.payload
          };
        default:
          return { ...state }
      };
    case SET_SOURCE_FILTER:
      switch(action.payload) {
        case ('api'):
          if (state.dietFilter.length === 0) {
            return {
              ...state,
              sourceFilter: action.payload,
              recipes: state.allRecipes.filter((recipe) => !isNaN(recipe.id))
            };
          } else {
            const allApiRecipes = state.allRecipes.filter((recipe) => !isNaN(recipe.id));
            const filteredRecipes = allApiRecipes.filter((recipe) => {
              return state.dietFilter.every(diet => recipe.diets.includes(diet));
            });
            return {
              ...state,
              sourceFilter: action.payload,
              recipes: filteredRecipes
            };
          }
        case ('db'):
          if (state.dietFilter.length === 0) {
            return {
              ...state,
              sourceFilter: action.payload,
              recipes: state.allRecipes.filter((recipe) => isNaN(recipe.id))
            };
          } else {
            const allDbRecipes = state.allRecipes.filter((recipe) => isNaN(recipe.id));
            const filteredRecipes = allDbRecipes.filter((recipe) => {
              return state.dietFilter.every(diet => recipe.diets.includes(diet));
            });
            return {
              ...state,
              sourceFilter: action.payload,
              recipes: filteredRecipes
            };
          }
        case ('both'):
          if (!state.dietFilter.length === 0) {
            return {
              ...state,
              sourceFilter: action.payload,
              recipes: state.allRecipes
            };
          } else {
            const filteredRecipes = state.allRecipes.filter((recipe) => {
              return state.dietFilter.every(diet => recipe.diets.includes(diet));
            });
            return {
              ...state,
              sourceFilter: action.payload,
              recipes: filteredRecipes
            };
          }
        default:
          return {...state};
      };
    case SET_DIET_FILTER:
      if (state.sourceFilter === "both") {
        const filteredRecipes = state.allRecipes.filter((recipe) => {
          return action.payload.every(diet => recipe.diets.includes(diet));
          // using 'every()' method for AND condition approach, for OR condition use 'some()' method
        });
        return {
          ...state,
          dietFilter: action.payload,
          recipes: filteredRecipes
        };
      };
      if (state.sourceFilter === "api") {
        const allApiRecipes = state.allRecipes.filter((recipe) => !isNaN(recipe.id));
        const filteredRecipes = allApiRecipes.filter((recipe) => {
          return action.payload.every(diet => recipe.diets.includes(diet));
        });
        return {
          ...state,
          dietFilter: action.payload,
          recipes: filteredRecipes
        };
      };
      if (state.sourceFilter === "db") {
        const allDbRecipes = state.allRecipes.filter((recipe) => isNaN(recipe.id));
        const filteredRecipes = allDbRecipes.filter((recipe) => {
          return action.payload.every(diet => recipe.diets.includes(diet));
        });
        return {
          ...state,
          dietFilter: action.payload,
          recipes: filteredRecipes
        };
      };
      break;
    default:
      return {...state};
  };
};

export default rootReducer;