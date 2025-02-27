import React from 'react';
import RegisterForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <RegisterForm />
    </div>
  );
};

export default RegistrationPage;
