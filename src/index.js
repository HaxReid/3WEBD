import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './pages/Home/Home';
import SpecificSearchPage from "./pages/SpecificSearch/SpecificSearch";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import LatestModifiedBooks from './components/BookList/LatestModifiedBooks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
          <Route path = "book" element = {<BookList />} />
          <Route path = "/book/:id" element = {<BookDetails />} />
          <Route path = "*" element = {<h1>Not Found</h1>} />
        </Route>
        <Route path = "SpecificSearch" element = {<SpecificSearchPage />} />
        <Route path = "index" element = {<LatestModifiedBooks />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

