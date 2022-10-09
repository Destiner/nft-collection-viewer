import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AssetList from '@/components/collection/AssetList';
import Hero from '@/components/collection/Hero';
import NavBar from '@/components/collection/NavBar';
import Service, { AssetPreview } from '@/services/center';
import { getAddress, getDescription, getTitle } from '@/utils/collections';
import { ChainId } from '@/utils/chains';

const key = process.env.NEXT_PUBLIC_CENTER_KEY || '';
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1') as ChainId;

interface Props {
  assets: AssetPreview[];
}

const Collection: NextPage<Props> = ({ assets }: Props) => {
  const router = useRouter();

  const collectionSlug = router.query.collection as string;
  const page = parseInt((router.query.page || '1') as string);

  const title = getTitle(collectionSlug);
  const description = getDescription(collectionSlug);

  function handlePageUpdate(newPage: number): void {
    router.push(`/${collectionSlug}?page=${newPage}`);
  }

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
        <NavBar
          page={page}
          onPageUpdate={handlePageUpdate}
        />
        <AssetList
          collection={collectionSlug}
          items={assets}
        />
      </main>
    </div>
  );
};

const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  if (!context.params) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const collectionSlug = context.params.collection as string;
  const page = parseInt((context.query.page || '1') as string);

  if (page < 1) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const service = new Service(key, chainId);

  const collectionAddress = getAddress(collectionSlug);
  if (!collectionAddress) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  const assets = await service.getItems(collectionAddress, page);

  return {
    props: {
      assets,
    },
  };
};

export default Collection;
export { getServerSideProps };
