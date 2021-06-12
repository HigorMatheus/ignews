import { render } from '@testing-library/react';
import { ActiveLink } from './index';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});
describe('ActiveLink Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>home</a>
      </ActiveLink>,
    );

    expect(getByText('home')).toBeInTheDocument();
  });

  it('adds active class if the link as correctly active', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>home</a>
      </ActiveLink>,
    );

    expect(getByText('home')).toHaveClass('active');
  });
});
