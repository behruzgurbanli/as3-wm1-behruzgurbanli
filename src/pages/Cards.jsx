import React, { useState } from 'react';
import FlashCard from '../components/Card.jsx';
import Navbar from '../components/Navbar.jsx'
import CardManagement from '../components/CardManagement.jsx'
import axios from 'axios';
import '../assets/cards.css'

function Cards() {
    const [cards, setCards] = useState([]);

    return (
    <>
        <Navbar />
        {cards.map((card) => (
            <FlashCard key={ card.id } {...card} />
        ))

        }
    </>
    );
}

export default Cards;