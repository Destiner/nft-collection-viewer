import { ChainId } from '@/utils/chains';

interface Trait {
  label: string;
  values: {
    id: string;
    count: number;
  };
}

interface AssetPreview {
  token_id: number;
  metadata: {
    image: string;
    name: string;
  };
}

interface Asset {
  collection_name: string;
  metadata: {
    attributes: {
      trait_type: string;
      value: string;
    }[];
    image: string;
    name: string;
  };
}

const PER_PAGE = 20;

class Service {
  private key: string;
  private chainId: ChainId;

  constructor(key: string, chainId: ChainId) {
    this.key = key;
    this.chainId = chainId;
  }

  async getTraits(collection: string): Promise<Trait[]> {
    const options = {
      headers: {
        accept: 'application/json',
        'X-API-Key': this.key,
      },
    };

    const network = this.getNetwork();
    const response = await fetch(
      `https://api.center.dev/v1/${network}/${collection}/traits`,
      options,
    );
    return await response.json();
  }

  async getItems(
    collection: string,
    page: number,
    traitFilters?: Record<string, string>,
  ): Promise<AssetPreview[]> {
    if (!traitFilters) {
      return this.getMultipleAssets(collection, page);
    } else {
      return this.searchItemsByTraits(collection, page, traitFilters);
    }
  }

  async getAsset(collection: string, tokenId: number): Promise<Asset | null> {
    const options = {
      headers: {
        accept: 'application/json',
        'X-API-Key': this.key,
      },
    };

    const network = this.getNetwork();
    const response = await fetch(
      `https://api.center.dev/v1/${network}/${collection}/${tokenId}`,
      options,
    );
    const asset = await response.json();
    if (asset.error) {
      return null;
    }
    return asset;
  }

  private async getMultipleAssets(
    collection: string,
    page: number,
  ): Promise<AssetPreview[]> {
    const startId = PER_PAGE * (page - 1);
    const endId = PER_PAGE * page;

    const ids = [];
    for (let i = startId; i < endId; i++) {
      ids.push(i);
    }
    const assets = ids.map((id) => {
      return {
        Address: collection,
        TokenID: id.toString(),
      };
    });

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-Key': 'key-cca7c1de9282-9e216b4e1807',
      },
      body: JSON.stringify({
        assets,
      }),
    };

    const response = await fetch(
      `https://api.center.dev/v1/ethereum-mainnet/assets`,
      options,
    );
    return await response.json();
  }

  private async searchItemsByTraits(
    collection: string,
    page: number,
    traitFilters: Record<string, string>,
  ): Promise<AssetPreview[]> {
    const query = Object.fromEntries(
      Object.entries(traitFilters).map((entry, index) => {
        return [index, [entry[0], entry[1]]];
      }),
    );
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-Key': this.key,
      },
      body: JSON.stringify({ query }),
    };

    const network = this.getNetwork();
    const limit = PER_PAGE;
    const offset = (page - 1) * PER_PAGE;
    const response = await fetch(
      `https://api.center.dev/v1/${network}/${collection}/assets/searchByTraits?limit=${limit}&offset=${offset}`,
      options,
    );
    return await response.json();
  }

  private getNetwork(): string {
    switch (this.chainId) {
      case 1:
        return 'ethereum-mainnet';
      case 137:
        return 'polygon-mainnet';
    }
  }
}

export default Service;
export type { Trait, AssetPreview, Asset };
