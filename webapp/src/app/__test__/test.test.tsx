import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from '../app';

describe('App', () => {
  it('App render', async () => {
    render(<App />);
  });
});
