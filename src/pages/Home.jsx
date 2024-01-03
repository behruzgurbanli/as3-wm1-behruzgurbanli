import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProjectsPage from '../components/Projects'
import '../assets/home.css';

function Home() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3001/projects");
                setProjects(response.data);
            } catch (error) {
                console.error("Error: ", error);
            };
        };

        fetchProjects();
    }, []);

    return (
    <>
        <Navbar />
        <div className='homepage'>
            <div className='intro'>
                <h1 className='welcome-message'>Welcome to My Website!</h1>
                <p>
                    You can access the Flashcard application and my other projects in this website! <br />
                    I am Bahruz Gurbanli who is a Computer Science student at ADA University.
                </p>
            </div>
            <ProjectsPage projects={ projects } />
        </div>
    </>
    )
};

export default Home;