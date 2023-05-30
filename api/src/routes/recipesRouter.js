const { Router } = require('express');
const { getRecipesHandler, getRecipeDetailHandler, createRecipeHandler } = require('../handlers/recipesHandlers');
const { validate } = require('../middlewares/middlewares');

const recipesRouter = Router();

recipesRouter.get('/', getRecipesHandler);
recipesRouter.get('/:idRecipe', getRecipeDetailHandler);
recipesRouter.post('/', validate, createRecipeHandler);

module.exports = recipesRouter;