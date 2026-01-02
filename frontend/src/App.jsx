import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Alert from './components/Alert';
import axios from 'axios';
import './App.css';
const vite_url = import.meta.env.VITE_API_URL || 'https://contact-management-vyxf.onrender.com';
function App() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${vite_url}/api/contacts`);
      // Handle different response structures
      const contactsData = response.data.data || response.data || [];
      setContacts(Array.isArray(contactsData) ? contactsData : []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      showAlert('Failed to fetch contacts', 'error');
      setContacts([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000);
  };

  const addContact = async (contactData) => {
    try {
      const response = await axios.post(`${vite_url}/api/contacts`, contactData);
      const newContact = response.data.data || response.data;
      setContacts(prevContacts => [newContact, ...prevContacts]);
      showAlert('Contact added successfully!', 'success');
      return { success: true };
    } catch (error) {
      console.error('Error adding contact:', error);
      if (error.response?.data?.errors) {
        return { success: false, errors: error.response.data.errors };
      }
      showAlert('Failed to add contact', 'error');
      return { success: false };
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${vite_url}/api/contacts/${id}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));
      showAlert('Contact deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting contact:', error);
      showAlert('Failed to delete contact', 'error');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Contact Manager</h1>
        <p>Manage your contacts efficiently</p>
      </header>

      <main className="main-content">
        {alert.show && <Alert message={alert.message} type={alert.type} />}
        
        <div className="content-grid">
          <section className="form-section">
            <h2>Add New Contact</h2>
            <ContactForm onAddContact={addContact} />
          </section>

          <section className="list-section">
            <h2>Contact List ({loading ? '...' : contacts.length})</h2>
            {loading ? (
              <div className="loading-state">
                <p>Loading contacts...</p>
              </div>
            ) : (
              <ContactList 
                contacts={contacts} 
                onDeleteContact={deleteContact}
                onRefresh={fetchContacts}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
