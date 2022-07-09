import PropTypes from 'prop-types';
import ContactListItem from './contactListItem';
import styles from './contactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={styles.contact_list}>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
