import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Contact from './pages/Contact'
import Cards from './pages/Cards'
import NoMatchRoute from './components/NoMatchRoute'

function App() {
    return(
    <>
        <Router>
        <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/as3-wm1-behruzgurbanli' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/cards' element={<Cards />} />
                <Route path='/*' element={<NoMatchRoute />} />
            </Routes>
        </Router>
    </>
    )
};
  
export default App;