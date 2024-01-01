import React, { useState, useEffect, useCallback } from 'react';
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
}

export default Cards;