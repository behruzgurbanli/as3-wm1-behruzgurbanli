import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../assets/card.css';

const Card = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const [, drag] = useDrag({
        type: 'CARD',
        item: { id: props.id, index: props.index },
      });

      const [, drop] = useDrop({
        accept: 'CARD',
        hover: (draggedItem) => {
          if (draggedItem.id !== props.id) {
            props.onDrop(draggedItem.id, props.index);
          }
        },
    });

    return (
        <div
        className={`card ${isFlipped ? 'flipped' : ''} ${isHovered ? 'hovered' : ''}`}
        onClick={handleFlip}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={(node) => drag(drop(node))}
    >
        <div className={`card-inner ${isEditing ? 'editing' : ''}`}>
            <div className="card-front">
                <h4>{ props.front }</h4>
                <p>Status: { props.status }</p>
                <p>Last Modified: { new Date(props.lastModified).toLocaleDateString() }</p>
            </div>
            <div className="card-back">
                <p>Answer: { props.back }</p>
            </div>
            {isHovered && !isEditing && (
                <div className="card-actions">
                    <button onClick={ () => props.onDelete(props.id) }>Delete</button>
                    <button onClick={ handleEdit }>Edit</button>
                </div>
            )}
        </div>
    </div>
    );
}

export default Card;