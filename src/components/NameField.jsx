import PropTypes from 'prop-types';
import {useCallback} from 'react';

/**
 * A styled name field that controls a string property.
 *
 * @constructor
 * @param {string} name
 * @param {function} setName
 * @return {JSX.Element}
 */
export default function NameField({name, setName}) {
  const handleNameChange = useCallback((e) => {
    return setName(e.target.value);
  }, [setName]);

  return (
    <div className={'form-floating mb-3'}>
      <input
        type={'text'}
        id={'name'}
        className={`form-control ${(name === '') && 'is-invalid'}`}
        placeholder={'Name'}
        value={name}
        onChange={handleNameChange}/>
      <label htmlFor={'name'}>Name</label>
    </div>
  );
}

NameField.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};
