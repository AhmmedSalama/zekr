'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(data.message || 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.')
      }
    } catch (err) {
      setError('حدث خطأ أثناء الإرسال. حاول مرة أخرى.')
      console.error('Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="heading text-center my-[100px]">
        <h1 className="text-2xl md:text-[48px] font-bold text-[#FFFEEE] leading-tight">
          <span className="text-[#E7D7A0]">تَوَاصَلْ </span> – مَعَنَا 
        </h1>
        <p className="text-[#FAFAFAB2] text-[16px] md:text-[24px] font-normal mt-4 max-w-3xl mx-auto leading-relaxed">
          نَسْعَدُ بِتَوَاصُلِكُمْ مَعَنَا. يُمْكِنُكُمْ إِرْسَالُ اسْتِفْسَارَاتِكُمْ وَاقْتِرَاحَاتِكُمْ وَسَنَكُونُ سُعَدَاءَ بِالرَّدِّ عَلَيْكُمْ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {/* Contact Info - Left Side */}
        <div className="lg:col-span-1 space-y-6">
          {/* Email Card */}
          <div className="bg-[#092147]/60 backdrop-blur-sm border border-[#E7D7A0]/20 rounded-2xl p-6 hover:border-[#E7D7A0]/40 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E7D7A0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-[#E7D7A0]" />
              </div>
              <div>
                <h3 className="text-[#FFFEEE] font-bold text-lg mb-2">البريد الإلكتروني</h3>
                <a 
                  href="mailto:info@zekr.com" 
                  className="text-[#FAFAFAB2] hover:text-[#E7D7A0] transition-colors"
                >
                  info@zekr.com
                </a>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-[#092147]/60 backdrop-blur-sm border border-[#E7D7A0]/20 rounded-2xl p-6 hover:border-[#E7D7A0]/40 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E7D7A0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#E7D7A0]" />
              </div>
              <div>
                <h3 className="text-[#FFFEEE] font-bold text-lg mb-2">رقم الهاتف</h3>
                <a 
                  href="tel:+201234567890" 
                  className="text-[#FAFAFAB2] hover:text-[#E7D7A0] transition-colors"
                >
                  +20 123 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-[#092147]/60 backdrop-blur-sm border border-[#E7D7A0]/20 rounded-2xl p-6 hover:border-[#E7D7A0]/40 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E7D7A0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#E7D7A0]" />
              </div>
              <div>
                <h3 className="text-[#FFFEEE] font-bold text-lg mb-2">العنوان</h3>
                <p className="text-[#FAFAFAB2]">
                  القاهرة، مصر
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-[#092147]/60 backdrop-blur-sm border border-[#E7D7A0]/20 rounded-2xl p-6">
            <h3 className="text-[#FFFEEE] font-bold text-lg mb-4">تابعنا على</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-[#E7D7A0]/10 rounded-lg flex items-center justify-center hover:bg-[#E7D7A0]/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-[#E7D7A0]" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[#E7D7A0]/10 rounded-lg flex items-center justify-center hover:bg-[#E7D7A0]/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-[#E7D7A0]" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-[#E7D7A0]/10 rounded-lg flex items-center justify-center hover:bg-[#E7D7A0]/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[#E7D7A0]" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form - Right Side */}
        <div className="lg:col-span-2">
          <div className="bg-[#092147]/60 backdrop-blur-sm border border-[#E7D7A0]/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#FFFEEE] mb-6">
              أرسل لنا رسالة
            </h2>

            {/* Success Message */}
            {submitted && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-center font-medium">
                  ✓ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-center font-medium">
                  ✗ {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-[#FFFEEE] font-medium mb-2">
                  الاسم الكامل <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0A102A]/50 border border-[#E7D7A0]/20 rounded-lg text-[#FFFEEE] placeholder-[#FAFAFAB2]/50 focus:outline-none focus:border-[#E7D7A0] transition-colors"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-[#FFFEEE] font-medium mb-2">
                  البريد الإلكتروني <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0A102A]/50 border border-[#E7D7A0]/20 rounded-lg text-[#FFFEEE] placeholder-[#FAFAFAB2]/50 focus:outline-none focus:border-[#E7D7A0] transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-[#FFFEEE] font-medium mb-2">
                  الموضوع <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0A102A]/50 border border-[#E7D7A0]/20 rounded-lg text-[#FFFEEE] placeholder-[#FAFAFAB2]/50 focus:outline-none focus:border-[#E7D7A0] transition-colors"
                  placeholder="ما هو موضوع رسالتك؟"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-[#FFFEEE] font-medium mb-2">
                  الرسالة <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#0A102A]/50 border border-[#E7D7A0]/20 rounded-lg text-[#FFFEEE] placeholder-[#FAFAFAB2]/50 focus:outline-none focus:border-[#E7D7A0] transition-colors resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E7D7A0] hover:bg-[#d4bc7a] text-[#0A102A] font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    إرسال الرسالة
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
