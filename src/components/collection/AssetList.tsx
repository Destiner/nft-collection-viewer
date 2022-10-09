import { AssetPreview } from '@/services/center';

import AssetItem from './AssetItem';

interface Props {
  collection: string;
  items: AssetPreview[];
}

const AssetList = ({ collection, items }: Props) => {
  return (
    <div className="list">
      {items.map((item) => (
        <AssetItem
          key={item.token_id}
          collection={collection}
          data={item}
        />
      ))}

      <style jsx>
        {`
          .list {
            margin: 32px;
            display: flex;
            gap: 48px;
            justify-content: center;
            flex-wrap: wrap;
          }
        `}
      </style>
    </div>
  );
};

export default AssetList;
