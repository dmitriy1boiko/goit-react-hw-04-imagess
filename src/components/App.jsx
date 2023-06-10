import { useEffect, useState } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { getSearchedImagesApi } from './servises/ImageApi';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!query) return;
    const getImagesAPI = async () => {
      setIsLoading(true);
      try {
        const data = await getSearchedImagesApi(query, page);
        if (data.hits.length === 0) {
          throw new Error(`No images for ${query}`);
        }
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
      } catch (error) {
        setError('Sorry, something went wrong...Please, try again');
      } finally {
        setIsLoading(false);
      }
    };
    getImagesAPI();
  }, [page, query]);

  const changeQuery = query => setQuery(query);

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImg => {
    setLargeImg(largeImg);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImg('');
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={changeQuery} />
      {isLoading && <h1>Loading...</h1>}
      <ImageGallery images={images} openModal={openModal} />

      {showModal && <Modal closeModal={closeModal} largeImg={largeImg} />}
      {!isLoading && totalImages !== images.length && (
        <Button onClick={changePage} />
      )}
    </div>
  );
};
