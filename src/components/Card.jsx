import React, { useState } from 'react';
import '../assets/card.css';

const Card = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="card-inner">
            <div className="card-front">
                <h4> <strong> { props.id }. </strong> { props.front }</h4>
                <p>Status: { props.status }</p>
                <p>Last Modified: { new Date(props.lastModified).toLocaleDateString() }</p>
            </div>
            <div className="card-back">
                <p>Answer: { props.back }</p>
            </div>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
        </div>
    </div>
        
    );
}

export default Card;