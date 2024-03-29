import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../assets/card.css';

const Card = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState({
      front: props.front,
      back: props.back,
      status: props.status
    });
    const [isSelected, setIsSelected] = useState(false);

    const handleFlip = () => {
      if (!isEditing && !isSelected && !isDragging)
        setIsFlipped(!isFlipped);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setIsFlipped(false);
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
      props.onEdit({ id: props.id, ...editedContent });
      setIsEditing(false);
    }

    const handleCancelEdit = () => {
        setEditedContent({
            front: props.front,
            back: props.back,
            status: props.status
        });
        setIsEditing(false);
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: { id: props.id, index: props.index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'CARD',
        hover: (item) => {
            if (item.index !== props.index) {
                props.onDrop(item.index, props.index);
                item.index = props.index;
            }
        },
    });

    return (
        <>
      <div
      ref={(node) => drag(drop(node))}
      className={`card-container ${isDragging ? 'dragging' : ''}`}
      onClick={handleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
          <div className={`card-inner ${isEditing ? 'editing' : ''}`}>
              <div className="card-front">
                  {isEditing ? (
                      <>
                          <input
                              type="text"
                              value={editedContent.front}
                              onChange={(e) =>
                                  setEditedContent({ ...editedContent, front: e.target.value })
                              }
                          />
                          <input
                              type="text"
                              value={editedContent.back}
                              onChange={(e) =>
                                  setEditedContent({ ...editedContent, back: e.target.value })
                              }
                          />
                          <select
                                value={editedContent.status}
                                onChange={(e) => setEditedContent({ ...editedContent, status: e.target.value })}
                            >
                                <option value="Want to Learn">Want to Learn</option>
                                <option value="Learned">Learned</option>
                                <option value="Noted">Noted</option>
                            </select>
                           <button onClick={handleSave} className="btn edit">
                            Save
                          </button>
                          <button onClick={handleCancelEdit} className="btn delete">
                            Cancel
                          </button>
                      </>
                  ) : (
                      <>
                          <h4>{props.front}</h4>
                          <p>Status: {props.status}</p>
                          <span>Select card: </span>
                          <input type="checkbox" checked={props.isSelected} onChange={() => {
                            props.onSelect(props.id);
                            setIsFlipped(false);
                            setIsSelected(!isSelected);
                          }} />
                          <p className='last-modified'>Last Modified: {new Date(props.lastModified).toLocaleString()}</p>
                      </>
                  )}
              </div>
              <div className="card-back">
                  <p>{props.back}</p>
              </div>
          </div>
      </div>
      <div>
        {isHovered && !isEditing && (
          <div className="card-actions">
              <button onClick={handleEdit} className="btn edit">
                  Edit
              </button>
              <button onClick={() => props.onDelete(props.id)} className="btn delete">
                  Delete
              </button>
          </div>
      )}
    </div>
  </div>
    </>
    );
}

export default Card;