const g = require('../data/g.json');

exports.getGlossary = (req, res) => {
  res.json(g);
};

exports.getGlossaryById = (req, res) => {
  res.json(g[req.params.id - 1]);
};
