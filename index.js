module.exports = async (req, res) => {
  const target = req.query.url;

  if (!target) {
    res.status(400).send('Missing "url" parameter');
    return;
  }

  try {
    const response = await fetch(target, {
      headers: {
        'user-agent': req.headers['user-agent'] || '',
        referer: 'https://www.faselhds.xyz/'
      }
    });

    const contentType = response.headers.get('content-type') || 'text/html';
    const body = await response.text();

    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.status(response.status).send(body);
  } catch (err) {
    res.status(500).send(`Error fetching: ${err.message}`);
  }
};
