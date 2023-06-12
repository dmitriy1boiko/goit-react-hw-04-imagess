import { GalleryList } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, openModal }) => {
  return (
    <GalleryList>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            openModal={openModal}
          />
        );
      })}
    </GalleryList>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};