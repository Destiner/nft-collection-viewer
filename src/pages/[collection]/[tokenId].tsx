import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Service, { Asset } from '@/services/center';
import { getAddress, getTitle } from '@/utils/collections';
import { ChainId } from '@/utils/chains';

const key = process.env.NEXT_PUBLIC_CENTER_KEY || '';
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1') as ChainId;

interface Props {
  asset: Asset;
}

const CollectionAsset: NextPage<Props> = ({ asset }: Props) => {
  const router = useRouter();

  const collectionSlug = router.query.collection as string;
  const tokenId = parseInt(router.query.tokenId as string);

  const collectionTitle = getTitle(collectionSlug);
  const assetTitle = `${collectionTitle} #${tokenId}`;

  return (
    <div>
      <Head>
        <title>{assetTitle}</title>
        <meta
          name="description"
          content={assetTitle}
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <main>
        <>
          <img src={asset.metadata.image} />
          <div className="metadata">
            <div className="heading">
              <div className="title">{assetTitle}</div>
              <div className="collection">
                by{' '}
                <Link
                  href={{
                    pathname: '/[collection]',
                    query: { collection: collectionSlug },
                  }}
                >
                  {collectionTitle}
                </Link>
              </div>
            </div>
            <div className="traits">
              {asset.metadata.attributes.map((attribute, index) => (
                <div key={index}>
                  {attribute['trait_type']}: {attribute['value']}
                </div>
              ))}
            </div>
          </div>
        </>
      </main>

      <style jsx>{`
        main {
          padding: 32px;
          display: flex;
          gap: 64px;
          background: var(--color-background-secondary);
        }

        img {
          width: 500px;
          height: 500px;
          border-radius: 16px;
          border: 4px solid var(--color-accent-tertiary);
        }

        .metadata {
          display: flex;
          gap: 64px;
          flex-direction: column;
        }

        .title {
          font-size: 32px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  if (!params) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const collectionSlug = params.collection as string;
  const tokenId = parseInt(params.tokenId as string);

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
  const asset = await service.getAsset(collectionAddress, tokenId);

  return {
    props: {
      asset,
    },
  };
};

export default CollectionAsset;
export { getServerSideProps };
