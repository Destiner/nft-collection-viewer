import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AssetList from '@/components/collection/AssetList';
import Hero from '@/components/collection/Hero';
import NavBar from '@/components/collection/NavBar';
import Service, { AssetPreview } from '@/services/center';
import { getAddress, getDescription, getTitle } from '@/utils/collections';
import { ChainId } from '@/utils/chains';

const key = process.env.NEXT_PUBLIC_CENTER_KEY || '';
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1') as ChainId;

const Collection: NextPage = () => {
  const router = useRouter();
  const service = new Service(key, chainId);

  const collectionSlug = router.query.collection as string;

  const [page, setPage] = useState(0);
  const [assets, setAssets] = useState<AssetPreview[]>([]);
  const [isLoading, setLoading] = useState(true);

  const address = getAddress(collectionSlug);
  const title = getTitle(collectionSlug);
  const description = getDescription(collectionSlug);

  useEffect(() => {
    fetchAssets();
  }, [page]);

  async function fetchAssets(): Promise<void> {
    if (!address) {
      return;
    }
    setLoading(true);
    const assets = await service.getItems(address, page);
    setAssets(assets);
    setLoading(false);
  }

  function handlePageUpdate(newPage: number): void {
    setPage(newPage);
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

export default Collection;
