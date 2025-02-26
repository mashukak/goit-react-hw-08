import ReactModal from 'react-modal';
import styles from './Modal.module.css';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal} overlayClassName={styles.overlay}>
      {children}
    </ReactModal>
  );
};

export default Modal;
