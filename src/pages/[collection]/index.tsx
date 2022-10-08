import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Hero from '@/components/collection/Hero';
import { getDescription, getTitle } from '@/utils/collections';

const Collection: NextPage = () => {
  const router = useRouter();

  const collectionSlug = router.query.collection as string;

  const title = getTitle(collectionSlug);
  const description = getDescription(collectionSlug);

  console.log('collection', collectionSlug);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description || ''}
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <main>
        <Hero id={collectionSlug} />
      </main>
    </div>
  );
};

export default Collection;
