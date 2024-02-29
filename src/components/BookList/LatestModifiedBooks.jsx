import React, { useEffect, useState } from 'react';
import Loading from '../Loader/Loader';
import "./BookList.css";
import coverImg from '../../images/cover_not_found.jpg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../Header/Header';

const LatestModifiedBooks = () => {
    const [latestModifiedBooks, setLatestModifiedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState(""); // Stocke le filtre 

    const fetchData = async () => {
        try {
            const response = await fetch('http://openlibrary.org/recentchanges.json?limit=10');
            const data = await response.json();
            setLatestModifiedBooks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recently modified books:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterChange = (event) => {
        setFilterType(event.target.value); // Mettre à jour le  filtre 
    };

    if (loading) return <Loading />;

    return (
        <>
        <Navbar />
        <Header />
        <div className="recently-modified-books pd-top">
            <h1>Les 10 dernières modifications ! </h1>
            <div>
                <label htmlFor="filterType">Filtrer par type :</label>
                <select id="filterType" value={filterType} onChange={handleFilterChange}>
                    <option value="">Tout</option>
                    <option value="book">Livres</option>
                    <option value="update">Mises à jour</option>
                    <option value="account">Comptes</option>
                </select>
            </div>
            <div className='booklist-content grid'>
                {latestModifiedBooks.map((book, index) => {
                    // Vérifier l'URL
                    if (filterType && !book.kind.includes(filterType)) {
                        return null; // Si l'URL ne contient pas , ne pas afficher 
                    }
                    return (
                        <div key={index} className="book-item">
                            <p>ID: {book.id}</p>
                            <p>Type: {book.kind}</p>
                            <p>Commentaire: {book.comment}</p>
                            <p>Date de modification: {new Date(book.timestamp).toLocaleString()}</p>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
};

export default LatestModifiedBooks;
