require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Sequelize } = require('sequelize');
const { Recipes, Diets } = require('../db');
const { cleanArray, cleanObject } = require('../utilities/utilities');

const getAllRecipes = async () => {
  const dbRecipes = await Recipes.findAll({
    attributes: ['id', 'name', 'image', 'summary', 'healthScore', 'steps'],
    include: {
      model: Diets,
      attributes: ['name'],
      through: { attributes: [] },
      as: 'diets'
    }
  });
  const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  const response = (await axios.get(apiUrl, {
    params: {
      addRecipeInformation: true,
      apiKey: API_KEY,
      number: 100
    }
  })).data;
  const apiRecipesRaw = response.results; // Array with 100 API recipes
  const apiRecipes = cleanArray(apiRecipesRaw);
  return [...dbRecipes, ...apiRecipes];
};

const searchRecipesByName = async (name) => {
  const Op = Sequelize.Op;
  const filteredDbRecipes = await Recipes.findAll({
    attributes: ['id', 'name', 'image', 'summary', 'healthScore', 'steps'],
    include: {
      model: Diets,
      attributes: ['name'],
      through: { attributes: [] },
      as: 'diets'
    },
    where: {
      name: {
        [Op.iLike]: `%${name}%` // ILIKE '%name' (case insensitive) (PG only)
      }
    }
  });
  const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  const response = (await axios.get(apiUrl, {
    params: {
      addRecipeInformation: true,
      apiKey: API_KEY,
      number: 100
    }
  })).data;
  const apiRecipesRaw = response.results; // Array with 100 API recipes
  const apiRecipes = cleanArray(apiRecipesRaw);
  const filteredApiRecipes = apiRecipes.filter((recipe) => recipe.name.toLowerCase().includes(name.toLowerCase()));
  return [...filteredDbRecipes, ...filteredApiRecipes];
};

const getRecipeById = async (id, source) => {
  let recipe;
  if (source === 'api') {
    const response = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data;
    recipe = cleanObject(response);
  } else {
    recipe = await Recipes.findByPk(id, {
      include: {
        model: Diets,
        attributes: ['name'],
        through: { attributes: [] },
        as: 'diets'
      }
    });
    if (recipe === null) recipe = { error: "Request failed with status code 404"};
  }
  return recipe;
};

const createRecipe = async (name, image, summary, healthScore, steps, diets) => {
  const newRecipe = await Recipes.create({ name, image, summary, healthScore, steps});
  for (const dietId of diets) {
    const diet = await Diets.findByPk(dietId);
    await newRecipe.addDiets(diet);
  };
  return newRecipe;
};

module.exports = {
  getAllRecipes,
  searchRecipesByName,
  getRecipeById,
  createRecipe
};