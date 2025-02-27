import styles from './HomePage.module.css'; 

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.welcomeMessage}>Welcome to Phonebook Web!</h1>
      <a href="/contacts" className={styles.getStartedButton}>Get Started</a>
    </div>
  );
};

  export default HomePage;
  