import { useEffect, useState, useCallback } from 'react';
import Card from './Card'
import axios from 'axios';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import '../assets/CardManagement.css';

const CardManagement = ({ error, setError }) => {
    const [cards, setCards] = useState([]);
    const [newCards, setNewCards] = useState({ front: '', back: '', status: ''});
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortOption, setSortOption] = useState('newest');

    const fetchCards = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3001/cards");
            const sortedCards = [...response.data].sort((a, b) =>
                    sortOption === 'newest'
                        ? new Date(b.lastModified) - new Date(a.lastModified)
                        : sortOption === 'oldest'
                        ? new Date(a.lastModified) - new Date(b.lastModified)
                        : 0
                );

            setCards(sortedCards);
        } catch (error) {
            setError('Oops... Server did not respond. Please try again later.');
            console.error("Error: ", error);
        }
    }, [sortOption]);

    useEffect(() => {
        fetchCards();
    }, [searchText, filterStatus]);

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText, filterStatus]);

    const handleSort = useCallback(() => {
        fetchCards();
    }, [fetchCards, sortOption]);

    useEffect(() => {
        handleSort();  
    }, [sortOption]);

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
            setError('Oops... The card could not be created. Please try again later.');
            console.error("Error creating card: ", error);
        } finally {
            handleSort();
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
            setError('Oops... The card could not be updated. Please try again later.');
            console.error("Error updating card: ", error);
        }
    }, []);

    const handleDelete = useCallback(async (cardId) => {
        try {
            await axios.delete(`http://localhost:3001/cards/${cardId}`);
            setCards(prevCards => prevCards.filter((card) => card.id !== cardId));
        } catch (error) {
            setError('Oops... The card could not be deleted. Please try again later.');
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
            setError('Oops... Search failed. Please try again later.');
            console.error("Error searching cards: ", error);
        }
    }, [filterStatus]);

    const handleFilterStatusChange = (selectedStatus) => {
        setFilterStatus(selectedStatus);
        handleSearch(searchText);
    };

    return (
        // <DndProvider backend={HTML5Backend}>
        <div>
            <input
                type="text"
                placeholder="Search cards..."
                value={searchText}
                className='search-input'
                onChange={(e) => setSearchText(e.target.value)}
            />
            <select
                value={filterStatus}
                className='filter-input'
                onChange={(e) => handleFilterStatusChange(e.target.value)}
            >
                <option value="">All</option>
                <option value="Want to Learn">Want to Learn</option>
                <option value="Learned">Learned</option>
                <option value="Noted">Noted</option>
            </select>

            <select
                value={sortOption}
                className='sort-input'
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>

            {/* Create new card form */}
            <div className='create-card'>
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
            </div>

            {/* Display existing cards */}
            {cards.map((card) => (
                <Card
                    key={card.id}
                    {...card}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    // onDrop={handleCardDrop}
                />
            ))}
        </div>
        // </DndProvider>
    );

}

export default CardManagement;