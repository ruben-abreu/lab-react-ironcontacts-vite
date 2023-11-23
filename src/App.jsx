import { useState } from 'react';
import './App.css';
import contactList from './contacts.json';

function App() {
  const [contacts, setContacts] = useState(contactList.slice(0, 5));

  const sortContacts = () => {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(sortedContacts);
  };

  const deleteButton = id => {
    const deleteBtn = contacts.filter(contact => id !== contact.id);
    setContacts(deleteBtn);
  };

  const sortByPopularity = () => {
    const sortedPop = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContacts(sortedPop);
  };

  const addContact = () => {
    const contactsCopy = [...contacts];
    const availableContacts = contactList.filter(
      contact => !contactsCopy.includes(contact)
    );

    if (availableContacts.length > 0) {
      const random = Math.floor(Math.random() * availableContacts.length);
      const newContacts = [...contactsCopy, availableContacts[random]];
      setContacts(newContacts);
    }
  };

  return (
    <div className='App'>
      <h1>LAB | React IronContacts</h1>
      <button onClick={addContact}>Add Random Contact</button>
      <button onClick={sortContacts}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, id) => (
            <tr key={id}>
              <td>
                <img
                  className='picture'
                  src={contact.pictureUrl}
                  alt={`Contact ${id}`}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? `🏆` : ``}</td>
              <td>{contact.wonEmmy ? `🌟` : ``}</td>
              <td>
                <button onClick={() => deleteButton(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
