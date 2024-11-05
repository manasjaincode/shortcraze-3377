import dbConnect from '../../../../lib/dbConnect';
import Link from '../../../../models/Link';
import shortid from 'shortid';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    try {
      const existingLink = await Link.findOne({ originalUrl });
      if (existingLink) {
        return res.json({ shortenedUrl: existingLink.shortenedUrl });
      }

      const shortenedUrl = shortid.generate();
      const qrCode = ''; // Generate QR code or set a default value

      const newLink = new Link({ originalUrl, shortenedUrl });
      await newLink.save();

      res.status(201).json({ shortenedUrl });
    } catch (error) {
      console.error("Error during link creation:", error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
