import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('contacts');

    if (storedData) {
      setContacts(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    if (contacts.length === 0) {
      localStorage.removeItem('contacts');
    }
  }, [contacts]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleCreateContact = ({ name, number }) => {
    const doesAlreadyExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (doesAlreadyExist) {
      return alert(`${name} is already in contacts`);
    } else {
      setContacts([...contacts, { name: name, number: number, id: nanoid() }]);
    }
  };

  const handleDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleContactsDisplay = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div style={{ marginLeft: '10px' }}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleCreateContact} />
      <h2>Contacts</h2>
      <ContactFilter filter={filter} handleChange={handleFilterChange} />
      <ContactList
        contacts={handleContactsDisplay()}
        onContactDelete={handleDeleteContact}
      />
    </div>
  );
};
