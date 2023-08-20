import {useEffect, useMemo, useState} from 'react';
import NameField from './NameField.jsx';
import DateField from './DateField.jsx';

/**
 * Finds the beginning of a week given a reference date.
 *
 * @param {date} referenceDate
 * @return {Date}
 */
function beginningOfWeek(referenceDate) {
  const date = new Date(referenceDate);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() - 1);
  }
  return date;
}

/**
 * Returns an array of dates representing a week given a reference date.
 *
 * @param {date} referenceDate
 * @return {Array}
 */
function fullWeek(referenceDate) {
  let date = beginningOfWeek(referenceDate);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates[i] = date;
    date = new Date(date);
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

/**
 * Formats a timesheet row (day, date, hours worked, time range) given a
 * reference date.
 *
 * @param {Date} date
 * @return {string}
 */
function formatTimesheetRow(date) {
  const weekday = date.toLocaleDateString(undefined, {weekday: 'short'});
  const dayMonth = date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'numeric',
  }).padEnd(5, ' ');
  return `${weekday}  ${dayMonth}  7.5  (9:00-16:30)`;
}

/**
 * Formats a full timesheet given a name and a reference date.
 *
 * @param {string} name
 * @param {Date} date
 * @return {string|null}
 */
function formatTimesheet(name, date) {
  if (typeof(name) !== 'string' || name === '' || !(date instanceof Date)) {
    return null;
  }
  const rows = fullWeek(date).slice(1, 6).map(formatTimesheetRow).join('\n');
  return `
${name}

${rows}
  `.trim();
}

/** An input/output interface for formatting a timesheet.
 *
 * @constructor
 * @return {JSX.Element}
 */
function Timesheet() {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [date, setDate] = useState(new Date());
  const text = useMemo(() => formatTimesheet(name, date), [name, date]);

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  return (
    <>
      <div className={'row g-md-3'}>
        <div className={'col-md-6'}>
          <NameField name={name} setName={setName} />
        </div>
        <div className={'col-md-6'}>
          <DateField date={date} setDate={setDate} />
        </div>
      </div>
      {(text !== null) && (
        <div className={'card'}>
          <div className={'card-body'}>
            <pre className={'card-text'}>
              {text}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}

export default Timesheet;
