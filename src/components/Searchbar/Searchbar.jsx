import { useState } from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

// const uselocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
//   });

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// }

export default function Searchbar({ handleFormSubmit }) {
  const [input, setInput] = useState('');

  // const [email, setEmail] = uselocalStorage('email', '');
  // const [password, setPassword] = uselocalStorage('password', '');

  const onHandleInputChange = e => {
    const { value } = e.currentTarget;

    setInput(value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const searchValue = input.trim().toLowerCase();

    if (searchValue === '') {
      Notiflix.Notify.info('Please enter something');
      return;
    }

    handleFormSubmit(searchValue);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.searchFormInput}
          value={input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onHandleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};
