// // pages/api/links/redirect.js
// import dbConnect from '../../../../lib/dbConnect';
// import Link from '../../../../models/Link';

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === 'GET') {
//     const { code } = req.query;

//     if (!code) {
//       return res.status(400).json({ error: 'Shortened URL code is required' });
//     }

//     try {
//       const link = await Link.findOne({ shortenedUrl: code });

//       if (!link) {
//         return res.status(404).json({ error: 'Link not found' });
//       }

//       res.redirect(link.originalUrl);
//     } catch (error) {
//       res.status(500).json({ error: 'Server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
