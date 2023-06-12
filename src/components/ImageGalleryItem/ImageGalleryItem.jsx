import css from './ImageGalleryItem.module.css';
// import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images, status, onImageClick }) {
  if (status === 'resolved') {
    return images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <li key={largeImageURL} className={css.imageGalleryItem}>
        <img
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
