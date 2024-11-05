// Homepage.js
import React from 'react';
import Hero from '../components/homepage/Hero';
import Carousel from '../components/homepage/Carousel';
import Highlights from '../components/homepage/Highlights';
import IconsNavbar from '../components/homepage/IconsNavbar';
import ImagesPlaceholder from '../components/homepage/ImagesPlaceholder';
import NavigationIcons from '../components/homepage/NavigationIcons';
import SearchBar from '../components/homepage/SearchBar';
import Testimonials from '../components/homepage/Testimonials';
import '../components/homepage/SearchBar.css';


const Homepage = ({openRegisterModal}) => {
  return (
  <div className='homepage'>    
    <Hero openRegisterModal={openRegisterModal}/>
    {/* <SearchBar /> */}
    <NavigationIcons />
    <Carousel />
    <Highlights />
    <ImagesPlaceholder />
    <Testimonials />
  </div>

  );
};

export default Homepage;
