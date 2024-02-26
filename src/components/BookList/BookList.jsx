import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context.';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";

const BookList = () => {
    const { books, loading, resultTitle } = useGlobalContext();
    const booksWithCovers = books.map((singleBook) => {
        return {
            ...singleBook,
            id: singleBook.id.replace("/works/", ""),
            cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
        }
    });

    const [scrollDownAmount, setScrollDownAmount] = useState(500); // Définir la quantité de défilement vers le bas en pixels

    useEffect(() => {
        if (!loading) {
            const timeout = setTimeout(() => {
                window.scrollBy({ top: scrollDownAmount, behavior: 'smooth' }); // Faites défiler vers le bas de la page
            }, 500); // Attendre 0.5 seconde après la fin du chargement
            return () => clearTimeout(timeout);
        }
    }, [loading, scrollDownAmount]);

    if (loading) return <Loading />;

    return (
        <section className='booklist'>
            <div className='container'>
                <div className='section-title'>
                    <h2>{resultTitle}</h2>
                </div>
                <div className='booklist-content grid'>
                    {
                        booksWithCovers.slice(0, 30).map((item, index) => {
                            return (
                                <Book key={index} {...item} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default BookList;
