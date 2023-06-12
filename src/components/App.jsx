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
        setError(error.massage);
      } finally {
        setIsLoading(false);
      }
    };
    getImagesAPI();
  }, [page, query]);

  const changeQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

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
    <>
      {error ? (
        <h2
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '25px',
            color: 'red',
          }}
        >
          {error}
        </h2>
      ) : (
        <>
          <Searchbar onSubmit={changeQuery} />
          {isLoading && <h1>Loading...</h1>}
          <ImageGallery images={images} openModal={openModal} />

          {showModal && <Modal closeModal={closeModal} largeImg={largeImg} />}
          {images.length > 0 && images.length < totalImages ? (
            <Button onClick={changePage} />
          ) : null}
        </>
      )}
    </>
  );
};
