import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Cards from './pages/Cards.jsx'

function App() {
    return(
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/cards' element={<Cards />} />
                </Routes>
            </Router>
        </div>
    )
};
  
export default App;