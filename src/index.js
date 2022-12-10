/**
 * Finds the beginning of a week, given a reference date.
 *
 * @param {Date} referenceDate - The date with which to use as a reference.
 * @return {Date} date - The first sunday before or on the given date.
 */
function beginningOfWeek(referenceDate) {
  const date = new Date(referenceDate);
  while (date.getDay() !== 0)
    date.setDate(date.getDate() - 1);
  return date;
}

/**
 * Builds an array of date objects for a week, given a reference date.
 *
 * @param {Date} referenceDate - The date with which to use as a reference.
 * @return {Array<Date>} - An array of date objects constituting the week of the given date, starting on sunday.
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
 * Parses a date string in ISO format (YYYY-MM-DD).
 *
 * @param {string} string - The date string to parse.
 * @return {Date|null} - The parsed date object if passed a valid string, null otherwise.
 */
function parseISOLocal(string) {
  if (!(string.match(/^\d{4}-\d{2}-\d{2}$/)))
    return null;
  const [year, month, day] = string.split('-').map((n) => parseInt(n));
  return new Date(year, month - 1, day);
}

/**
 * Formats a date string in ISO format (YYYY-MM-DD).
 *
 * @param {Date} date - The date object to format.
 * @return {string} - The formatted date string.
 */
function formatISOLocal(date) {
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Formats a timesheet row corresponding to a date.
 *
 * @param {Date} date - The date object to format as a timesheet row.
 * @return {string} - The formatted timesheet row.
 */
function formatTimesheetRow(date) {
  const weekday = date.toLocaleDateString(undefined, { weekday: 'short' });
  const dayMonth = date.toLocaleDateString(undefined, { day: 'numeric', month: 'numeric' }).padEnd(5, ' ');
  return `${weekday}  ${dayMonth}  7.5  (9:00-16:30)`;
}

/**
 * Formats a timesheet given a name and a reference date.
 *
 * @param {string} name - The name to use for the timesheet.
 * @param {Date} date - The date whose week is to be used for the timesheet.
 * @return {string} - The formatted timesheet.
 */
function formatTimesheet(name, date) {
  const rows = fullWeek(date).slice(1, 6).map(formatTimesheetRow).join('\n');
  return `
${name}

${rows}
  `.trim();
}

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name');
  const dateInput = document.getElementById('date');
  const timesheetText = document.getElementById('timesheet');

  /**
   * Triggers the generation of a timesheet based on input values. Will print a formatted timesheet if values are
   * valid or will exit early otherwise.
   */
  function generateTimesheet() {
    const name = nameInput.value;
    const date = parseISOLocal(dateInput.value);
    if (name === '' || date === null)
      return;
    timesheetText.textContent = formatTimesheet(name, date);
  }

  /**
   * Checks to see if input fields are valid and applies/removes validation properties.
   */
  function validateFields() {
    const name = nameInput.value;
    const date = parseISOLocal(dateInput.value);
    if (name === '')
      nameInput.classList.add('is-invalid');
    else
      nameInput.classList.remove('is-invalid');
    if (date === null)
      dateInput.classList.add('is-invalid');
    else
      dateInput.classList.remove('is-invalid');
  }

  nameInput.addEventListener('keyup', generateTimesheet);
  dateInput.addEventListener('change', generateTimesheet);

  nameInput.addEventListener('keyup', () => {
    localStorage.setItem('name', nameInput.value);
  });

  nameInput.addEventListener('keyup', validateFields);
  dateInput.addEventListener('change', validateFields);

  nameInput.value = localStorage.getItem('name');
  dateInput.value = formatISOLocal(new Date());
  generateTimesheet();
  validateFields();
});
