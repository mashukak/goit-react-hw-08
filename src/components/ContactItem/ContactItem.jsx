import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import styles from './ContactItem.module.css';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <li className={styles.item}>
      <p>{name}: {number}</p>
      <button onClick={() => dispatch(deleteContact(id))} className={styles.button}>Delete</button>
    </li>
  );
};

export default ContactItem;
