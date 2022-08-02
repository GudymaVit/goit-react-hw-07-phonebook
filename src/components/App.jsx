import ContactForm from './contactForm';
import Filter from './filter';
import ContactList from './contactList';
import styles from '../components/contactForm/contactForm.module.css';

const App = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </>
  );
};

export default App;
