import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "./SpecificSearch.css";
import SpecificSearch from '../../components/SpecificSearch/SpecificSearch';

const SpecificSearchPage = () => {
  return (
    <>
        <Navbar />
        <div className='header-content flex flex-c text-center text-white'>
          <h2 className='header-title'>Recherche avancée</h2>
          <SpecificSearch/>
        </div>
    </>

  )
}

export default SpecificSearchPage
