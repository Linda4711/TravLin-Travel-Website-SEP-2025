import React, { useState, useEffect } from 'react'
import { MapPin, Mail, Phone, Clock, Send, Bot, Star, Facebook, Instagram, Youtube } from 'lucide-react'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import TravLinButton from './TravLinButton'

interface ContactUsProps {
  onNavigateToCruises?: () => void
  onNavigateToTravelOptions?: () => void
  onNavigateToHome?: () => void
}

export default function ContactUs({ onNavigateToCruises, onNavigateToTravelOptions, onNavigateToHome }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travel_type: '',
    destination: '',
    budget: '',
    travelers: '',
    travel_dates: '',
    message: '',
    honeypot: '' // Bot validation field
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Bot validation - honeypot field should be empty
    if (formData.honeypot !== '') {
      console.log('Bot detected, form submission blocked')
      setIsSubmitting(false)
      return
    }

    // Additional validation for real users
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.')
      setIsSubmitting(false)
      return
    }

    // Real EmailJS implementation
    try {
      console.log('📧 Sending contact form via EmailJS...')
      
      // EmailJS configuration - Live credentials
      const serviceId = 'service_rlnjyuj'
      const templateId = 'template_aiumzob'
      const publicKey = 'GY6ImN3fkI91A6mGw'
      
      // Check if EmailJS is configured (this check is now obsolete since we have real credentials)
      if (false) {
        // Fallback for when EmailJS isn't configured yet
        console.log('📧 EmailJS not configured yet. Logging form data:', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travel_type: formData.travel_type,
          destination: formData.destination,
          budget: formData.budget,
          travelers: formData.travelers,
          travel_dates: formData.travel_dates,
          message: formData.message,
          timestamp: new Date().toISOString()
        })
        
        // Simulate sending delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        toast.success('Thank you for your inquiry! We\'ll be in touch within 24 hours to start planning your perfect journey.', {
          description: 'Your travel inquiry has been received and sent to our team.',
          duration: 6000
        })
      } else {
        // Prepare email template parameters
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          travel_type: formData.travel_type,
          destination: formData.destination,
          budget: formData.budget,
          travelers: formData.travelers,
          travel_dates: formData.travel_dates,
          message: formData.message,
          to_email: 'hello@travlintravel.com.au'
        }

        // Send email via EmailJS
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
        
        console.log('✅ EmailJS response:', response)
        
        toast.success('Thank you for your inquiry! We\'ll be in touch within 24 hours to start planning your perfect journey.', {
          description: 'Your travel inquiry has been sent successfully.',
          duration: 6000
        })
      }
      
      console.log('✅ EmailJS response:', response)
      
      toast.success('Thank you for your inquiry! We\'ll be in touch within 24 hours to start planning your perfect journey.', {
        description: 'Your travel inquiry has been sent successfully.',
        duration: 6000
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        travel_type: '',
        destination: '',
        budget: '',
        travelers: '',
        travel_dates: '',
        message: '',
        honeypot: ''
      })
      
    } catch (error) {
      console.error('❌ Contact form submission error:', error)
      
      // More specific error handling
      let errorMessage = 'There was an issue sending your message. Please try again or contact us directly.'
      
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.'
        } else if (error.message.includes('service') || error.message.includes('template')) {
          errorMessage = 'Service temporarily unavailable. Please try again in a few minutes.'
        }
      }
      
      toast.error(errorMessage, {
        description: 'You can also email us directly at hello@travlintravel.com.au',
        duration: 8000
      })
    }
    
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-8 relative overflow-hidden" style={{ backgroundColor: 'var(--gray-50)' }}>
      {/* Enhanced floating background elements - Reduced opacity for subtle effect */}
      <div className="absolute top-20 left-10 w-64 h-64 watercolor-blob opacity-3 floating-element"></div>
      <div className="absolute bottom-32 right-20 w-48 h-48 watercolor-blob-coral opacity-4 floating-element" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 watercolor-blob opacity-2 floating-element" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 watercolor-blob-coral opacity-3 floating-element" style={{ animationDelay: '4s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section separator - matches home page exactly */}
        <div className="text-center mb-6">
          <div className="content-separator"></div>
        </div>

        {/* Contact Grid - Enhanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Contact Information + Travel Planning */}
          <div>
            {/* Contact Information - NOW AT TOP */}
            <div className="travel-card p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--brand-blue)' }}>
                <MapPin className="w-6 h-6 mr-3" />
                Contact Information
              </h3>

              {/* Contact Info - Better Layout with Business Hours moved up */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Phone */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--brand-blue)' }}>
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--gray-800)' }}>Phone</h4>
                    <a href="tel:+61415355851" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm">
                      +61 415 355 851
                    </a>
                  </div>
                </div>

                {/* Email - consistent text sizing */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--brand-orange)' }}>
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--gray-800)' }}>Email</h4>
                    <a href="mailto:hello@travlintravel.com.au" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm">
                      hello@travlintravel.com.au
                    </a>
                  </div>
                </div>
              </div>

              {/* Address and Business Hours side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Address */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--brand-yellow)' }}>
                    <MapPin className="w-4 h-4" style={{ color: 'var(--gray-800)' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--gray-800)' }}>Address</h4>
                    <div className="text-gray-600 text-sm">
                      PO BOX 7303<br />
                      KARINGAL CENTRE KARINGAL<br />
                      VIC 3199 AUSTRALIA
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--brand-blue)' }}>
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--gray-800)' }}>Business Hours</h4>
                    <div className="text-gray-600 text-sm">
                      Mon-Fri: 9:00AM - 5:30PM<br />
                      Sat: By appointment<br />
                      Sun: Closed
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-4 text-center" style={{ color: 'var(--gray-800)' }}>CONNECT & FOLLOW</h4>
                <div className="flex justify-center space-x-4">
                  <a href="https://www.facebook.com/travlintravel" target="_blank" rel="noopener noreferrer" 
                     className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" 
                     style={{ backgroundColor: 'var(--brand-blue)' }}>
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  
                  <a href="https://www.instagram.com/travlintravel" target="_blank" rel="noopener noreferrer" 
                     className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" 
                     style={{ backgroundColor: '#E1306C' }}>
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  
                  <a href="https://www.youtube.com/@travlintravel/videos" target="_blank" rel="noopener noreferrer" 
                     className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" 
                     style={{ backgroundColor: '#FF0000' }}>
                    <Youtube className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Travel Planning - MOVED BELOW CONTACT INFORMATION */}
            <div className="travel-card p-8">
              
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed">
                  For exploring and experimenting with any Cruise or Travel options before the human experts step in to finalize the plans, return to the AI world here.
                </p>
                
                {/* ENHANCED COMING SOON BANNER - Bigger like Cruise & Travel Options */}
                <div className="flex justify-center mt-4 mb-4">
                  <span 
                    className="text-gray-800 text-lg font-black px-8 py-3 rounded-lg rotate-2 transform"
                    style={{
                      background: `linear-gradient(135deg, var(--brand-yellow) 0%, #ffcd33 50%, var(--brand-yellow) 100%)`,
                      boxShadow: `0 15px 40px rgba(255, 192, 0, 0.8), 0 10px 25px rgba(255, 192, 0, 0.6), 0 5px 15px rgba(255, 192, 0, 0.4)`,
                      border: '3px solid rgba(255, 192, 0, 0.9)',
                      animation: 'softFlash 3s ease-in-out infinite',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    COMING SOON
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <TravLinButton
                  variant="yellow"
                  size="reduced" 
                  className="w-full"
                  style={{
                    borderRadius: '4px',
                    minHeight: '38px',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem'
                  }}
                  onClick={() => {
                    if (onNavigateToCruises) {
                      onNavigateToCruises()
                      // Navigate to cruise page AI section
                      setTimeout(() => {
                        const aiSection = document.querySelector('[data-ai-cruise-section]')
                        if (aiSection) {
                          aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }, 100)
                    }
                  }}
                >
                  CRUISE PLANNER
                </TravLinButton>
                
                <TravLinButton
                  variant="yellow"
                  size="reduced" 
                  className="w-full"
                  style={{
                    borderRadius: '4px',
                    minHeight: '38px',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem'
                  }}
                  onClick={() => {
                    if (onNavigateToTravelOptions) {
                      onNavigateToTravelOptions()
                      // Navigate to travel options page AI section
                      setTimeout(() => {
                        const aiSection = document.querySelector('[data-ai-travel-section]')
                        if (aiSection) {
                          aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }, 100)
                    }
                  }}
                >
                  TRAVEL PLANNER
                </TravLinButton>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Only */}
          <div>
            <div className="travel-card p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--brand-blue)' }}>
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span style={{ color: 'var(--brand-blue)' }}>Send Us a Message</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for bot detection - hidden from users */}
                <div style={{ display: 'none' }}>
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-description-small font-semibold mb-2 block" style={{ color: 'var(--gray-700)' }}>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      placeholder="Your full name" 
                      className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
                      style={{ 
                        borderColor: 'var(--gray-300)', 
                        '--tw-ring-color': 'var(--brand-blue)',
                        fontSize: '0.875rem',
                        minHeight: '42px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-description-small font-semibold mb-2 block" style={{ color: 'var(--gray-700)' }}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      placeholder="your.email@example.com" 
                      className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
                      style={{ 
                        borderColor: 'var(--gray-300)', 
                        '--tw-ring-color': 'var(--brand-blue)',
                        fontSize: '0.875rem',
                        minHeight: '42px'
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-description-small font-semibold mb-2 block" style={{ color: 'var(--gray-700)' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+61 4XX XXX XXX" 
                      className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
                      style={{ 
                        borderColor: 'var(--gray-300)', 
                        '--tw-ring-color': 'var(--brand-blue)',
                        fontSize: '0.875rem',
                        minHeight: '42px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-description-small font-semibold mb-2 block" style={{ color: 'var(--gray-700)' }}>Travel Type</label>
                    <select 
                      name="travel_type" 
                      value={formData.travel_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
                      style={{ 
                        borderColor: 'var(--gray-300)', 
                        backgroundColor: 'var(--white)', 
                        '--tw-ring-color': 'var(--brand-blue)',
                        fontSize: '0.875rem',
                        minHeight: '42px'
                      }}
                    >
                      <option value="">Select travel type</option>
                      <option value="Cruise Holiday">Cruise Holiday</option>
                      <option value="Escorted Tour">Escorted Tour</option>
                      <option value="Independent Travel">Independent Travel</option>
                      <option value="Group Travel">Group Travel</option>
                      <option value="Honeymoon/Romance">Honeymoon/Romance</option>
                      <option value="Family Vacation">Family Vacation</option>
                      <option value="Adventure Travel">Adventure Travel</option>
                      <option value="Cultural Experience">Cultural Experience</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-description-small font-semibold mb-2 block" style={{ color: 'var(--gray-700)' }}>Approximate Budget (AUD)</label>
                    <select 
                      name="budget" 
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
                      style={{ 
                        borderColor: 'var(--gray-300)', 
                        backgroundColor: 'var(--white)', 
                        '--tw-ring-color': 'var(--brand-blue)',
                        fontSize: '0.875rem',
                        minHeight: '42px'
                      }}
                    >
                      <option value="">Select budget range</option>
                      <option value="Under $2,000">Under $2,000</option>
                      <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $15,000">$10,000 - $15,000</option>
                      <option value="$15,000 - $25,000">$15,000 - $25,000</option>
                      <option value="Over $25,000">Over $25,000</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-description-small font-semibold mb-2 block" style={{ color: 'var(--gray-700)' }}>Number of Travelers</label>
                    <select 
                      name="travelers" 
                      value={formData.travelers}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
                      style={{ 
                        borderColor: 'var(--gray-300)', 
                        backgroundColor: 'var(--white)', 
                        '--tw-ring-color': 'var(--brand-blue)',
                        fontSize: '0.875rem',
                        minHeight: '42px'
                      }}
                    >
                      <option value="">Select number</option>
                      <option value="1">1 Traveler</option>
                      <option value="2">2 Travelers</option>
                      <option value="3-4">3-4 Travelers</option>
                      <option value="5-8">5-8 Travelers</option>
                      <option value="9+">9+ Travelers</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-description-small font-semibold mb-2 block" style={{ color: 'var(--gray-700)' }}>Destination(s) of Interest</label>
                    <input 
                      type="text" 
                      name="destination" 
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="e.g., Mediterranean, Alaska, Japan, Europe..." 
                      className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
                      style={{ 
                        borderColor: 'var(--gray-300)', 
                        '--tw-ring-color': 'var(--brand-blue)',
                        fontSize: '0.875rem',
                        minHeight: '42px'
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-description-small font-semibold mb-2 block" style={{ color: 'var(--gray-700)' }}>Preferred Travel Dates</label>
                    <input 
                      type="text" 
                      name="travel_dates" 
                      value={formData.travel_dates}
                      onChange={handleInputChange}
                      placeholder="e.g., March 2025, Flexible" 
                      className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
                      style={{ 
                        borderColor: 'var(--gray-300)', 
                        '--tw-ring-color': 'var(--brand-blue)',
                        fontSize: '0.875rem',
                        minHeight: '42px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-description-small font-semibold mb-2 block" style={{ color: 'var(--gray-700)' }}>Tell Us About Your Dream Trip</label>
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Share your travel dreams, special interests, celebrations, accessibility needs, or any specific requests..." 
                    className="w-full resize-none px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent" 
                    style={{ 
                      borderColor: 'var(--gray-300)', 
                      '--tw-ring-color': 'var(--brand-blue)',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                      minHeight: '100px'
                    }}
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <TravLinButton
                    type="submit" 
                    disabled={isSubmitting}
                    variant="blue"
                    size="reduced" 
                    className="w-full max-w-md"
                    style={{
                      borderRadius: '4px',
                      minHeight: '38px',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
                        Sending...
                      </>
                    ) : (
                      'SEND INQUIRY'
                    )}
                  </TravLinButton>
                </div>

                <p className="text-xs text-center" style={{ color: 'var(--gray-500)' }}>
                  TravLin Travel respects your privacy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}