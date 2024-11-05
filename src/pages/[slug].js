import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    await client.connect();
    const database = client.db(); // Specify your database name
    const collection = database.collection('links');

    // Try to identify if the slug is a custom keyword or a standard shortened URL
    let link;
    if (slug.startsWith('custom-')) {
      // Handle custom keywords
      link = await collection.findOne({ customKeyword: slug });
    } else {
      // Handle standard shortened URLs
      link = await collection.findOne({ shortenedUrl: slug });
    }

    if (link) {
      return {
        redirect: {
          destination: link.originalUrl,
          permanent: false,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error('Error fetching the link:', error);
    return {
      notFound: true,
    };
  } finally {
    await client.close();
  }
}

export default function RedirectPage() {
  return null;
}
