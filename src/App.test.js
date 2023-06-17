import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import React from 'react';
import App from './App.jsx';

describe('App', () => {
  it('renders the timesheet header', () => {
    render(<App />);
    const heading = screen.getByRole('heading', {level: 1});
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Timesheet');
  });
});
