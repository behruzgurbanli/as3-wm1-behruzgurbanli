import React, { useState } from 'react';
import '../assets/flashcard.css';

const Card = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        
        <div className="flashcard">
            <h4> <strong> { props.id }. </strong> { props.front }</h4>
            <p>Answer: { props.back }</p>
            <p>Status: { props.status }</p>
            <p>Last Modified: { new Date(props.lastModified).toLocaleDateString() }</p>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
        </div>
        
    );
}

export default Card;