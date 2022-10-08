const AZUKI_COLLECTION = 'azuki';

function getTitle(collectionSlug: string): string | null {
  switch (collectionSlug) {
    case AZUKI_COLLECTION:
      return 'Azuki';
  }
  return null;
}

function getDescription(collectionSlug: string): string | null {
  switch (collectionSlug) {
    case AZUKI_COLLECTION:
      return 'Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.We rise together. We build together. We grow together.';
  }
  return null;
}

export { getTitle, getDescription };
