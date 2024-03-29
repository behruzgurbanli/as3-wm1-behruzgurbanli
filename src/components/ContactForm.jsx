import React, { useState } from 'react';
import axios from 'axios';
import '../assets/contactform.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    content: '',
  });
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/messages', formData);
      console.log('Message sent successfully!');

      setNotification('Message sent successfully!');
      setTimeout(() => {
        setNotification(null);
      }, 3000);

    } catch (error) {
      setNotification('Message sent failed!');
      console.error('Error sending message:', error);
    } finally {
      setFormData({
        subject: '',
        email: '',
        content: '',
      });
    }
  };

  return (
    <>
    <div className="contact-form-container">
      <h1>Contact Me</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="content">Message:</label>
          <textarea id="content" name="content" value={formData.content} onChange={handleInputChange} required></textarea>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      {notification && <div className="notification">{notification}</div>}
    </div>
    </>
  );
};

export default ContactForm;
