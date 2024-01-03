import { useEffect, useState, useCallback } from 'react';
import Card from './Card'
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CardManagement = () => {
    const [cards, setCards] = useState([]);
    const [newCards, setNewCards] = useState({ front: '', back: '', status: ''});
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortOption, setSortOption] = useState('');

    const fetchCards = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3001/cards");
            const sortedCards = [...response.data];

            if (sortOption === 'newest') {
                sortedCards = sortedCards.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
            } else if (sortOption === 'oldest') {
                sortedCards = sortedCards.sort((a, b) => new Date(a.lastModified) - new Date(b.lastModified));
            }

            setCards(sortedCards);
        } catch (error) {
            console.error("Error: ", error);
        }
    }, [sortOption]);

    useEffect(() => {
        fetchCards();
    }, [searchText, filterStatus]);

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText, filterStatus]);

    const handleCreateCard = useCallback(async () => {
        try {
            const response = await axios.post('http://localhost:3001/cards', {
                ...newCards,
                lastModified: new Date().toISOString(),
            });
            setCards(prevCards => [...prevCards, response.data]);
            setNewCards({ front: '', back: '', status: '' });
            console.log("New card has been successfully created!");
        } catch (error) {
            console.error("Error creating card: ", error);
        }
    }, [newCards, fetchCards]);

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

    const handleSearch = useCallback(async (searchText) => {
        try {
            const response = await axios.get("http://localhost:3001/cards");
            const allCards = response.data;

            
            const filteredByStatus = filterStatus ? allCards.filter(card => card.status === filterStatus) : allCards;

            
            const filteredCards = filteredByStatus.filter(card =>
                card.front.toLowerCase().includes(searchText.toLowerCase()) ||
                card.back.toLowerCase().includes(searchText.toLowerCase())
            );

            setCards(filteredCards);
        } catch (error) {
            console.error("Error searching cards: ", error);
        }
    }, [filterStatus]);

    const handleFilterStatusChange = (selectedStatus) => {
        setFilterStatus(selectedStatus);
        handleSearch(searchText);
    };

    const handleCardDrop = async (id, newIndex) => {
        try {
          await axios.patch(`http://localhost:3001/cards/${id}`, { newIndex });
        } catch (error) {
          console.error('Error updating card order:', error);
        }
      };

    return (
        <DndProvider backend={HTML5Backend}>
        <div>
            <input
                type="text"
                placeholder="Search cards..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <select
                value={filterStatus}
                onChange={(e) => handleFilterStatusChange(e.target.value)}
            >
                <option value="">All</option>
                <option value="Want to Learn">Want to Learn</option>
                <option value="Learned">Learned</option>
                <option value="Noted">Noted</option>
            </select>

            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="">Sort by</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>

            {/* Create new card form */}
            <input
                type="text"
                placeholder="Front"
                value={newCards.front}
                onChange={(e) => setNewCards({ ...newCards, front: e.target.value })}
            />
            <input
                type="text"
                placeholder="Back"
                value={newCards.back}
                onChange={(e) => setNewCards({ ...newCards, back: e.target.value })}
            />
            <select
                value={newCards.status}
                onChange={(e) => setNewCards({ ...newCards, status: e.target.value })}
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
                    onDrop={handleCardDrop}
                />
            ))}
        </div>
        </DndProvider>
    );

}

export default CardManagement;