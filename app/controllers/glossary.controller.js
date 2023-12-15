const g = require('../data/glossary.json');

exports.getGlossary = (req, res) => {
  res.json(g);
};

exports.getGlossaryById = (req, res) => {
  res.json(g[req.params.id]);
};
