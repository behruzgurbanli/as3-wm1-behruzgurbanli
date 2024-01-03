import React, { useState } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
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

    const handleFlip = () => {
      if (!isEditing)
        setIsFlipped(!isFlipped);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
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

    return (
        <>
      <div
      className="card-container"
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
                          <button onClick={handleCancelEdit} className="btn edit">
                            Cancel
                          </button>
                      </>
                  ) : (
                      <>
                          <h4>{props.front}</h4>
                          <p>Status: {props.status}</p>
                          <p>Last Modified: {new Date(props.lastModified).toLocaleString()}</p>
                      </>
                  )}
              </div>
              <div className="card-back">
                  <p>Answer: {props.back}</p>
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