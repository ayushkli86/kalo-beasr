'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Leaf, Phone, Heart, Activity, Brain, Wind, Utensils, Droplet, Bone, Baby, MessageCircle, CheckCircle, Sprout, Tractor, Camera, ShoppingCart, X } from 'lucide-react'

// Pre-defined floating leaves data to avoid hydration mismatch
const floatingLeaves = [
  { left: '5%', top: '10%', size: 'w-8 h-8', delay: '0s' },
  { left: '15%', top: '70%', size: 'w-6 h-6', delay: '0.5s' },
  { left: '25%', top: '30%', size: 'w-10 h-10', delay: '1s' },
  { left: '45%', top: '50%', size: 'w-7 h-7', delay: '1.5s' },
  { left: '65%', top: '20%', size: 'w-9 h-9', delay: '2s' },
  { left: '75%', top: '80%', size: 'w-6 h-6', delay: '2.5s' },
  { left: '85%', top: '40%', size: 'w-8 h-8', delay: '3s' },
  { left: '95%', top: '60%', size: 'w-7 h-7', delay: '3.5s' }
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  })
  const [showToast, setShowToast] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Scroll animation observer
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el))
    }
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.phone) {
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        // Open WhatsApp with pre-filled order details
        const message = `नमस्ते, म कालो बेसार किन्न चाहन्छु।

नाम: ${formData.name}
फोन: ${formData.phone}
ठेगाना: ${formData.address || 'दिइएको छैन'}

कृपया मलाई जानकारी दिनुहोला।`
        
        const whatsappUrl = `https://wa.me/9779842381553?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
        setFormData({ name: '', phone: '', address: '' })
      }, 3000)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openWhatsApp = (message: string) => {
    const whatsappUrl = `https://wa.me/9779842381553?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const benefits = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'प्रतिरोधक क्षमता',
      subtitle: 'Boosts immunity',
      description: 'कालो बेसारमा उच्च मात्रामा एन्टिअक्सिडेन्ट हुन्छ जसले शरीरको प्रतिरक्षा प्रणालीलाई मजबुत बनाउँछ।'
    },
    {
      icon: <Bone className="w-10 h-10" />,
      title: 'जोर्नी दुखाइ निवारण',
      subtitle: 'Relieves joint pain',
      description: 'गठिया र जोर्नीको दुखाइ कम गर्न कालो बेसारको सेवन धेरै प्रभावकारी मानिन्छ।'
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: 'मस्तिष्क सक्रियता',
      subtitle: 'Brain health',
      description: 'यसले मस्तिष्कको कार्यक्षमता बढाउँछ र स्मरण शक्ति सुधार गर्न मद्दत गर्दछ।'
    },
    {
      icon: <Wind className="w-10 h-10" />,
      title: 'श्वासप्रश्वास सुधार',
      subtitle: 'Respiratory health',
      description: 'अस्थमा र अन्य श्वास प्रणाली सम्बन्धी समस्याहरूलाई कम गर्न मद्दत गर्दछ।'
    },
    {
      icon: <Utensils className="w-10 h-10" />,
      title: 'पाचन शक्ति',
      subtitle: 'Digestion',
      description: 'पाचन प्रणालीलाई मजबुत बनाउँछ र पेटका समस्याहरूबाट राहत दिन्छ।'
    },
    {
      icon: <Droplet className="w-10 h-10" />,
      title: 'छाला स्वास्थ्य',
      subtitle: 'Skin health',
      description: 'छालाको रोगहरू निको पार्न र छालालाई चम्किलो बनाउन मद्दत गर्दछ।'
    }
  ]

  const diseases = [
    { icon: <Heart className="w-8 h-8" />, title: 'उच्च रक्तचाप', subtitle: 'High Blood Pressure' },
    { icon: <Droplet className="w-8 h-8" />, title: 'मधुमेह', subtitle: 'Diabetes Type 2' },
    { icon: <Bone className="w-8 h-8" />, title: 'गठिया', subtitle: 'Rheumatism/Arthritis' },
    { icon: <Brain className="w-8 h-8" />, title: 'माइग्रेन', subtitle: 'Migraine' },
    { icon: <Utensils className="w-8 h-8" />, title: 'पाचन समस्या', subtitle: 'Digestive Issues' },
    { icon: <Wind className="w-8 h-8" />, title: 'अस्थमा', subtitle: 'Asthma' },
    { icon: <Baby className="w-8 h-8" />, title: 'मिर्गौला समस्या', subtitle: 'Kidney issues' },
    { icon: <Activity className="w-8 h-8" />, title: 'एलर्जी', subtitle: 'Allergies' }
  ]

  const galleryImages = [
    { src: '/images/one1.png', caption: 'कालो बेसारको प्राकृतिक स्वरूप' },
    { src: '/images/besar1.jpeg', caption: 'उत्तम गुणस्तरको कालो बेसार' },
    { src: '/images/one2.png', caption: 'ताजा कालो बेसारको फसल' },
    { src: '/images/gallery-powder.png', caption: 'कालो बेसार पाउडर' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fef7e8] via-[#fff3e0] to-[#fef7e8]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#fef7e8]/95 backdrop-blur-sm border-b border-[#b87c4f]/20 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="w-8 h-8 text-[#b87c4f]" />
              <span className="font-bold text-xl text-[#2c221b]">कालो बेसार</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('faida')} className="text-[#2c221b] hover:text-[#b87c4f] font-medium transition-colors">फाइदा</button>
              <button onClick={() => scrollToSection('diseases')} className="text-[#2c221b] hover:text-[#b87c4f] font-medium transition-colors">रोग निको</button>
              <button onClick={() => scrollToSection('buy')} className="text-[#2c221b] hover:text-[#b87c4f] font-medium transition-colors">किन्नुहोस्</button>
              <button onClick={() => scrollToSection('contact')} className="text-[#2c221b] hover:text-[#b87c4f] font-medium transition-colors">सम्पर्क</button>
            </div>
            <Button 
              onClick={() => scrollToSection('buy')}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-full font-semibold transition-all hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              किन्नुहोस्
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 px-4">
          {/* Floating Leaves Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingLeaves.map((leaf, i) => (
              <Leaf
                key={i}
                className={`absolute text-[#b87c4f]/10 ${leaf.size}`}
                style={{
                  left: leaf.left,
                  top: leaf.top,
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: leaf.delay
                }}
              />
            ))}
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            {/* Farm Badge */}
            <div className="flex justify-center mb-8">
              <Card className="bg-[#2c5e2a] text-white border-0 rounded-full px-6 py-2 inline-flex items-center gap-2">
                <Tractor className="w-5 h-5 text-[#e6a157]" />
                <span className="text-sm font-semibold">Namuna Krishi Farm - प्रमाणित अर्गानिक कृषि</span>
              </Card>
            </div>

            {/* Main Title */}
            <div className="text-center mb-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#b87c4f] via-[#2c221b] to-[#e6a157] bg-clip-text text-transparent leading-tight">
                कालो बेसार
              </h1>
              <p className="text-xl md:text-2xl text-[#5a4a3a] italic font-medium flex items-center justify-center gap-2">
                <Sprout className="w-6 h-6 text-[#e6a157]" />
                Kalo Besar - Traditional Healing & Agricultural Wellness
              </p>
            </div>

            {/* Hero Image */}
            <div className="mb-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              <Card className="overflow-hidden border-0 shadow-2xl">
                <img
                  src="/images/hero.png"
                  alt="Kalo Besar - Black Turmeric"
                  className="w-full h-[400px] md:h-[450px] object-cover"
                />
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
              <Button
                onClick={() => scrollToSection('faida')}
                className="bg-[#b87c4f] hover:bg-[#a66b42] text-white px-8 py-6 text-lg rounded-full font-semibold transition-all hover:scale-105 shadow-lg"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                फाइदा हेर्नुहोस्
              </Button>
              <Button
                onClick={() => scrollToSection('buy')}
                className="bg-[#e6a157] hover:bg-[#d48f47] text-white px-8 py-6 text-lg rounded-full font-semibold transition-all hover:scale-105 shadow-lg animate-pulse-slow"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                किन्न यहाँ थिच्नुहोस्
              </Button>
              <Button
                onClick={() => openWhatsApp('नमस्ते, म कालो बेसारबारे जान्न चाहन्छु।')}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-6 text-lg rounded-full font-semibold transition-all hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp मा सम्पर्क गर्नुहोस्
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 px-4 bg-[#fff7ef]">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2c221b] mb-2 flex items-center gap-3">
                <Camera className="w-8 h-8 text-[#b87c4f]" />
                कालो बेसार HD तस्बिरहरू
              </h2>
              <p className="text-[#5a4a3a] text-lg">Kalo Besar Gallery - गुणस्तरको झलक</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.map((image, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll opacity-0 translate-y-10"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden h-[260px]">
                    <img
                      src={image.src}
                      alt={image.caption}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4 bg-[#fff7ef] text-center">
                    <p className="font-semibold text-[#2c221b]">{image.caption}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits (Faida) Section */}
        <section id="faida" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2c221b] mb-2 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-[#e6a157]" />
                फाइदा – कालो बेसारका अद्भुत लाभ
              </h2>
              <p className="text-[#5a4a3a] text-lg">Benefits - Why Choose Kalo Besar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-on-scroll opacity-0 translate-y-10"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-[#e6a157] mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-[#2c221b] mb-1">{benefit.title}</h3>
                  <p className="text-sm text-[#b87c4f] font-medium mb-3">{benefit.subtitle}</p>
                  <p className="text-[#5a4a3a] leading-relaxed">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Diseases It Cures Section */}
        <section id="diseases" className="py-16 px-4 bg-[#fff7ef]">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2c221b] mb-2 flex items-center gap-3">
                <Heart className="w-8 h-8 text-[#c0392b]" />
                कुन कुन रोग निको पार्छ ?
              </h2>
              <p className="text-[#5a4a3a] text-lg">Diseases it Cures - Natural Healing Properties</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {diseases.map((disease, index) => (
                <Card
                  key={index}
                  className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-on-scroll opacity-0 translate-y-10 hover:animate-pulse"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="text-[#c0392b] mb-3 flex justify-center">{disease.icon}</div>
                  <h3 className="text-lg font-bold text-[#2c221b] text-center mb-1">{disease.title}</h3>
                  <p className="text-xs text-[#5a4a3a] text-center">{disease.subtitle}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Buy Section */}
        <section id="buy" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2c221b] mb-2 flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-[#b87c4f]" />
                कालो बेसार किन्नको लागि यहाँ थिच्नुहोस्
              </h2>
              <p className="text-[#5a4a3a] text-lg">Namuna Krishi Farm बाट प्रमाणित अर्गानिक कालो बेसार</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* WhatsApp Direct */}
              <Card className="p-8 border-0 shadow-xl bg-[#fff7ef] rounded-[48px] animate-on-scroll opacity-0 translate-y-10">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#25D366]/10 rounded-full mb-6">
                    <MessageCircle className="w-12 h-12 text-[#25D366]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2c221b] mb-2">WhatsApp मा सम्पर्क गर्नुहोस्</h3>
                  <p className="text-[#5a4a3a] mb-6">तुरुन्तै सम्पर्क गर्नुहोस्</p>

                  <div className="bg-white/60 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-[#b87c4f]" />
                      <span className="font-semibold text-[#2c221b]">सम्पर्क व्यक्ति:</span>
                    </div>
                    <p className="text-lg font-bold text-[#b87c4f] mb-4">Namuna Krishi Farm (किसान समूह)</p>
                    <p className="text-xl font-bold text-[#2c221b] mb-2">+977 9842381553</p>
                    <div className="flex flex-col gap-2 mt-4 text-sm text-[#5a4a3a]">
                      <p className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#25D366]" />
                        डेलिभरी सम्पूर्ण नेपालभर
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#25D366]" />
                        ताजा कालो बेसारको ग्यारेन्टी
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => openWhatsApp('नमस्ते, म कालो बेसार किन्न चाहन्छु। कृपया जानकारी दिनुहोला।')}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp मा सम्पर्क गर्नुहोस्
                  </Button>
                </div>
              </Card>

              {/* Order Form */}
              <Card className="p-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm animate-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: '200ms' }}>
                <h3 className="text-2xl font-bold text-[#2c221b] mb-6 text-center">अर्डर फर्म</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2c221b] mb-2">पुरा नाम *</label>
                    <Input
                      type="text"
                      placeholder="राम बहादुर"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-[#b87c4f]/30 focus:border-[#b87c4f]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c221b] mb-2">WhatsApp नम्बर *</label>
                    <Input
                      type="tel"
                      placeholder="9842381553"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="border-[#b87c4f]/30 focus:border-[#b87c4f]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2c221b] mb-2">ठेगाना</label>
                    <Input
                      type="text"
                      placeholder="काठमाडौं, ललितपुर"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="border-[#b87c4f]/30 focus:border-[#b87c4f]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#b87c4f] hover:bg-[#a66b42] text-white py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 animate-pulse-slow mt-6"
                  >
                    पेश गर्नुहोस् & WhatsApp मा पुष्टि
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 bg-[#fff7ef]">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2c221b] mb-2 flex items-center justify-center gap-3">
                <Phone className="w-8 h-8 text-[#b87c4f]" />
                सम्पर्क गर्नुहोस्
              </h2>
              <p className="text-[#5a4a3a] text-lg">Contact Us - We're Here to Help</p>
            </div>

            <Card className="p-8 border-0 shadow-xl bg-[#fff6ea] rounded-[48px] animate-on-scroll opacity-0 translate-y-10">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-[#b87c4f]/10 rounded-full mb-6">
                  <MessageCircle className="w-14 h-14 text-[#b87c4f]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2c221b] mb-2">Namuna Hatchey</h3>
                <p className="text-[#5a4a3a] mb-4">सम्पर्क व्यक्ति</p>

                <div className="bg-white/60 rounded-2xl p-6 mb-6">
                  <p className="text-2xl font-bold text-[#2c221b] mb-2">+977 9842381553</p>
                  <p className="text-sm text-[#5a4a3a]">समय: 09:00 - 20:00 (NPT)</p>
                </div>

                <Button
                  onClick={() => openWhatsApp('नमस्ते, म तपाईंलाई सम्पर्क गर्न चाहन्छु।')}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2c221b] text-[#ecd9c0] py-12 px-4 mt-auto">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="w-8 h-8 text-[#e6a157]" />
            <span className="text-2xl font-bold">कालो बेसार</span>
          </div>
          <p className="text-lg mb-2">Namuna Krishi Farm प्रस्तुत</p>
          <p className="text-[#ecd9c0]/80 mb-4">सम्पर्क: WhatsApp +977 9842381553</p>
          <p className="text-[#ecd9c0]/60 mb-6">कालो बेसारको प्राकृतिक चिकित्सा</p>
          <div className="border-t border-[#ecd9c0]/20 pt-6">
            <p className="text-sm text-[#ecd9c0]/60">
              © 2025 Kalo Besar | प्रामाणिक कृषि उत्पादन
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[#2c6e2f] text-white px-6 py-4 rounded-full shadow-2xl animate-slide-up z-50 flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold">धन्यवाद! सफलतापूर्वक पेश भयो</span>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <Button
        onClick={() => openWhatsApp('नमस्ते, म कालो बेसारबारे जान्न चाहन्छु।')}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl transition-all hover:scale-110 z-40 p-0 animate-pulse-slow"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-fade-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #fef7e8;
        }

        ::-webkit-scrollbar-thumb {
          background: #b87c4f;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a66b42;
        }
      `}</style>
    </div>
  )
}

// Shield icon for immunity
function Shield({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
