import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Service, { Asset } from '@/services/center';
import { getAddress, getTitle } from '@/utils/collections';
import { ChainId } from '@/utils/chains';

const key = process.env.CENTER_KEY || '';
const chainId = parseInt(process.env.CHAIN_ID || '1') as ChainId;

type Props = AssetProps | {};

interface AssetProps {
  asset: Asset;
}

const CollectionAsset: NextPage<AssetProps> = (props: Props) => {
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

      {'asset' in props && (
        <main>
          <>
            <Image
              src={props.asset.metadata.image}
              alt="Asset image"
              width={500}
              height={500}
              style={{
                borderRadius: '16px',
                border: '4px solid var(--color-accent-tertiary)',
              }}
            />
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
                {props.asset.metadata.attributes.map((attribute, index) => (
                  <div key={index}>
                    {attribute['trait_type']}: {attribute['value']}
                  </div>
                ))}
              </div>
            </div>
          </>
        </main>
      )}

      <style jsx>{`
        main {
          padding: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
          background: var(--color-background-secondary);
        }

        @media (min-width: 768px) {
          main {
            padding: 32px;
            gap: 64px;
          }
        }

        .metadata {
          display: flex;
          gap: 16px;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .metadata {
            gap: 64px;
          }
        }

        .title {
          font-size: 32px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) {
    return {
      props: {},
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

  if (!asset) {
    return {
      props: {},
    };
  }

  return {
    props: {
      asset,
    },
    revalidate: 24 * 60 * 60,
  };
};

const getStaticPaths: GetStaticPaths = () => {
  const ids = [];
  for (let i = 0; i < 10; i++) {
    ids.push(i);
  }
  const paths = ids.map((id) => {
    return {
      params: {
        collection: 'azuki',
        tokenId: id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
};

export default CollectionAsset;
export { getStaticProps, getStaticPaths };
