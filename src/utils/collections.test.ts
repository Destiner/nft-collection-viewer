import {} from 'jest';

import { getAddress, getTitle } from './collections';

const AZUKI = 'azuki';
const UNSUPPORTED = 'unsupported_collection';

describe('Collections', () => {
  test('address', () => {
    expect(getAddress(AZUKI)).toBeTruthy();
    expect(getAddress(UNSUPPORTED)).toBeNull();
  });

  test('title', () => {
    expect(getTitle(AZUKI)).toBeTruthy();
    expect(getTitle(UNSUPPORTED)).toBeNull();
  });
});
