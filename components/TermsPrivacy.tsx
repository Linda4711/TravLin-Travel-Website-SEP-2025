import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { X, FileText, Shield, AlertTriangle, Download, Mail, CheckCircle, User, Phone, Calendar, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'

interface TermsPrivacyProps {
  isOpen: boolean
  onClose: () => void
}

interface CustomerAcceptanceForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName?: string
  agreedToTerms: boolean
  agreedToFees: boolean
  agreedToPrivacy: boolean
}

export default function TermsPrivacy({ isOpen, onClose }: TermsPrivacyProps) {
  const [showAcceptanceForm, setShowAcceptanceForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionComplete, setSubmissionComplete] = useState(false)
  const [form, setForm] = useState<CustomerAcceptanceForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    agreedToTerms: false,
    agreedToFees: false,
    agreedToPrivacy: false
  })

  // Production-safe configuration
  const CONTACT_EMAIL = 'hello@travlintravel.com.au'

  const pdfLinks = {
    serviceFees: 'https://travlintravel.com.au/wp-content/uploads/sites/12/2025/07/TravLin-Travel_Schedule-of-FeesATIA-Fee-Flyer_JUL-25.pdf',
    travelInfo: 'https://travlintravel.com.au/wp-content/uploads/sites/12/2025/07/TravLin-Travel_Travel-Information-ONLY_JUL25.pdf',
    customerAcceptance: 'https://travlintravel.com.au/wp-content/uploads/sites/12/2025/07/TravLin-Travel_Customer-Acceptance-ONLY_JUL25.pdf'
  }

  if (!isOpen) return null

  const handleInputChange = (field: keyof CustomerAcceptanceForm, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitAcceptance = async () => {
    // Validation
    if (!form.firstName || !form.lastName || !form.email) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!form.agreedToTerms || !form.agreedToFees || !form.agreedToPrivacy) {
      toast.error('Please agree to all terms and conditions')
      return
    }

    setIsSubmitting(true)

    try {
      // Create acceptance record
      const acceptanceData = {
        customer: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          businessName: form.businessName || 'N/A'
        },
        acceptance: {
          timestamp: new Date().toLocaleString('en-AU', { 
            timeZone: 'Australia/Melbourne',
            year: 'numeric',
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          acceptanceId: `TLT-${Date.now()}`,
          documentsAccepted: ['Service Fees', 'Travel Information', 'Customer Acceptance', 'Privacy Policy'],
          ipAddress: 'Hidden for privacy',
          userAgent: navigator.userAgent.substring(0, 100) // Limit length
        }
      }

      // Store in localStorage for customer reference
      localStorage.setItem('travlin-acceptance-record', JSON.stringify(acceptanceData))

      // Send email notification via EmailJS
      try {
        const emailParams = {
          customer_name: acceptanceData.customer.name,
          customer_email: acceptanceData.customer.email,
          customer_phone: acceptanceData.customer.phone,
          business_name: acceptanceData.customer.businessName,
          acceptance_id: acceptanceData.acceptance.acceptanceId,
          timestamp: acceptanceData.acceptance.timestamp,
          documents_accepted: acceptanceData.acceptance.documentsAccepted.join(', '),
          user_agent: acceptanceData.acceptance.userAgent
        }

        await emailjs.send(
          'service_rlnjyuj',
          'template_270l5y4',
          emailParams,
          'GY6ImN3fkI91A6mGw'
        )

        console.log('✅ Customer acceptance email sent successfully')
      } catch (emailError) {
        console.error('📧 EmailJS error:', emailError)
        // Don't fail the entire process if email fails
      }

      // Brief delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(
        `Terms accepted successfully! Please contact us at ${CONTACT_EMAIL} with your acceptance ID: ${acceptanceData.acceptance.acceptanceId}`,
        { duration: 8000 }
      )

      setSubmissionComplete(true)

    } catch (error) {
      toast.error('Failed to submit acceptance. Please try again.')
      console.error('Acceptance submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      businessName: '',
      agreedToTerms: false,
      agreedToFees: false,
      agreedToPrivacy: false
    })
    setShowAcceptanceForm(false)
    setSubmissionComplete(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const modalContent = () => {
    if (submissionComplete) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 999999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Terms Accepted Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Thank you, {form.firstName}! Please contact us at {CONTACT_EMAIL} with your acceptance ID for next steps.
                Your acceptance ID is: <span className="font-mono text-blue-600">TLT-{Date.now()}</span>
              </p>
              <div className="space-y-3">
                <Button onClick={handleClose} className="w-full">
                  Continue Planning Your Trip
                </Button>
                <Button variant="outline" onClick={resetForm} className="w-full">
                  Submit Another Acceptance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (showAcceptanceForm) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 999999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Customer Acceptance Form</h2>
                  <p className="text-sm text-gray-500">Complete to proceed with booking</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAcceptanceForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Customer Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+61 xxx xxx xxx"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessName">Business Name (Optional)</Label>
                      <Input
                        id="businessName"
                        value={form.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder="Company/Organization name"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Acceptance */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Terms & Conditions Acceptance
                  </h3>
                  
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={form.agreedToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreedToTerms', !!checked)}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                        I have read and agree to the <a href={pdfLinks.travelInfo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Travel Information & Terms of Service</a> *
                      </Label>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreeFees"
                        checked={form.agreedToFees}
                        onCheckedChange={(checked) => handleInputChange('agreedToFees', !!checked)}
                      />
                      <Label htmlFor="agreeFees" className="text-sm leading-relaxed">
                        I have read and agree to the <a href={pdfLinks.serviceFees} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Schedule of Professional Service Fees</a> *
                      </Label>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreePrivacy"
                        checked={form.agreedToPrivacy}
                        onCheckedChange={(checked) => handleInputChange('agreedToPrivacy', !!checked)}
                      />
                      <Label htmlFor="agreePrivacy" className="text-sm leading-relaxed">
                        I have read and agree to the <a href={pdfLinks.customerAcceptance} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Customer Acceptance Form</a> and Privacy Policy and understand how my personal information will be handled *
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Legal Notice */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Legal Notice:</strong> By submitting this form, you acknowledge that any payment for travel components constitutes acceptance of both agency and supplier terms and conditions. This acceptance will be recorded for your reference.
                  </p>
                </div>
              </div>
            </CardContent>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAcceptanceForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitAcceptance}
                  disabled={isSubmitting || !form.agreedToTerms || !form.agreedToFees || !form.agreedToPrivacy}
                  className="flex-1"
                  style={{ backgroundColor: 'var(--brand-orange)' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Terms & Continue
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 999999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--brand-blue)' }}>
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Terms & Privacy</h2>
                <p className="text-sm text-gray-500">Effective 01 Jul 2025</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="space-y-6">
              {/* Quick Access Downloads */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Document Downloads
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <a 
                    href={pdfLinks.serviceFees} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Schedule of Professional Service Fees
                  </a>
                  <a 
                    href={pdfLinks.travelInfo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Travel Information & Terms
                  </a>
                  <a 
                    href={pdfLinks.customerAcceptance} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Customer Acceptance Form
                  </a>
                </div>
              </div>

              {/* Customer Acceptance CTA */}
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--brand-orange)' }}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-orange-800 mb-3">Ready to Proceed with Your Booking?</h3>
                <p className="text-sm text-orange-700 mb-4">
                  Complete our customer acceptance form to acknowledge that you've read and agree to our terms and conditions. 
                  This enables us to proceed with your travel arrangements.
                </p>
                <Button 
                  onClick={() => setShowAcceptanceForm(true)}
                  style={{ backgroundColor: 'var(--brand-orange)' }}
                  className="text-white hover:opacity-90"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Customer Acceptance
                </Button>
              </div>

              {/* Executive Summary */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Executive Summary
                </h3>
                <div className="text-sm text-yellow-700 space-y-2">
                  <p>Although you should read all of the terms and conditions, the following is a summary of the most important:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Prices, including, in some cases, of confirmed bookings, may be subject to change.</li>
                    <li>Some confirmed bookings are non-refundable if cancelled by you and it is your responsibility to check if this applies.</li>
                    <li>We will be entitled to retain our service fees even if a booking is cancelled or does not proceed for any reason which is not our fault.</li>
                    <li>It is your responsibility to make yourself aware of all information relevant to your travel plans, including but not limited to visa requirements and health precautions.</li>
                    <li>We are not your agent and may receive additional fees or other incentives from Suppliers.</li>
                    <li>We are not liable for the accuracy of any published Supplier content including websites and brochures.</li>
                  </ul>
                </div>
              </div>

              {/* Main Content */}
              <div className="prose prose-sm max-w-none">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
                
                <p className="mb-4">
                  Please read the following terms and conditions carefully.
                </p>

                <p className="mb-4">
                  You must not make any booking unless you are 18 years of age or older and understand and agree with the following terms and conditions.
                  These terms and conditions apply to bookings you make with a Consultant (instore, over the phone or by email) as well as online bookings made via our website.
                  These terms and conditions govern our relationship with you. Once we accept a booking from you on behalf of a Supplier, you will also have a separate contract with the Supplier, which will be governed by other terms and conditions. It is your responsibility to make yourself aware of those other terms and conditions.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Prices and Taxes</h3>
                <p className="mb-4">
                  All prices that we quote are in Australian Dollars and based on twin share accommodation unless otherwise stated. Please note that prices quoted are subject to change at the discretion of the Supplier prior to booking.
                  Price changes may occur after booking because of matters outside our control which increase the cost of the Product. Such factors include adverse currency fluctuations, fuel surcharges, taxes and airfare increases.
                </p>

                <p className="mb-4">
                  Please contact your Consultant for up-to-date prices. Even if paid in full, a price may change because of matters outside our control.
                </p>

                <p className="mb-4">
                  Prices include all applicable taxes requiring payment prior to departure, and may be subject to adjustment in the event of an increase in those taxes. On other occasions, you may be liable for taxes in addition to the quoted price of the Product. For example, there may be a local tax charged at some airports or resorts.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Products</h3>
                <p className="mb-4">
                  All Products that we quote on are subject to availability and may be withdrawn or varied by the Supplier without notice.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Fees and Surcharges</h3>
                <p className="mb-4">
                  A variety of fees and surcharges may be payable to us, including booking or reservation fees, cancellation and amendment fees, credit card merchant fees,
                  insurance claim processing fees or fees for adhoc services performed as required. You may see our current schedule of professional service fees in the downloadable document above.
                </p>

                <p className="mb-4">
                  Payment by credit card will incur a surcharge to offset our cost of acceptance of payment by credit card. The surcharge varies depending on credit card type, it is your responsibility to advise the correct credit card type to ensure that the appropriate surcharge is applied. We accept no responsibility for an inappropriate surcharge being applied if the correct card type has not been advised, and the surcharge applied shall not be refundable.
                </p>

                <p className="mb-4">
                  You authorise us to charge all monies payable by you in relation to any booking we make on your behalf or other services we have procured or provided to the credit card or debit card designated by you. If payment is not received from the card issuer or its agents for any reason, you agree to pay us all amounts due immediately on demand.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Change and Cancellation Fees</h3>
                <p className="mb-4">
                  Be aware that some confirmed bookings are not refundable if cancelled, and also may not be transferable to another date or otherwise changed. Alternatively, a change may only be permissible subject to payment of an additional fee or charge. It is your responsibility to check if a booking is non-refundable or will incur charges for changing it before placing the booking.
                </p>

                <p className="mb-4">
                  Changes and cancellations of confirmed bookings may incur fees from Suppliers in addition to our service fees. Suppliers' fees are outlined in their relevant terms and conditions.
                </p>

                {/* Privacy Section */}
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Privacy Policy</h2>
                
                <p className="mb-4">
                  TravLin Travel, its businesses, websites and apps operate from Australia and this policy provides information in accordance with our obligations under the Privacy Act. We understand that you care how your personal information is handled and we appreciate your trust that we will do so carefully and sensibly and in compliance with the Australian Privacy Principles of the Privacy Act 1988.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Your personal information</h3>
                <p className="mb-4">
                  TravLin Travel and its associated entities may, in the course of arranging travel for you, receive and hold personal information about you, that includes but is not limited to, your full name, your contact details, your business or home address, your date of birth, your passport data, details of any loyalty program memberships, health condition and medical history, concession card number or driver's license number and other data relevant to the services – general and personalised that we provide you.
                </p>

                <p className="mb-4">
                  In these circumstances, you agree that transacting travel bookings authorises us to disclose only the required personal information when required, in order to finalise these travel bookings on your behalf. TravLin Travel will normally only collect your sensitive information with your consent and where it is required for your travel arrangements such as allergies, disabilities that requires special arrangements or in the event of an accident.
                  We may also collect your personal information from others who make a booking on your behalf and they should be authorised to provide us with your information.
                </p>

                {/* Complaints Handling */}
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Complaints Handling Policy and Procedures</h2>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Objective of the Policy</h3>
                <p className="mb-4">
                  As a responsible travel agent, we seek to maintain and enhance our reputation of providing you with high quality products and services. We value complaints as they assist us to improve our products, services and customer service. We are committed to being responsive to the needs and concerns of our customers or potential customers and to resolving your complaint as quickly as possible.
                </p>

                {/* Contact Information */}
                <div className="bg-gray-50 p-4 rounded-lg border mt-8">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Privacy Officer Contact
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>TravLin Travel</strong></p>
                    <p>PO Box 7303, Karingal Centre</p>
                    <p>Karingal VICTORIA 3199</p>
                    <p>Telephone: +61 (415) 355 851</p>
                    <p>Email: hello@travlintravel.com.au</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                TravLin Travel reserves the right to change its privacy policy at any time. It is advisable to review this privacy statement periodically for changes.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowAcceptanceForm(true)}
                  style={{ backgroundColor: 'var(--brand-orange)' }}
                  className="text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept Terms
                </Button>
                <Button onClick={handleClose} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Render modal content using Portal to escape footer's stacking context
  return createPortal(modalContent(), document.body)
}