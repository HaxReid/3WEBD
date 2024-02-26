import React, { useState, useContext, useEffect, useCallback } from 'react';

const URL = "http://openlibrary.org/search.json?";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");
    const [searchType, setSearchType] = useState('title');

    const fetchBooksByType = useCallback(async (searchTerm, searchType) => {
        setLoading(true);
        try {
            let url = `${URL}`;
            if (searchType === 'title') {
                url += `title=${searchTerm}`;
            } else if (searchType === 'author') {
                url += `author=${searchTerm}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            const { docs } = data;

            if (docs) {
                const newBooks = docs.slice(0, 20).map((bookSingle) => {
                    const { key, author_name, cover_i, edition_count, first_publish_year, title } = bookSingle;

                    return {
                        id: key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title,
                    }
                });

                setBooks(newBooks);

                if (newBooks.length > 0) {
                    setResultTitle(`Résultats de recherche pour "${searchTerm}"`);
                } else {
                    setResultTitle(`Aucun livre trouvé pour "${searchTerm}"`);
                }
            } else {
                setBooks([]);
                setResultTitle(`Aucun livre trouvé pour "${searchTerm}"`);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooksByType(searchTerm, searchType);
    }, [searchTerm, searchType, fetchBooksByType]);

    return (
        <AppContext.Provider value={{
            loading, books, setSearchTerm, resultTitle, setResultTitle, setSearchType,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };
