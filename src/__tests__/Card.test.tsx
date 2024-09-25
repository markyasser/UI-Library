import React from 'react';
import { render } from '@testing-library/react';
import Card from '../components/Card';

describe('Card Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Card title="Test Title" content="Test Content" />);
    expect(container).toBeInTheDocument();
  });
});
