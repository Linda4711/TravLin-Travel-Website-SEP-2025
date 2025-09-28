import React, { useState, useEffect } from 'react';
import './styles/globals.css';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { motion } from 'framer-motion';
import TravLinButton from './components/TravLinButton';

// Import all the separate page components
import AboutUsPage from './AboutUs_FINAL_VERSION.tsx';
import CruisesPage from './Cruises_FINAL_VERSION.tsx';
import TravelOptionsPage from './TravelOptions_FINAL_VERSION.tsx';
import ContactPage from './Contact_FINAL_VERSION.tsx';
import TravLinStoriesPage from './TravLinStories_FINAL_VERSION_M.tsx';

// Import home page components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About_WORKING';
import OurValues from './components/OurValues';
import SlidingImageSeparator from './components/SlidingImageSeparator';
import WhatsTrending from './components/WhatsTrending';
import Credentials from './components/Credentials';
import Testimonials from './components/Testimonials';
import SectionDivider from './components/SectionDivider';
import AITravelPlannerWidgetExpanded from './components/AITravelPlannerWidgetExpanded';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';

type PageType = 'home' | 'about' | 'cruises' | 'travel-options' | 'contact' | 'stories';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isLoading, setIsLoading] = useState(false);

  // Smooth page transitions with loading states
  const navigateWithTransition = (newPage: PageType) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsLoading(false);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    }, 300); 
  };

  // Navigation handlers
  const navigateToHome = () => navigateWithTransition('home');
  const navigateToAbout = () => navigateWithTransition('about');
  const navigateToAboutServices = () => {
    navigateWithTransition('about');
    setTimeout(() => {
      const servicesSection = document.getElementById('our-services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };
  const navigateToCruises = () => navigateWithTransition('cruises');
  const navigateToTravelOptions = () => navigateWithTransition('travel-options');
  const navigateToContact = () => navigateWithTransition('contact');
  const navigateToStories = () => navigateWithTransition('stories');

  // Dedicated footer contact navigation
  const handleFooterContactClick = () => {
    if (currentPage === 'contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateWithTransition('contact');
    }
  };

  // Render the appropriate page based on current state
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return (
          <AboutUsPage
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToCruises={navigateToCruises}
            onNavigateToTravelOptions={navigateToTravelOptions}
            onNavigateToContact={handleFooterContactClick}
            onNavigateToStories={navigateToStories}
          />
        );
      
      case 'cruises':
        return (
          <CruisesPage
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToCruises={navigateToCruises}
            onNavigateToTravelOptions={navigateToTravelOptions}
            onNavigateToContact={handleFooterContactClick}
            onNavigateToStories={navigateToStories}
          />
        );
      
      case 'travel-options':
        return (
          <TravelOptionsPage
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToCruises={navigateToCruises}
            onNavigateToTravelOptions={navigateToTravelOptions}
            onNavigateToContact={handleFooterContactClick}
            onNavigateToStories={navigateToStories}
          />
        );
      
      case 'contact':
        return (
          <ContactPage
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToCruises={navigateToCruises}
            onNavigateToTravelOptions={navigateToTravelOptions}
            onNavigateToStories={navigateToStories}
          />
        );
      
      case 'stories':
        return (
          <TravLinStoriesPage
            onNavigateBack={navigateToStories}
            onNavigateToHome={navigateToHome}
            onNavigateToAbout={navigateToAbout}
            onNavigateToCruises={navigateToCruises}
            onNavigateToTravelOptions={navigateToTravelOptions}
            onNavigateToContact={handleFooterContactClick}
            onNavigateToStories={navigateToStories}
          />
        );
      
      case 'home':
      default:
        return (
          <div className="min-h-screen bg-white">
            <SEOHead page="home" />
            
            <Header 
              onNavigateToHome={navigateToHome}
              onNavigateToAbout={navigateToAbout}
              onNavigateToCruises={navigateToCruises}
              onNavigateToTravelOptions={navigateToTravelOptions}
              onNavigateToContact={navigateToContact}
              onNavigateToStories={navigateToStories}
            />
            
            {/* HOME PAGE CONTENT */}
            <main className="relative">
              
              {/* 1. HERO SECTION */}
              <section id="hero" className="relative min-h-screen">
                <Hero />
              </section>
              
              {/* 2. THE TRAVLIN ADVANTAGE SECTION */}
              <section id="advantage" className="section-spacing section-white">
                <div className="content-container">
                  <OurValues onNavigateToServices={navigateToAboutServices} />
                </div>
              </section>
              
              {/* 3. SLIDING IMAGE SEPARATOR */}
              <section id="separator" className="relative">
                <SlidingImageSeparator />
              </section>
              
              {/* 4. OUR CREDENTIALS SECTION */}
              <section id="credentials" className="section-spacing section-light">
                <div className="content-container">
                  <Credentials />
                </div>
              </section>
              
              {/* 5. CRUISE AND TRAVEL OPTIONS SECTION */}
              <section id="cruise-travel-prelude" className="section-spacing section-white">
                <div className="content-container">
                  <div className="text-center">
                    <SectionDivider />
                    <h2 className="section-heading">
                      Cruise & Travel Options
                    </h2>
                    <p className="text-description-large max-w-3xl mx-auto margin-bottom-large">
                      From ocean and luxury cruises to intimate river voyages and adventure cruises and tours, we craft journeys tailored to your dreams. We're here to help. Take the next step and let's start planning your next unforgettable adventure.
                    </p>
                    
                    {/* Two Button Layout - Vertical Stack */}
                    <div className="flex flex-col gap-6 justify-center items-center">
                      <TravLinButton 
                        variant="blue"
                        size="reduced" 
                        onClick={navigateToCruises}
                        className="shadow-2xl"
                        style={{
                          borderRadius: '0px',
                          minHeight: '38px',
                          paddingTop: '0.5rem',
                          paddingBottom: '0.5rem',
                          width: '280px'
                        }}
                      >
                        EXPLORE CRUISE
                      </TravLinButton>
                      <TravLinButton 
                        variant="orange"
                        size="reduced" 
                        onClick={navigateToTravelOptions}
                        className="shadow-2xl"
                        style={{
                          borderRadius: '0px',
                          minHeight: '38px',
                          paddingTop: '0.5rem',
                          paddingBottom: '0.5rem',
                          width: '280px'
                        }}
                      >
                        EXPLORE TRAVEL
                      </TravLinButton>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* 6. TRAVLIN STORIES PRELUDE */}
              <section id="stories-prelude" className="section-spacing section-blue-tint">
                <div className="content-container">
                  <div className="text-center">
                    <SectionDivider />
                    <h2 className="section-heading">
                      TravLin Stories
                    </h2>
                    <p className="text-description-large max-w-3xl mx-auto margin-bottom-large">
                      Discover inspiring journeys, insider secrets, and expert travel tales that ignite your wanderlust and bring your travel dreams to life. Explore now!
                    </p>
                    
                    <div className="flex justify-center">
                      <TravLinButton 
                        variant="yellow"
                        size="reduced" 
                        onClick={navigateToStories}
                        className="shadow-2xl"
                        style={{
                          borderRadius: '0px',
                          minHeight: '38px',
                          paddingTop: '0.5rem',
                          paddingBottom: '0.5rem',
                          width: '280px'
                        }}
                      >
                        DISCOVER STORIES
                      </TravLinButton>
                    </div>
                  </div>
                </div>
              </section>

              {/* 7. TESTIMONIALS SECTION - Screen 1: John M. testimonial */}
              <Testimonials specificTestimonialId={7} />
              
            </main>
            
            {/* FOOTER */}
            <footer className="relative">
              <Footer 
                onContactClick={handleFooterContactClick}
                onNavigateToHome={navigateToHome}
                onNavigateToAbout={navigateToAbout}
                onNavigateToCruises={navigateToCruises}
                onNavigateToTravelOptions={navigateToTravelOptions}
                onNavigateToContact={handleFooterContactClick}
                onNavigateToStories={navigateToStories}
              />
            </footer>
            
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        expand={true}
        richColors={true}
        closeButton={true}
        duration={6000}
        theme="light"
      />
      
      {/* Loading overlay for page transitions */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Render the current page */}
      {renderCurrentPage()}
    </div>
  );
}