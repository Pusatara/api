const g = require('../data/g.json');
const g_id = require('../data/g_id.json');

const detectLang = (req) => {
  let lang = req.headers['accept-language'];
  if (lang) {
    lang = lang.split(',')[0];
    if (lang === 'id') {
      return 'id';
    }
  }
  return 'en';
}

exports.getGlossary = (req, res) => {
  switch(detectLang(req)) {
    case 'en':
      res.json(g);
      break;
    case 'id':
      res.json(g_id);
      break;
    default:
      res.json(g);
  }
};

exports.getGlossaryById = (req, res) => {
  switch(detectLang(req)) {
    case 'en':
      res.json(g[req.params.id - 1]);
      break;
    case 'id':
      res.json(g_id[req.params.id - 1]);
      break;
    default:
      res.json(g[req.params.id - 1]);
  }
};
