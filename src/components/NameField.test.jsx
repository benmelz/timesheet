import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import NameField from './NameField.jsx';

describe('name field', () => {
  it('renders a text input with the given name prop as a value', () => {
    expect.assertions(2);
    render(<NameField name={'Melz, Benjamin'} setName={() => {}} />);
    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Melz, Benjamin');
  });

  it('passes the new value up when text is entered', () => {
    expect.assertions(2);
    const setName = jest.fn(() => {});
    render(<NameField name={''} setName={setName} />);
    const input = screen.getByLabelText('Name');
    fireEvent.change(input, {target: {value: 'Melz, Benjamin'}});
    expect(setName.mock.calls).toHaveLength(1);
    expect(setName.mock.calls[0][0]).toStrictEqual('Melz, Benjamin');
  });
});
