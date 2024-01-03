import React, { useState } from 'react';
import CardManagement from '../components/CardManagement';

function Cards() {
    const [error, setError] = useState('');

    return (
        <>
        <CardManagement error={error} setError={setError} />
        {error && <div className='error-message'>{error}</div>}
        </>
    );
}

export default Cards;