import { render, screen } from '@testing-library/react';
import App from './App';
import mockResponseData from './dummyHeroData'

const hero = mockResponseData.heroes[0]

it('renders without crashing', () => {
  render(<App />);
});

it('renders without crashing', () => {
  render(<App />);

  expect(screen.getByRole("textbox")).toHaveDisplayValue("");
});

