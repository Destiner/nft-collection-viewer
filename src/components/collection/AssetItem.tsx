import Link from 'next/link';

import { AssetPreview } from '@/services/center';

interface Props {
  collection: string;
  data: AssetPreview;
}

const AssetItem = ({ collection, data }: Props) => {
  return (
    <Link
      href={{
        pathname: '/[collection]/[tokenId]',
        query: { collection, tokenId: data.token_id },
      }}
    >
      <div className="card">
        <img src={data.metadata.image} />
        <div className="label">{data.metadata.name}</div>
        <style jsx>{`
          .card {
            display: flex;
            flex-direction: column;
            border: 2px solid var(--color-border-secondary);
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.25s ease-in-out;
          }

          .card:hover {
            border-color: var(--color-accent-primary);
          }

          img {
            width: 240px;
            height: 240px;
            border-radius: 14px 14px 0 0;
          }

          .label {
            margin: 4px;
            font-size: 16px;
            color: var(--color-text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    </Link>
  );
};

export default AssetItem;
