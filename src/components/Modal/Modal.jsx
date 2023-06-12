import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalBackdrop, ModalContent, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImg }) => {
  useEffect(() => {
    const closeEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeEsc);
    return () => window.removeEventListener('keydown', closeEsc);
  }, [closeModal]);

  const closeModalClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <ModalBackdrop onClick={closeModalClick}>
      <ModalContent closeModal={closeModal}>
        <ModalImg src={largeImg} alt="img"></ModalImg>
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
