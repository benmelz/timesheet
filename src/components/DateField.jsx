import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

/**
 * Parses a string in ISO format (YYYY-MM-DD) to a Date object.
 *
 * @param {string} string
 * @return {Date|null}
 */
function parseISO(string) {
  if (typeof(string) !== 'string' || !(string.match(/^\d{4}-\d{2}-\d{2}$/))) {
    return null;
  }
  const [year, month, day] = string.split('-').map((n) => parseInt(n));
  return new Date(year, month - 1, day);
}

/**
 * Formats a date object in ISO format (YYYY-MM-DD).
 *
 * @param {Date} date
 * @return {string|null}
 */
function formatISO(date) {
  if (!(date instanceof Date)) return null;
  const pad = (n) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}

/**
 * A styled date field that controls a Date property.
 *
 * @constructor
 * @param {Date} date
 * @param {function} setDate
 * @return {JSX.Element}
 */
function DateField({date, setDate}) {
  const [dateString, setDateString] = useState(formatISO(date) || '');
  const handleDateStringChange = useCallback((e) => {
    return setDateString(e.target.value), [setDateString];
  });

  const prevDateRef = useRef();
  useEffect(() => {
    prevDateRef.current = date;
  }, [date, prevDateRef]);

  const nextDate = useMemo(() => parseISO(dateString), [dateString]);
  useEffect(() => {
    if (nextDate !== prevDateRef.current) setDate(nextDate);
  }, [prevDateRef, nextDate, setDate]);

  return (
    <div className={'form-floating mb-3'}>
      <input
        type={'date'}
        id={'date'}
        className={`form-control ${(nextDate === null) && 'is-invalid'}`}
        placeholder={'Date'}
        value={dateString}
        onChange={handleDateStringChange}/>
      <label htmlFor={'date'}>Date</label>
    </div>
  );
}

DateField.propTypes = {
  date: PropTypes.object,
  setDate: PropTypes.func.isRequired,
};

export default DateField;
