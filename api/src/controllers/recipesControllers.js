const { Recipes, Diets } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Sequelize } = require('sequelize');

const cleanArray = (arr) => 
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      image: elem.image,
      summary: elem.summary,
      healthScore: elem.healthScore,
      steps: elem.analyzedInstructions.length ? elem.analyzedInstructions[0].steps.map(elem => { return { number: elem.number, step: elem.step }}) : elem.analyzedInstructions,
      diets: elem.diets
    }
  });

const getAllRecipes = async () => {
  const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  let response = (await axios.get(apiUrl, {
    params: {
      addRecipeInformation: true,
      apiKey: API_KEY,
      number: 100
    }
  })).data;
  let apiRecipesRaw = response.results; // Array with 100 API recipes
  const apiRecipes = cleanArray(apiRecipesRaw);
  const dbRecipes = await Recipes.findAll({
    attributes: ['id', 'name', 'image', 'summary', 'health_score', 'steps'],
    include: {
      model: Diets,
      attributes: ['name']
    }
  });

  return apiRecipes;
};

module.exports = {
  getAllRecipes,
};