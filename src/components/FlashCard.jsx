import React, { useState } from 'react';
import '../assets/flashcard.css';

const FlashCard = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        
        <div className="flashcard">
            <h4>{ props.front }</h4>
            <p>Answer: { props.back }</p>
            <p>Status: { props.status }</p>
            <p>Last Modified: { new Date(props.lastModified).toLocaleDateString() }</p>
        </div>
        
    );
}

export default FlashCard;