import React from 'react';
import Timesheet from './components/Timesheet.jsx';

/**
 * Root Application element.
 *
 * @constructor
 * @return {JSX.Element}
 */
function App() {
  return (
    <div className={'container my-3'}>
      <h1>Timesheet</h1>
      <hr />
      <Timesheet />
    </div>
  );
}

export default App;
