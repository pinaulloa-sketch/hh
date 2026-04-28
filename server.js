const http = require('http'), https = require('https'), fs = require('fs'), path = require('path'), url = require('url');

const PORT = 3000, API_KEY = "2a37e40317mshaffc60a5fe87c93p1b6a92jsncab3bde2709a", API_HOST = "free-api-live-football-data.p.rapidapi.com";
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.png': 'image/png' };

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (parsed.pathname.startsWith('/api/')) {
    const apiPath = parsed.pathname.replace('/api/', '/') + (parsed.search || '');
    const proxyReq = https.request({ hostname: API_HOST, path: apiPath, method: 'GET', headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST } }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      proxyRes.pipe(res);
    });
    proxyReq.on('error', (err) => { res.writeHead(502); res.end(JSON.stringify({ error: err.message })); });
    proxyReq.end(); return;
  }

  let filePath = path.join(__dirname, parsed.pathname === '/' ? '/index.html' : parsed.pathname);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(err.code === 'ENOENT' ? 404 : 500); res.end(); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'text/plain' }); res.end(data);
  });
});

server.listen(PORT, () => console.log(`⚽ FootballIQ running! 👉 http://localhost:${PORT}`));