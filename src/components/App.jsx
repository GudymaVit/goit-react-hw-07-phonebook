import React, { Component } from 'react';
import ContactForm from './contactForm';
import Filter from './filter';
import ContactList from './contactList';
import styles from '../components/contactForm/contactForm.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const normalizedContactsName = this.state.contacts.map(contact =>
      contact.name.toLowerCase()
    );
    const normalizedNewContact = newContact.name.toLowerCase();

    if (normalizedContactsName.includes(normalizedNewContact)) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  handleInputChenge = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  filterContacts = () => {
    const normalizedText = this.state.filter.toLowerCase();
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedText)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      console.log('update');
    }
  }

  render() {
    const filtered = this.filterContacts();
    return (
      <>
        <div className={styles.container}>
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />

          <h2>Contacts</h2>
          <Filter value={this.state.filter} onChange={this.handleInputChenge} />
          <ContactList contacts={filtered} onDelete={this.deleteContact} />
        </div>
      </>
    );
  }
}

export default App;
