import { useEffect, useState, useCallback } from 'react';
import Card from './Card.jsx'
import axios from 'axios';

const CardManagement = () => {
    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState({ front: '', back: '', status: 'Want to Learn'});

    const fetchCards = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3001/cards");
            setCards(response.data);
        } catch (error) {
            console.error("Error: ", error);
        }
    }, []);

    useEffect(() => {
        fetchCards();
    }, []);

    const handleCreateCard = useCallback(async () => {
        try {
            const response = await axios.post('http://localhost:3001/cards', {
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

    return (
        <div>
            {/* Create new card form */}
            <input
                type="text"
                placeholder="Front"
                value={newCard.front}
                onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
            />
            <input
                type="text"
                placeholder="Back"
                value={newCard.back}
                onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
            />
            <select
                value={newCard.status}
                onChange={(e) => setNewCard({ ...newCard, status: e.target.value })}
            >
                <option value="Want to Learn">Want to Learn</option>
                <option value="Learned">Learned</option>
                <option value="Noted">Noted</option>
            </select>
            <button onClick={handleCreateCard}>Create Card</button>

            {/* Display existing cards */}
            {cards.map((card) => (
                <Card
                    key={card.id}
                    {...card}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );

}

export default CardManagement;