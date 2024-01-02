import React, { useState } from 'react';
import axios from 'axios';
import '../assets/contactform.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    content: '',
  });

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
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Subject:
          <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Message:
          <textarea name="content" value={formData.content} onChange={handleInputChange}></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
