// const express = require('express');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   server.use(express.json());

//   server.post('/api/shorten', (req, res) => {
//     // Your URL shortening logic here
//     res.send('URL shortened');
//   });

//   server.get('/api/links/:id', (req, res) => {
//     const id = req.params.id;
//     // Your logic to handle the shortened URL
//     res.send(`Redirecting to original URL for ${id}`);
//   });

//   server.get('/:id', (req, res) => {
//     const id = req.params.id;
//     // Your logic to handle the short URL
//     res.redirect(`/api/links/${id}`);
//   });

//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   const port = 3000;
//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`Server running on http://localhost:${port}`);
//   });
// });
