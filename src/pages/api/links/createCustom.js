// import dbConnect from '../../../../lib/dbConnect';
// import Link from '../../../../models/Link';

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === 'POST') {
//     const { originalUrl, customKeyword } = req.body;

//     if (!originalUrl || !customKeyword) {
//       return res.status(400).json({ error: 'Both original URL and custom keyword are required' });
//     }

//     try {
//       // Check if the custom keyword already exists
//       const existingLink = await Link.findOne({ customKeyword });
//       if (existingLink) {
//         return res.status(400).json({ error: 'Custom keyword already in use' });
//       }

//       const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://yourdomain.com/';
//       const shortenedUrl = `${baseUrl}${customKeyword}`;
//       const newLink = new Link({ originalUrl, shortenedUrl, customKeyword });
//       await newLink.save();

//       res.status(201).json({ shortenedUrl });
//     } catch (error) {
//       res.status(500).json({ error: 'Server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
