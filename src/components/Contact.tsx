'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-artist-black via-artist-black/95 to-artist-black"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-white">
              <span className="text-artist-accent">Contactez</span>-moi
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Pour toute demande d'information, collaboration ou acquisition d'œuvre, 
              n'hésitez pas à me contacter via le formulaire ci-dessous.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/20"
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-artist-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-artist-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold mb-2 text-white">Message envoyé !</h3>
                <p className="text-white/80">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-artist-accent/50"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-artist-accent/50"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-artist-accent/50"
                  >
                    <option value="" className="bg-artist-black">Sélectionnez un sujet</option>
                    <option value="acquisition" className="bg-artist-black">Acquisition d'œuvre</option>
                    <option value="exposition" className="bg-artist-black">Proposition d'exposition</option>
                    <option value="collaboration" className="bg-artist-black">Collaboration</option>
                    <option value="presse" className="bg-artist-black">Demande presse</option>
                    <option value="autre" className="bg-artist-black">Autre demande</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-artist-accent/50"
                    placeholder="Votre message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-md text-white font-medium transition-colors duration-300 ${
                    isSubmitting ? 'bg-artist-gray/50 cursor-not-allowed' : 'bg-artist-accent hover:bg-artist-accent/80'
                  }`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 