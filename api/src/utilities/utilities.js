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

const cleanObject = (obj) => {
  return {
    id: obj.id,
    name: obj.title,
    image: obj.image,
    summary: obj.summary,
    healthScore: obj.healthScore,
    steps: obj.analyzedInstructions.length ? obj.analyzedInstructions[0].steps.map(elem => { return { number: elem.number, step: elem.step }}) : obj.analyzedInstructions,
    diets: obj.diets
  }
};

const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

module.exports = {
  cleanArray,
  cleanObject,
  removeDuplicates
};