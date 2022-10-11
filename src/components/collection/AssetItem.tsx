import Link from 'next/link';
import Image from 'next/future/image';

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
      <a>
        <div className="card">
          <div className="card-image">
            <Image
              src={data.metadata.image}
              alt={`${data.metadata.name} image`}
              width={160}
              height={160}
              style={{ borderRadius: '14px 14px 0 0' }}
            />
          </div>
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

            .card-image > img {
              width: 100px;
              height: 100px;
            }

            @media (min-width: 768px) {
              .card-image > img {
                width: 240px;
                height: 240px;
              }
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
      </a>
    </Link>
  );
};

export default AssetItem;
