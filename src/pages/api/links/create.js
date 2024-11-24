import dbConnect from '../../../../lib/dbConnect';
import Link from '../../../../models/Link';
import shortid from 'shortid';

const RESTRICTED_WORDS = ['fuck', 'manas jain']; // Add your restricted words here

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { originalUrl, customKeyword } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    try {
      // Check if the custom keyword is provided
      let shortenedUrl = customKeyword || shortid.generate();

      // Validate custom keyword for restricted words if provided
      if (customKeyword) {
        const containsRestrictedWord = RESTRICTED_WORDS.some((word) =>
          customKeyword.toLowerCase().includes(word.toLowerCase())
        );
        if (containsRestrictedWord) {
          return res.status(400).json({ error: 'Custom keyword you entered is restricted' });
        }

        // Check if the custom keyword is unique
        const existingKeyword = await Link.findOne({ shortenedUrl: customKeyword });
        if (existingKeyword) {
          return res.status(400).json({ error: 'Custom keyword is already in use' });
        }
      }

      // Check if the original URL already exists
      const existingLink = await Link.findOne({ originalUrl });
      if (existingLink && !customKeyword) {
        return res.json({ shortenedUrl: existingLink.shortenedUrl });
      }

      // Create and save the new link
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
