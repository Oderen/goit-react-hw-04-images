import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ pageChanger }) => {
  return (
    <button type="button" className={css.loadButton} onClick={pageChanger}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  pageChanger: PropTypes.func.isRequired,
};
