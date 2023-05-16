const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Diets } = require("../db");

const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const getAllDiets = async () => {
  const count = await Diets.count();
  console.log(count);
  if (count === 0) {
    const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
    const response = (await axios.get(apiUrl, {
      params: {
        addRecipeInformation: true,
        apiKey: API_KEY,
        number: 100
      }
    })).data;
    const apiRecipesRaw = response.results;
    const allApiDiets = apiRecipesRaw
    .map((recipe) => recipe.diets) // Extract the diets array from each recipe
    .reduce((acc, curr) => [...acc, ...curr], []); // Merge all the diets arrays into a single array
    const apiDiets = removeDuplicates(allApiDiets);
    for (const diet of apiDiets) {
      await Diets.create({ name: diet });
    };
  };
  const dbDiets = await Diets.findAll();
  return dbDiets;
};

module.exports = {
  getAllDiets
};