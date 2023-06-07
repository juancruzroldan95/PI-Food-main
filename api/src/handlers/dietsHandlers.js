const { getAllDiets, createDiet } = require('../controllers/dietsControllers');

const getDietsHandler = async (req, res) => {
  try {
    const allDiets = await getAllDiets();
    res.status(200).send(allDiets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDietHandler = async (req, res) => {
  const { name } = req.body;
  try {
    const newDiet = await createDiet(name);
    res.status(200).send(newDiet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDietsHandler,
  createDietHandler
}