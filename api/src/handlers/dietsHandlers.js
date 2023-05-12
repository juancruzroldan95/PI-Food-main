const { getAllDiets } = require('../controllers/dietsControllers');

const getDietsHandler = async (req, res) => {
  try {
    const allDiets = await getAllDiets();
    res.status(200).json(allDiets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDietsHandler,
}