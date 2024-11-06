// pages/[slug].js
import dbConnect from '../../lib/dbConnect';
import Link from '../../models/Link';

export async function getServerSideProps({ params }) {
  const { slug } = params;

  await dbConnect();

  try {
    // Find the original URL for the given slug
    const link = await Link.findOne({ shortenedUrl: slug });

    if (!link) {
      // If no link is found, return a 404
      return { notFound: true };
    }

    // Redirect to the original URL
    return {
      redirect: {
        destination: link.originalUrl,
        permanent: false,
      },
    };
  } catch (error) {
    console.error("Error fetching link data:", error);
    return { notFound: true };
  }
}

export default function SlugRedirectPage() {
  return <p>Redirecting...</p>;
}
