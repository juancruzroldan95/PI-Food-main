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
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*
example body:
{
  "name": "Fettuccine Alfredo",
  "image": "https://hips.hearstapps.com/hmg-prod/images/delish-221130-perfect-chicken-alfredo-0683-eb-1670449995.jpg?crop=0.681xw:1.00xh;0.125xw,0&resize=1200:*",
  "summary": "Fettuccine Alfredo is an Italian pasta dish of fresh fettuccine tossed with butter and parmesan. As the cheese melts, it emulsifies the liquids to form a smooth and rich cheese sauce coating the pasta. The dish is named after Alfredo Di Lelio, who featured the dish at his restaurant in Rome in the early to mid-20th century; the ceremony of preparing it tableside was an integral part of the dish.",
  "healthScore": "20",
  "steps": [
    {
      "number": 1,
      "step": "Drag the Parmesan left and right against the grater. Click the grater when indicated to clean off the food buildup."
    },
    {
      "number": 2,
      "step": "Click the faucet to fill the measuring cup. Fill the pot with water up to the indicator line."
    },
    {
      "number": 3,
      "step": "Maintain the water temperature by dragging the heat slider or clicking the stirring spoon. Add food to the pot if indicated. When the time elapses, make sure you're in the green zone for a rolling boil."
    },
    {
      "number": 4,
      "step": "Tilt the pot to strain the Pasta. Don't tilt too fast or you'll spill."
    },
    {
      "number": 5,
      "step": "Trace the lines to dice up the Tomato."
    },
    {
      "number": 6,
      "step": "Click the knife to dice up the Green Onion."
    },
    {
      "number": 7,
      "step": "Follow the scrolling instruction to make Alfredo. When the bottom indicator is green, perform the correct action. Grab the slider to adjust the heat. Click the food or still spoon when indicated."
    },
    {
      "number": 8,
      "step": "Place the food on the grill, and turn the food when instructed. Remove the food when it’s done cooking. Don't leave it on too long or it will burn!"
    }
  ],
  "diets": [3]
}
*/

module.exports = {
  getRecipesHandler,
  getRecipeDetailHandler,
  createRecipeHandler,
};