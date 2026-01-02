import React, { useState } from 'react';
import { FiTrash2, FiUser, FiMail, FiPhone, FiCalendar, FiMessageSquare } from 'react-icons/fi';

const ContactItem = ({ contact, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(contact._id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="contact-item">
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <p>Are you sure you want to delete this contact?</p>
            <div className="confirm-buttons">
              <button onClick={confirmDelete} className="confirm-btn delete">
                Yes, Delete
              </button>
              <button onClick={cancelDelete} className="confirm-btn cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="contact-info">
        <div className="info-cell">
          <FiUser className="info-icon" />
          <span className="contact-name">{contact.name}</span>
        </div>
        
        <div className="info-cell">
          <FiMail className="info-icon" />
          <a href={`mailto:${contact.email}`} className="contact-email">
            {contact.email}
          </a>
        </div>
        
        <div className="info-cell">
          <FiPhone className="info-icon" />
          <a href={`tel:${contact.phone}`} className="contact-phone">
            {contact.phone}
          </a>
        </div>
        
        <div className="info-cell">
          <FiMessageSquare className="info-icon" />
          <span className="contact-message">
            {contact.message || 'No message'}
          </span>
        </div>
        
        <div className="info-cell">
          <FiCalendar className="info-icon" />
          <span className="contact-date">
            {formatDate(contact.createdAt)}
          </span>
        </div>
        
        <div className="info-cell actions">
          <button 
            onClick={handleDelete}
            className="delete-btn"
            title="Delete contact"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;