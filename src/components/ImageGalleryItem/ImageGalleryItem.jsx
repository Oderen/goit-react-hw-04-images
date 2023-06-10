import css from './ImageGalleryItem.module.css';
// import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images, status, onImageClick }) {
  if (status === 'resolved') {
    return images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <li key={id} className={css.imageGalleryItem}>
        <img
          key={id}
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => onImageClick(largeImageURL)}
        />
      </li>
    ));
  }
  return;
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
