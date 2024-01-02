import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Card from './Card';

const CardManagement = () => {
    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState({ front: '', back: '', status: 'Want to Learn'});

    const fetchCards = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3001/cards?_limit=5");
            setCards(response.data);
        } catch (error) {
            console.error("Error: ", error);
        }
    }, [fetchCards]);

    useEffect(() => {
        fetchCards();
    }, []);

    const handleCreateCard = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3001/cards', {
                ...newCard,
                lastModified: new Date().toISOString(),
            });
            setCards(prevCards => [...prevCards, response.data]);
            setNewCard({ front: '', back: '', status: 'Want to Learn' });
        } catch (error) {
            console.error("Error creating card: ", error);
        }
    }, [newCard]);

    const handleEdit = useCallback(async (updatedCard) => {
        try {
            const response = await axios.put(
                `http://localhost:3001/cards/${updatedCard.id}`,
                { ...updatedCard, lastModified: new Date().toISOString() }
            );
            setCards(prevCards => 
                prevCards.map((card) => (card.id === updatedCard.id ? response.data : card))
                );
        } catch (error) {
            console.error("Error updating card: ", error);
        }
    }, []);

    const handleDelete = useCallback(async (cardId) => {
        try {
            await axios.delete(`http://localhost:3001/cards/${cardId}`);
            setCards(prevCards => prevCards.filter((card) => card.id !== cardId));
        } catch (error) {
            console.error("Error deleting card: ", error);
        }
    }, []);

    
}

export default CardManagement;