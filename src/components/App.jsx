import { useState, useEffect } from 'react';
import ContactForm from './contactForm';
import Filter from './filter';
import ContactList from './contactList';
import styles from '../components/contactForm/contactForm.module.css';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const storegeContacts = JSON.parse(localStorage.getItem('contacts'));

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return storegeContacts ? storegeContacts : initialState;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const normalizedContactsName = contacts.map(contact =>
      contact.name.toLowerCase()
    );
    const normalizedNewContact = newContact.name.toLowerCase();

    if (normalizedContactsName.includes(normalizedNewContact)) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      setContacts(state => [newContact, ...state]);
    }
  };

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const handleInputChenge = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const filterContacts = () => {
    const normalizedText = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedText)
    );
  };

  const filtered = filterContacts();
  return (
    <>
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleInputChenge} />
        <ContactList contacts={filtered} onDelete={deleteContact} />
      </div>
    </>
  );
};

export default App;
