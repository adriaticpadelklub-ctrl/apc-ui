'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/sections/PageHero';

const contactInfo = {
  address: 'Put Stombrata 18, 21220 Trogir, Croatia',
  phone: '+385912828803',
  email: 'info@adriaticpadelklub.hr',
  workingHours: {
    weekdays: '08:00 - 24:00',
    saturday: '08:00 - 24:00',
    sunday: '08:00 - 24:00',
  },
};

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/adriaticpadelclub' },
  { name: 'Instagram', url: 'https://instagram.com/adriaticpadelclub' },
  { name: 'YouTube', url: 'https://youtube.com/@adriaticpadelclub' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      <PageHero
        title="Kontakt"
        subtitle="Imate pitanja? Slobodno nas kontaktirajte. Tu smo za vas."
        backgroundImage="/images/hero-player.jpg"
      />

      {/* Contact Section */}
      <section className="py-24 bg-beige">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-teal mb-6">
                Pošaljite upit
              </h2>
              <p className="text-teal/70 mb-8">
                Ispunite formu i javit ćemo vam se u najkraćem mogućem roku.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-lime/20 border border-lime rounded-xl text-teal">
                  <p className="font-semibold">Hvala na poruci!</p>
                  <p className="text-sm">Javit ćemo vam se uskoro.</p>
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
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal placeholder:text-teal/40 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                      placeholder="+385 99 123 4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-teal mb-2">
                      Tema *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all"
                    >
                      <option value="">Odaberite temu</option>
                      <option value="membership">Članstvo</option>
                      <option value="training">Treninzi i akademija</option>
                      <option value="booking">Rezervacije</option>
                      <option value="tournament">Turniri</option>
                      <option value="corporate">Korporativni eventi</option>
                      <option value="other">Ostalo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-teal mb-2">
                    Poruka *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-teal/20 rounded-xl text-teal placeholder:text-teal/40 focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/20 transition-all resize-none"
                    placeholder="Kako vam možemo pomoći?"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Šaljem...' : 'Pošalji poruku'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-teal rounded-2xl p-8 text-white mb-8">
                <h3 className="font-heading text-2xl font-bold mb-6">Kontakt informacije</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lime/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Adresa</h4>
                      <p className="text-white/70">{contactInfo.address}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime text-sm hover:underline mt-1 inline-block"
                      >
                        Otvori u Google Maps
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lime/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Telefon</h4>
                      <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-white/70 hover:text-lime transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lime/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a href={`mailto:${contactInfo.email}`} className="text-white/70 hover:text-lime transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-lime/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Radno vrijeme</h4>
                      <div className="text-white/70 text-sm space-y-1">
                        <p>Pon - Pet: {contactInfo.workingHours.weekdays}</p>
                        <p>Subota: {contactInfo.workingHours.saturday}</p>
                        <p>Nedjelja: {contactInfo.workingHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="font-semibold mb-4">Pratite nas</h4>
                  <div className="flex gap-3">
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

              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23117.85!2d16.2511!3d43.5165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355e6b26b0d9f3%3A0x3c5d0e3e3e3e3e3e!2sTrogir%2C%20Croatia!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokacija Adriatic Padel Club"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-24 bg-teal">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Brze akcije
            </h2>
            <p className="text-white/70">
              Odaberite što vas zanima i odmah vas usmjeravamo na pravo mjesto.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="https://playtomic.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-lime hover:text-teal transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-lime/20 group-hover:bg-teal/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                <svg className="w-8 h-8 text-lime group-hover:text-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-teal mb-2 transition-colors">
                Rezerviraj teren
              </h3>
              <p className="text-white/70 group-hover:text-teal/70 text-sm transition-colors">
                Pregledaj dostupne termine
              </p>
            </a>

            <a
              href="/"
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-lime hover:text-teal transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-lime/20 group-hover:bg-teal/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                <svg className="w-8 h-8 text-lime group-hover:text-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-teal mb-2 transition-colors">
                Prijavi se na trening
              </h3>
              <p className="text-white/70 group-hover:text-teal/70 text-sm transition-colors">
                Pogledaj programe treninga
              </p>
            </a>

            <a
              href="/o-nama"
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-lime hover:text-teal transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-lime/20 group-hover:bg-teal/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                <svg className="w-8 h-8 text-lime group-hover:text-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-teal mb-2 transition-colors">
                Saznaj više
              </h3>
              <p className="text-white/70 group-hover:text-teal/70 text-sm transition-colors">
                O nama i našem klubu
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
