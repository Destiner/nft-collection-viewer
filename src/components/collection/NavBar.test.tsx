import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import NavBar from './NavBar';

describe('NavBar', () => {
  describe('paginator', () => {
    test('page rendering', () => {
      const page = 5;
      const onPageUpdate = jest.fn().mockReturnValue(0);

      render(
        <NavBar
          page={page}
          onPageUpdate={onPageUpdate}
        />,
      );

      const pageLabel = screen.getByText(page.toString());

      expect(pageLabel).toBeInTheDocument();
    });

    test('callback', () => {
      const page = 5;
      const onPageUpdate = jest.fn().mockReturnValue(0);

      render(
        <NavBar
          page={page}
          onPageUpdate={onPageUpdate}
        />,
      );

      const pageLeftButton = screen.getByTestId('page-left');
      const pageRightButton = screen.getByTestId('page-right');

      pageLeftButton.click();
      pageRightButton.click();
      pageRightButton.click();

      expect(onPageUpdate).toHaveBeenCalledTimes(3);
    });
  });
});
