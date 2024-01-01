import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:3001/projects');
                setProjects(response.data);
            } catch (error) {
                console.error("Error: ", error);
            }
        }

        fetchProjects();
    }, []);

    return (
        <Navbar />
    )
}

export default Home;