import { useState, useEffect } from 'react';

import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

import css from '../styles.module.css';

import Notiflix from 'notiflix';

// Shorter version
// const useCustomState = initialValue => {
//   const [state, setState] = useState(initialValue);

//   const setCustomState = value => {
//     setState(prevState => ({
//       ...prevState,
//       ...value,
//     }));
//   };

//   return [state, setCustomState];
// };

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictureCount, setPictureCount] = useState(12);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // const [state, setState] = useCustomState({
  //   searchQuery: '',
  //   page: 1,
  //   pictureCount: 12,
  //   images: [],
  //   status: 'idle',
  //   largeImageURL: '',
  //   showModal: false,
  //   isButtonVisible: false,
  // });

  // const {
  //   searchQuery,
  //   page,
  //   pictureCount,
  //   images,
  //   status,
  //   largeImageURL,
  //   showModal,
  //   isButtonVisible,
  // } = state;

  useEffect(() => {
    if (searchQuery === '') {
      setStatus('idle');
      setIsButtonVisible(false);
      return;
    }

    const baseURL = 'https://pixabay.com/api';
    const KEY = '36858767-c9bdee91508ce121a2eb6b95d';

    setStatus('pending');

    fetch(
      `${baseURL}/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('Opps, something went wrong'));
      })
      .then(data => {
        const { hits, total, totalHits } = data;

        setImages([...images, ...hits]);
        setPictureCount(pictureCount + hits.length);
        setStatus('resolved');

        if (total === 0) {
          Notiflix.Notify.info('Sorry, there is no image found');
          return setStatus('rejected');
        }

        if (totalHits > pictureCount) {
          setIsButtonVisible(true);
        }

        if (totalHits < pictureCount) {
          setIsButtonVisible(false);
          return Notiflix.Notify.info(
            "Wow, look's like these are are all images"
          );
        }
      })
      .catch(error => {
        console.log(error.message);
        setIsButtonVisible(false);
      });
  }, [searchQuery, page]);

  const handleFormSubmit = newSearchQuery => {
    if (newSearchQuery === searchQuery) {
      return Notiflix.Notify.info(
        'You have already searched this :) Please enter something else'
      );
    }

    // setState({
    //   searchQuery: newSearchQuery,
    //   page: 1,
    //   images: [],
    //   pictureCount: 12,
    // });
    setSearchQuery(newSearchQuery);
    setPage(1);
    setImages([]);
    setPictureCount(12);
  };

  const handleLoadMoreClick = () => {
    // setState(prevState => ({
    //   ...prevState,
    //   page: prevState.page + 1,
    // }));
    setPage(page + 1);
  };

  const handleImageClick = largeImageURL => {
    // setState({ largeImageURL, showModal: !showModal });

    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Searchbar handleFormSubmit={handleFormSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>Oops, something went wrong</h1>}
      <ImageGallery
        className={css.ImageGallery}
        images={images}
        pageChanger={handleLoadMoreClick}
        status={status}
        onImageClick={handleImageClick}
        isButtonVisible={isButtonVisible}
        pictureCount={pictureCount}
      />
      {showModal && (
        <Modal closeModal={toggleModal} largeImageURL={largeImageURL} />
      )}
    </>
  );
}
