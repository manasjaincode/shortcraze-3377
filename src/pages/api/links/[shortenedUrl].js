// src/pages/[shortenedUrl].js

import dbConnect from '../../../../lib/dbConnect';
import Link from '../../../../models/Link';

export async function getServerSideProps(context) {
  const { shortenedUrl } = context.params;

  await dbConnect();

  const link = await Link.findOne({ shortenedUrl });

  if (!link) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: link.originalUrl,
      permanent: false,
    },
  };
}

const RedirectPage = () => {
  return null; // This page won't render anything since we're redirecting
};

export default RedirectPage;
