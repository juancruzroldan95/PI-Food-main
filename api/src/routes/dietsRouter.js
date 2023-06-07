const { Router } = require('express');
const { getDietsHandler, createDietHandler } = require('../handlers/dietsHandlers');

const dietsRouter = Router();

dietsRouter.get('/', getDietsHandler);
dietsRouter.post('/', createDietHandler);

module.exports = dietsRouter;