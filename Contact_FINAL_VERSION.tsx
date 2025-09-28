import React from 'react'
import Header from './components/Header'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import SEOHead from './components/SEOHead'
import { Button } from './components/ui/button'
import TravLinButton from './components/TravLinButton'
import Testimonials from './components/Testimonials'
import SectionDivider from './components/SectionDivider'

// Using TravLin Travel branded hero image for Contact Us
const contactHeroImage = 'https://res.cloudinary.com/dgpwz1nqr/image/upload/v1759077936/Why-Use-Travlin-travel-17_ee3rkv.png'


interface ContactPageProps {
  onNavigateBack?: () => void
  onNavigateToServices?: () => void
  onNavigateToCruises?: () => void
  onNavigateToTravelOptions?: () => void
  onNavigateToStories?: () => void
  onNavigateToAbout?: () => void
  onNavigateToAI?: () => void
  onNavigateToHome?: () => void
}

export default function ContactPage({ onNavigateBack, onNavigateToServices, onNavigateToCruises, onNavigateToTravelOptions, onNavigateToStories, onNavigateToAbout, onNavigateToAI, onNavigateToHome }: ContactPageProps) {
  const handleBackToHome = () => {
    if (onNavigateBack) {
      onNavigateBack()
      // Small delay to ensure page transition completes before scrolling
      setTimeout(() => {
        const readyToStartSection = document.getElementById('aibookingsystem')
        if (readyToStartSection) {
          readyToStartSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  // Unified navigation handlers
  const handleNavigateToServices = () => {
    if (onNavigateToServices) {
      onNavigateToServices()
    }
  }

  const handleNavigateToCruises = () => {
    if (onNavigateToCruises) {
      onNavigateToCruises()
    }
  }

  const handleNavigateToTravelOptions = () => {
    if (onNavigateToTravelOptions) {
      onNavigateToTravelOptions()
    }
  }

  const handleNavigateToStories = () => {
    if (onNavigateToStories) {
      onNavigateToStories()
    }
  }

  const handleNavigateToAI = () => {
    if (onNavigateToAI) {
      onNavigateToAI()
    }
  }

  const handleNavigateToContact = () => {
    // Already on contact page, scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white relative">
      <SEOHead page="contact" />

      <Header 
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={handleNavigateToTravelOptions}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToStories={handleNavigateToStories}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={onNavigateToHome}
      />
      

      
      {/* Hero Section - Matching TravLin Stories Style */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24"
        style={{
          background: `linear-gradient(135deg, rgba(0, 117, 204, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.4) 100% 100%), url(${contactHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="hero-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow-strong">
              Contact Us
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 mb-8 text-shadow">
              Let's make it happen together
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-5xl mx-auto leading-relaxed text-shadow mb-8">
              Ready to start planning your next adventure? Contact TravLin Travel today. We turn your travel dreams into reality with expert guidance and personalized service. Get in touch with our specialists to begin your unforgettable journey.
            </p>
          </div>
        </div>

        {/* Decorative Elements - Same as TravLin Stories */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-yellow-300/20 blur-lg floating-element" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Contact Us Section */}
      <section className="section-spacing section-white">
        <div className="content-container">
          <SectionDivider />
          <ContactUs 
            onNavigateToCruises={handleNavigateToCruises}
            onNavigateToTravelOptions={handleNavigateToTravelOptions}
            onNavigateToHome={onNavigateToHome}
          />
        </div>
      </section>

      {/* Screen 2 Testimonials: CCA 26 testimonial with Review Buttons - ONLY on Contact Page */}
      <Testimonials hideHeader={true} showReviewButtons={true} specificTestimonialId={11} />

      
      <Footer 
        onContactClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToServices={handleNavigateToServices}
        onNavigateToCruises={handleNavigateToCruises}
        onNavigateToTravelOptions={handleNavigateToTravelOptions}
        onNavigateToStories={handleNavigateToStories}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToAI={handleNavigateToAI}
        onNavigateToHome={onNavigateToHome}
      />
    </div>
  )
}