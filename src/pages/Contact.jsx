import React from 'react';
import Navbar from '../components/Navbar.jsx';
import ContactForm from '../components/ContactForm.jsx';
import '../assets/contact.css'

function Contact() {
    return (
    <>
        <Navbar />
        <div className='contact'>
            <h1>Contact Me</h1>
            <ContactForm />
        </div>
    </>
    );
}

export default Contact;