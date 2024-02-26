import React, { useRef, useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context.';
import "./SearchForm.css";

const SearchForm = () => {
    const { setSearchTerm, setResultTitle, setSearchType } = useGlobalContext();
    const searchText = useRef('');
    const navigate = useNavigate();
    const [searchType, setSearchTypeLocal] = useState('title');

    useEffect(() => searchText.current.focus(), []);

    const handleSearchTypeChange = (e) => {
        setSearchTypeLocal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tempSearchTerm = searchText.current.value.trim();
        if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
            setSearchTerm("Entrez un mot clé");
            setResultTitle("Livres trouvés ...");
        } else {
            setSearchTerm(tempSearchTerm);
        }

        setSearchType(searchType);
        navigate("/book");
    };

    return (
        <div className='search-form'>
            <div className='container'>
                <div className='search-form-content'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <div className='search-form-elem flex flex-sb bg-white'>
                            <input type="text" className='form-control' placeholder='Recherche générale' ref={searchText} />
                            <button type="submit" className='flex flex-c'>
                                <FaSearch className='icon-blue' size={32} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchForm;
