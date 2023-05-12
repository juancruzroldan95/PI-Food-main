const { getAllRecipes, searchRecipesByName, getRecipeById, createRecipe } = require('../controllers/recipesControllers');

const getRecipesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await searchRecipesByName(name) : await getAllRecipes();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipeDetailHandler = async (req, res) => {
  const { idRecipe } = req.params;
  const source = isNaN(idRecipe) ? 'db' : 'api';

  try {
    const recipe = await getRecipeById(idRecipe, source);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRecipeHandler = async (req, res) => {
  const { name, image, summary, healthScore, steps, diets } = req.body;
  try {
    const newRecipe = await createRecipe(name, image, summary, healthScore, steps, diets);
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecipesHandler,
  getRecipeDetailHandler,
  createRecipeHandler,
};