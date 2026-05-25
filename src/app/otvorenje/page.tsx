'use client';

import { useState } from 'react';
import { PageHero } from '@/components/sections/PageHero';
import { Section, SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

const scheduleItems = [
  { time: '16:00', title: 'Početak događanja', description: 'Dobrodošlica i uvodne riječi' },
  { time: '16:30', title: 'Mini Turnir', description: 'Natjecanje parova - prijava individualna' },
  { time: '18:00', title: 'Winner Stays On', description: 'Pobjednik ostaje na terenu' },
  { time: '19:00', title: 'Dodatni izazovi', description: 'Više informacija uskoro...' },
];

const contactInfo = {
  address: 'Put Stombrata 18, 21220 Trogir, Croatia',
  phone: '+385912828803',
  email: 'info@adriaticpadelklub.hr',
};

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/adriaticpadelclub' },
  { name: 'Instagram', url: 'https://instagram.com/adriaticpadelclub' },
  { name: 'YouTube', url: 'https://youtube.com/@adriaticpadelclub' },
];

export default function OtvorenjePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experienceLevel: '',
    age: '',
    padelExperience: '',
    shirtSize: '',
    dietaryRestrictions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch('/api/otvorenje-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        experienceLevel: '',
        age: '',
        padelExperience: '',
        shirtSize: '',
        dietaryRestrictions: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title="Veliko Otvorenje"
        subtitle="5. lipnja 2026. | 16:00"
        backgroundImage="/images/hero-court.jpg"
      />

      {/* Event Overview Section */}
      <Section theme="light" padding="lg">
        <SectionHeading
          tagline="Dobrodošli"
          title="Slavimo zajedno"
          subtitle="Pridružite nam se na velikom otvorenju Adriatic Padel Kluba! Dan pun zabave, natjecanja i druženja."
          theme="light"
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card variant="default" className="text-center">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-lime/20 flex items-center justify-center mx-auto mb-2">
                <svg className="w-7 h-7 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <CardTitle>Datum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal/70">5. lipnja 2026.</p>
              <p className="text-sm text-teal/50">Petak</p>
            </CardContent>
          </Card>

          <Card variant="default" className="text-center">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-lime/20 flex items-center justify-center mx-auto mb-2">
                <svg className="w-7 h-7 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle>Vrijeme</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal/70">16:00</p>
              <p className="text-sm text-teal/50">Poslijepodne</p>
            </CardContent>
          </Card>

          <Card variant="default" className="text-center">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-lime/20 flex items-center justify-center mx-auto mb-2">
                <svg className="w-7 h-7 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <CardTitle>Lokacija</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal/70">Adriatic Padel Klub</p>
              <p className="text-sm text-teal/50">Trogir</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Schedule Section */}
      <Section theme="dark" padding="lg">
        <SectionHeading
          tagline="Program"
          title="Raspored događanja"
          subtitle="Pripremili smo uzbudljiv program za sve ljubitelje padela."
          theme="dark"
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-lime/30 hidden md:block" />

            <div className="space-y-6">
              {scheduleItems.map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  {/* Time bubble */}
                  <div className="hidden md:flex flex-shrink-0 w-14 h-14 rounded-full bg-lime text-teal font-heading font-bold text-sm items-center justify-center z-10">
                    {item.time}
                  </div>

                  <Card variant="dark" className="flex-1 bg-white/5 border border-white/10">
                    <CardHeader className="mb-2">
                      <span className="text-lime text-sm font-semibold md:hidden">{item.time}</span>
                      <CardTitle className="text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Mini Turnir Section */}
      <Section theme="light" padding="lg">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeading
              tagline="Natjecanje"
              title="Mini Turnir"
              subtitle="Prijavi se za naš turnir otvorenja i osvoji nagrade!"
              theme="light"
              align="left"
            />

            <div className="space-y-4 text-teal/80">
              <p>
                Turnir je otvoren za sve razine - od početnika do naprednih igrača.
                Format je prilagođen da svatko ima priliku za igru i zabavu.
              </p>
              <div className="bg-lime/20 border border-lime rounded-xl p-4">
                <p className="font-semibold text-teal">
                  Prijava je individualna. Parovi će biti formirani na dan događanja.
                </p>
              </div>
              <p>
                Parovi se formiraju prema razini iskustva kako bi natjecanje bilo ujednačeno i zanimljivo za sve.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold text-teal mb-6">
              Prijava za Mini Turnir
            </h3>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-lime/20 border border-lime rounded-xl text-teal">
                <p className="font-semibold">Hvala na prijavi!</p>
                <p className="text-sm">Vidimo se 5. lipnja!</p>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-xl text-red-700">
                <p className="font-semibold">Greška pri slanju</p>
                <p className="text-sm">Molimo pokušajte ponovno ili nas kontaktirajte direktno.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-teal mb-2">
                    Ime i prezime *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal placeholder:text-teal/40 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                    placeholder="Vaše ime"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-teal mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal placeholder:text-teal/40 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                    placeholder="vas@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-teal mb-2">
                    Broj telefona *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal placeholder:text-teal/40 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                    placeholder="+385 99 123 4567"
                  />
                </div>
                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-teal mb-2">
                    Razina iskustva *
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    required
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                  >
                    <option value="">Odaberite razinu</option>
                    <option value="beginner">Početnik</option>
                    <option value="intermediate">Srednji</option>
                    <option value="advanced">Napredni</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-teal mb-2">
                    Dob
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min={16}
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal placeholder:text-teal/40 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                    placeholder="Vaša dob"
                  />
                </div>
                <div>
                  <label htmlFor="padelExperience" className="block text-sm font-medium text-teal mb-2">
                    Padel iskustvo
                  </label>
                  <select
                    id="padelExperience"
                    name="padelExperience"
                    value={formData.padelExperience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                  >
                    <option value="">Odaberite</option>
                    <option value="less-6-months">&lt;6 mjeseci</option>
                    <option value="6-12-months">6-12 mjeseci</option>
                    <option value="1-2-years">1-2 godine</option>
                    <option value="2-plus-years">2+ godine</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="shirtSize" className="block text-sm font-medium text-teal mb-2">
                  Veličina majice *
                </label>
                <select
                  id="shirtSize"
                  name="shirtSize"
                  required
                  value={formData.shirtSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                >
                  <option value="">Odaberite veličinu</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-teal mb-2">
                  Prehrambena ograničenja
                </label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  rows={3}
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal placeholder:text-teal/40 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all resize-none"
                  placeholder="Alergije, vegetarijanska prehrana, itd."
                />
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Šaljem prijavu...' : 'Prijavi se'}
              </Button>
            </form>
          </div>
        </div>
      </Section>

      {/* Other Activities Section */}
      <Section theme="white" padding="lg">
        <SectionHeading
          tagline="Dodatne aktivnosti"
          title="Još zabave"
          subtitle="Osim Mini Turnira, pripremili smo i dodatne aktivnosti za sve sudionike."
          theme="light"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card variant="outlined">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <CardTitle>Winner Stays On</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal/70">
                Klasični format - pobjednički par ostaje na terenu i brani titulu
                protiv novih izazivača. Koliko dugo možete ostati na vrhu?
              </p>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle>Više izazova uskoro...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal/70">
                Pripremamo dodatne izazove i natjecanja. Pratite nas na društvenim
                mrežama za najnovije informacije!
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section theme="dark" padding="lg">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Vidimo se 5. lipnja!
          </h2>
          <p className="text-white/70 text-lg">
            Za sva pitanja slobodno nas kontaktirajte.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="group">
              <div className="w-12 h-12 rounded-xl bg-lime/20 group-hover:bg-lime flex items-center justify-center mx-auto mb-3 transition-colors">
                <svg className="w-6 h-6 text-lime group-hover:text-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-white/70 text-sm group-hover:text-lime transition-colors">{contactInfo.phone}</p>
            </a>

            <a href={`mailto:${contactInfo.email}`} className="group">
              <div className="w-12 h-12 rounded-xl bg-lime/20 group-hover:bg-lime flex items-center justify-center mx-auto mb-3 transition-colors">
                <svg className="w-6 h-6 text-lime group-hover:text-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white/70 text-sm group-hover:text-lime transition-colors break-all">{contactInfo.email}</p>
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-12 h-12 rounded-xl bg-lime/20 group-hover:bg-lime flex items-center justify-center mx-auto mb-3 transition-colors">
                <svg className="w-6 h-6 text-lime group-hover:text-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-white/70 text-sm group-hover:text-lime transition-colors">Trogir</p>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-white/70 text-sm mb-4">Pratite nas</p>
            <div className="flex gap-3 justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-lime hover:text-teal transition-all"
                  aria-label={social.name}
                >
                  {social.name === 'Facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {social.name === 'Instagram' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  )}
                  {social.name === 'YouTube' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
