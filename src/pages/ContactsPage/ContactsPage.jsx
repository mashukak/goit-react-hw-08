import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!id) return; 
    console.log("Deleting contact with ID:", id);
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.contactCard}>
      <h1 className={styles.title}>Contacts</h1>
      {contacts.length > 0 ? (
        <ul className={styles.contactsList}>
          {contacts.map((contact) => (
            <li key={contact.id} className={styles.contactItem}>
              <span className={styles.name}>{contact.name}</span>
              <span className={styles.number}>{contact.number}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noContacts}>No contacts found.</p>
      )}
    </div>
  );
};

export default ContactsPage;
