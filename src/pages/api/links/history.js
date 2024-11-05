import dbConnect from '../../../../lib/dbConnect';
import Link from '../../../../models/Link';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const links = await Link.find().sort({ date: -1 }); // Sort by date, newest first
      res.status(200).json(links);
    } catch (error) {
      console.error('Error fetching links:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
