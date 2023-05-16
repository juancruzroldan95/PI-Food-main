const { getAllDiets } = require('../controllers/dietsControllers');

const getDietsHandler = async (req, res) => {
  try {
    const allDiets = await getAllDiets();
    res.status(200).send(allDiets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDietsHandler,
}