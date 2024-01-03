import React from 'react';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';

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