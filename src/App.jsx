import Timesheet from './components/Timesheet.jsx';

/**
 * Root Application element.
 *
 * @constructor
 * @return {JSX.Element}
 */
export default function App() {
  return (
    <div className={'container my-3'}>
      <h1>Timesheet</h1>
      <hr />
      <Timesheet />
    </div>
  );
}
