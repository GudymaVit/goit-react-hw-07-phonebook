import { useState } from 'react';
import { useAddContactMutation, useGetContactsQuery } from 'redux/contactsApi';
import styles from './contactForm.module.css';

const ContactForm = () => {
  const { data } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'phone') {
      setPhone(value);
    }
  };

  const submitForm = (name, number) => {
    const addingExistingName = data.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (addingExistingName) {
      alert(`${name} is already in contacts`);
      return;
    }
    addContact({ name: name, phone: phone });
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    submitForm(name, phone);

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  return (
    <form className={styles.input_form} onSubmit={handleSubmitForm}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleInputChange}
      />
      <label>Number</label>
      <input
        type="tel"
        name="phone"
        value={phone}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleInputChange}
      />
      <button>Add contact</button>
    </form>
  );
};

export default ContactForm;
