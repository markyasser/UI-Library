import React from 'react';
import { render } from '@testing-library/react';
import Button from '../components/Button';

describe('Button Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Button label="test button" ></Button>);
    expect(container).toBeInTheDocument();
  });
});
