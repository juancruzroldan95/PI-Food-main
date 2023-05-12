const { Router } = require('express');
const {
  getRecipesHandler,
  getRecipeDetailHandler,
  createRecipeHandler,
} = require('../handlers/recipesHandlers');

const recipesRouter = Router();

recipesRouter.get('/', getRecipesHandler);
recipesRouter.get('/:idRecipe', getRecipeDetailHandler);
recipesRouter.post('/', createRecipeHandler);

module.exports = recipesRouter;