import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, largeImageURL }) {
  // const [onClose, setOnClose] = useState('');
  // const [largeImageURL, setLargeImageURL] = useState('');

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="full version" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
