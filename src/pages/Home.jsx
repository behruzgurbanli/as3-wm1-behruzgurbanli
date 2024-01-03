import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Projects from '../components/Projects'
import '../assets/home.css';

function Home() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3001/projects");
                setProjects(response.data);
                console.log("Fetched projects from JSON server.");
            } catch (error) {
                console.error("Error fetching from JSON server: ", error);
                setError("Oops... Server did not respond. Please try again later.");
            };
        };

        fetchProjects();
    }, []);

    return (
    <>
        <div className='homepage'>
            <div className='intro'>
                <h1 className='welcome-message'>Welcome to My Website!</h1>
                <p>
                    You can access the Flashcard application and my other projects in this website! <br />
                    I am Bahruz Gurbanli who is a Computer Science student at ADA University.
                </p>
            </div>
            {error ? 
                (<div className='error-message'>{ error }</div>)
                :
                (<Projects projects={ projects } />)
            }
        </div>
    </>
    )
};

export default Home;