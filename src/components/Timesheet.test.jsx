import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import Timesheet from './Timesheet.jsx';

describe('timesheet', () => {
  it('renders a timesheet based on the input name and date', () => {
    expect.assertions(2);
    render(<Timesheet />);
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, {target: {value: 'Melz, Benjamin'}});
    const dateInput = screen.getByLabelText('Date');
    fireEvent.change(dateInput, {target: {value: '2001-05-04'}});
    const timesheetText = screen.getByText(/Melz, Benjamin/i);
    expect(timesheetText).toBeInTheDocument();
    expect(timesheetText.textContent).toStrictEqual(`
Melz, Benjamin

Mon  4/30   7.5  (9:00-16:30)
Tue  5/1    7.5  (9:00-16:30)
Wed  5/2    7.5  (9:00-16:30)
Thu  5/3    7.5  (9:00-16:30)
Fri  5/4    7.5  (9:00-16:30)
    `.trim());
  });
});
