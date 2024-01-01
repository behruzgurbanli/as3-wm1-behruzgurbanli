import React, {useEffect, useState} from 'react';

function App() {
    const [flashCards, setFlashCards] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:3001/flashCards')
        .then(response => response.json())
        .then(data => setFlashCards(data));
    }, []);
  
    return (
      <div>
        <h1>Flash Card App</h1>
        <ul>
          {flashCards.map(card => (
            <li key={card.id}>
              <p>Question:</p> {card.question}<br />
              <p>Answer:</p> {card.answer}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default App;