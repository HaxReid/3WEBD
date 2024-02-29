import React from 'react';
import Header from '../../components/Header/Header';
import LatestModifiedBooks from '../../components/BookList/LatestModifiedBooks';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <main>
        <Header />
{/* Contenu des pages sous / */}
        <Outlet />
    </main>
  )
}

export default Home
