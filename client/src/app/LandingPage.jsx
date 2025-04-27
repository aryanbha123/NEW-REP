import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Info from './components/Info';
import CTA from './components/CTA';
import Team from './components/Team';
import WhyChooseUs from './components/WCU';
import Footer from './components/Footer';

function LandingPage(){
    return (
        <>
            <Header/>
            <Hero/>
            <Info/>
            <CTA/>
            <Team/>
            <WhyChooseUs/>
            <Footer/>
        </>
    );
}

export default LandingPage;
