const validate = (req, res, next) => {
  const { name, image, summary, healthScore, diets } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!image) return res.status(400).json({ error: "Missing image" });
  if (!summary) return res.status(400).json({ error: "Missing summary" });
  if (!healthScore) return res.status(400).json({ error: "Missing health score" });
  if (!diets || diets.length === 0) return res.status(400).json({ error: "Missing diet(s)" });

  next();
};

module.exports = {
  validate
};