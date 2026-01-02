import React, { useState } from 'react';
import ContactItem from './ContactItem';
import { FiRefreshCw, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const ContactList = ({ contacts, onDeleteContact, onRefresh }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field) => {
    setSortBy(field);
  };

  const filteredAndSortedContacts = () => {
    let filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  };

  const sortedContacts = filteredAndSortedContacts();

  return (
    <div className="contact-list-container">
      <div className="list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="sort-controls">
          <button 
            onClick={() => handleSort('newest')}
            className={`sort-btn ${sortBy === 'newest' ? 'active' : ''}`}
          >
            <FiArrowDown /> Newest
          </button>
          <button 
            onClick={() => handleSort('oldest')}
            className={`sort-btn ${sortBy === 'oldest' ? 'active' : ''}`}
          >
            <FiArrowUp /> Oldest
          </button>
          <button 
            onClick={() => handleSort('name')}
            className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
          >
            A-Z
          </button>
          <button 
            onClick={onRefresh}
            className="refresh-btn"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>

      {sortedContacts.length === 0 ? (
        <div className="empty-state">
          <p>No contacts found. Add your first contact!</p>
        </div>
      ) : (
        <div className="contacts-table">
          <div className="table-header">
            <div className="header-cell">Name</div>
            <div className="header-cell">Email</div>
            <div className="header-cell">Phone</div>
            <div className="header-cell">Message</div>
            <div className="header-cell">Date Added</div>
            <div className="header-cell">Actions</div>
          </div>
          
          <div className="table-body">
            {sortedContacts.map(contact => (
              <ContactItem
                key={contact._id}
                contact={contact}
                onDelete={onDeleteContact}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;