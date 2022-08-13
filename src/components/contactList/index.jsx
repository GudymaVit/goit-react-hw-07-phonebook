import React from 'react';
import { useSelector } from 'react-redux';
import { getFiltered } from 'redux/filterSlice';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'redux/contactsApi';

import styles from './contactList.module.css';

const ContactList = () => {
  const { data, isFetching } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const filter = useSelector(getFiltered);

  const filterContacts = () => {
    if (filter === '') {
      return data;
    }
    const normalizedText = filter.toLowerCase();
    return data.filter(({ name }) =>
      name.toLowerCase().includes(normalizedText)
    );
  };

  const filteredContacts = filterContacts();

  if (isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <ul className={styles.contact_list}>
      {data &&
        filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name} {contact.phone}
            <button type="button" onClick={() => deleteContact(contact.id)}>
              Delete user
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ContactList;
