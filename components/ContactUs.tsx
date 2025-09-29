import React, { useState } from 'react'
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
      
      // Prepare email template parameters with multiple field name formats for compatibility
      const templateParams = {
        // Standard EmailJS template fields
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'hello@travlintravel.com.au',
        subject: `Travel Inquiry from ${formData.name}`,
        
        // Custom form fields
        phone: formData.phone,
        travel_type: formData.travel_type,
        destination: formData.destination,
        budget: formData.budget,
        travelers: formData.travelers,
        travel_dates: formData.travel_dates,
        
        // Comprehensive message field
        message: `NEW TRAVEL INQUIRY from ${formData.name}

CONTACT DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

TRAVEL PREFERENCES:
Type of Travel: ${formData.travel_type || 'Not specified'}
Destination: ${formData.destination || 'Open to suggestions'}
Budget: ${formData.budget || 'Not specified'}
Number of Travelers: ${formData.travelers || 'Not specified'}
Travel Dates: ${formData.travel_dates || 'Flexible'}

MESSAGE:
${formData.message || 'No additional message'}

---
Submitted via TravLin Travel Contact Form`,
        
        // Template-specific fields for display
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone || 'Not provided',
        user_travel_type: formData.travel_type || 'Not specified',
        user_destination: formData.destination || 'Open to suggestions',
        user_budget: formData.budget || 'Not specified',
        user_travelers: formData.travelers || 'Not specified',
        user_travel_dates: formData.travel_dates || 'Flexible',
        user_message: formData.message,
        inquiry_type: 'Travel Planning Inquiry',
        source: 'Contact Us Form',
        timestamp: new Date().toISOString()
      }

      // Send email via EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
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
        description: 'Contact us directly: hello@travlintravel.com.au or (07) 5300 5780',
        duration: 8000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="section-spacing section-light">
      <div className="content-container">
        
        {/* Header Section */}
        <div className="text-center margin-bottom-large">
          <div className="section-divider"></div>
          <h1 className="section-heading">Contact Our Travel Experts</h1>
          <p className="text-description-large max-w-3xl mx-auto">
            Ready to turn your travel dreams into reality? Our experienced travel consultants are here to create your perfect journey. Get in touch today for personalised service and expert advice.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="component-heading">Get In Touch</h2>
              <p className="text-description margin-bottom">
                Speak with our travel experts who specialise in creating extraordinary journeys tailored to your preferences and budget.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                  <p className="text-gray-600 mb-2">Call us for immediate assistance</p>
                  <a href="tel:0753005780" className="text-blue-600 hover:text-blue-700 font-medium text-lg">
                    (07) 5300 5780
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600 mb-2">Send us your travel inquiry</p>
                  <a href="mailto:hello@travlintravel.com.au" className="text-orange-600 hover:text-orange-700 font-medium">
                    hello@travlintravel.com.au
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-600 mb-2">Serving clients across Australia</p>
                  <p className="text-gray-800 font-medium">Sunshine Coast, Queensland</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Follow Our Journeys</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com/travlintravel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="https://instagram.com/travlintravel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center justify-center transition-colors instagram-icon-fix"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://youtube.com/@travlintravel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="mb-6">
              <h2 className="component-heading">Send Us Your Travel Inquiry</h2>
              <p className="text-description">
                Tell us about your dream destination and we'll create the perfect itinerary for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field for bot detection */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="travel_type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Travel
                </label>
                <select
                  id="travel_type"
                  name="travel_type"
                  value={formData.travel_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select travel type</option>
                  <option value="cruise">Cruise</option>
                  <option value="tour">Escorted Tour</option>
                  <option value="independent">Independent Travel</option>
                  <option value="business">Business Travel</option>
                  <option value="honeymoon">Honeymoon/Romance</option>
                  <option value="family">Family Holiday</option>
                  <option value="adventure">Adventure Travel</option>
                  <option value="luxury">Luxury Travel</option>
                </select>
              </div>

              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Where would you like to go?"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <select
                    id="travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="1">1 Traveler</option>
                    <option value="2">2 Travelers</option>
                    <option value="3-4">3-4 Travelers</option>
                    <option value="5-8">5-8 Travelers</option>
                    <option value="9+">9+ Travelers</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range (AUD)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select budget</option>
                    <option value="under-3000">Under $3,000</option>
                    <option value="3000-5000">$3,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000-20000">$10,000 - $20,000</option>
                    <option value="over-20000">Over $20,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="travel_dates" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Travel Dates
                </label>
                <input
                  type="text"
                  id="travel_dates"
                  name="travel_dates"
                  value={formData.travel_dates}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., March 2024, flexible, 2-3 weeks"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tell Us About Your Dream Trip
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                  placeholder="Share any special requirements, interests, or questions you have about your trip..."
                ></textarea>
              </div>

              <TravLinButton
                type="submit"
                variant="blue"
                size="lg"
                disabled={isSubmitting}
                className="w-full justify-center"
                style={{ borderRadius: '0px' }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Travel Inquiry
                  </>
                )}
              </TravLinButton>
            </form>
          </div>
        </div>

        {/* AI Travel Planner Call-to-Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 border border-blue-100">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="component-heading">Want Instant Travel Ideas?</h2>
            <p className="text-description margin-bottom">
              Try our AI Travel Planner for immediate destination suggestions and itinerary ideas based on your preferences.
            </p>
            <div className="button-group">
              <TravLinButton
                variant="orange"
                size="reduced"
                onClick={onNavigateToTravelOptions}
                className="shadow-lg"
                style={{ borderRadius: '0px' }}
              >
                Explore AI Travel Planner
              </TravLinButton>
              {onNavigateToCruises && (
                <TravLinButton
                  variant="blue"
                  size="reduced"
                  onClick={onNavigateToCruises}
                  className="shadow-lg"
                  style={{ borderRadius: '0px' }}
                >
                  Browse Cruises
                </TravLinButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
