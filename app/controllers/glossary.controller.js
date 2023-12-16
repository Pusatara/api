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
  let result = [];
  switch (detectLang(req)) {
    case 'en':
      result = g;
      break;
    case 'id':
      result = g_id;
      break;
    default:
      result = g;
  }

  if (req.query.id) {
    const i = req.query.id;
    result = result[i - 1]
  }

  if (req.query.q) {
    const query = req.query.q.toLowerCase();
    if (Array.isArray(result)) {
      result = result.map((item) => item.patterns).flat();
    } else {
      result = result.patterns;
    }
    result = result.filter((item) => item.name.toLowerCase().includes(query));
  }

  res.send(result);

};
