import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/homepage/Hero';
import SearchBar from './components/homepage/SearchBar';
import Footer from './components/Footer';
import IconsNavbar from './components/homepage/IconsNavbar';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Hero />
        <SearchBar />
        <IconsNavbar />

        <Footer />

      </div>
    </Router>
  );
}

export default App;
