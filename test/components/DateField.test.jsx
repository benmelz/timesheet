import {fireEvent, render, screen} from '@testing-library/react';
import DateField from '../../src/components/DateField.jsx';

describe('date field', () => {
  it('renders a date input with the given date prop as a value', () => {
    expect.assertions(2);
    render((<DateField date={new Date(2001, 4, 4)} setDate={() => {}} />));
    const input = screen.getByLabelText('Date');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('2001-05-04');
  });

  it('passes the new value up when a valid date is entered', () => {
    expect.assertions(2);
    const setDate = vi.fn(() => {});
    render((<DateField date={null} setDate={setDate} />));
    const input = screen.getByLabelText('Date');
    fireEvent.change(input, {target: {value: '2001-05-04'}});
    expect(setDate.mock.calls).toHaveLength(1);
    expect(setDate.mock.calls[0][0]).toStrictEqual(new Date(2001, 4, 4));
  });

  it('does not pass a value when an invalid date is entered', () => {
    expect.assertions(1);
    const setDate = vi.fn(() => {});
    render((<DateField date={null} setDate={setDate} />));
    const input = screen.getByLabelText('Date');
    fireEvent.change(input, {target: {value: '2001-05-'}});
    expect(setDate.mock.calls).toHaveLength(0);
  });
});
