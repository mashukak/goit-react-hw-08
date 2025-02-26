import React from 'react';
import styles from './Contact.module.css';

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li className={styles.item}>
      <span className={styles.contactInfo}>
        {name}: {number}
      </span>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;