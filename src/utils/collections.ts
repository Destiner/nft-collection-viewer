const AZUKI_COLLECTION = 'azuki';

function getAddress(collection: string): string | null {
  switch (collection) {
    case AZUKI_COLLECTION:
      return '0xed5af388653567af2f388e6224dc7c4b3241c544';
  }
  return null;
}

function getTitle(collection: string): string | null {
  switch (collection) {
    case AZUKI_COLLECTION:
      return 'Azuki';
  }
  return null;
}

function getDescription(collection: string): string | null {
  switch (collection) {
    case AZUKI_COLLECTION:
      return 'Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details.We rise together. We build together. We grow together.';
  }
  return null;
}

export { getAddress, getTitle, getDescription };
