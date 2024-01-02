import React, { useState, useEffect, useCallback } from 'react';
import FlashCard from '../components/FlashCard.jsx';
import Navbar from '../components/Navbar.jsx'
import axios from 'axios';
import '../assets/cards.css'

function Cards() {
    const [cards, setCards] = useState([]);

    const fetchCards = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3001/cards?_limit=10");
            const initialFetch = response.data;

            setCards(initialFetch);
        } catch (error) {
            console.error("Error: ", error);
        }
    }, []);

    useEffect(() => {
        fetchCards();
    }, []);

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