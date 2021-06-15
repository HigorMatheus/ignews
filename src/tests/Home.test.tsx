import { render, screen } from '@testing-library/react';
import { stripe } from '../services/stripe';
import Home, { getStaticProps } from '../pages/index';
import { mocked } from 'ts-jest/utils';

jest.mock('next-auth/client', () => {
  return {
    useSession: () => {
      return [null, false];
    },
  };
});
jest.mock('next/router');
jest.mock('../services/stripe');

describe('@testing-library/', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$20' }} />);
    expect(screen.getByText('for R$20 month')).toBeInTheDocument();
  });
  it('loads initial data', async () => {
    const retrievePriceStripeMocked = mocked(stripe.prices.retrieve);

    retrievePriceStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);
    const response = await getStaticProps({});
    console.log(response);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00',
          },
        },
      }),
    );
  });
});
