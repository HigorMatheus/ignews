import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

jest.mock('next-auth/client', () => {
  return {
    useSession: () => {
      return [null, false];
    },
  };
});
jest.mock('next/router');

describe('@testing-library/', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$20' }} />);
    expect(screen.getByText('for R$20 month')).toBeInTheDocument();
  });
});
