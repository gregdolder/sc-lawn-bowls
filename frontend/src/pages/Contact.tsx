import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormStatus({ status: 'submitting', message: 'Sending your message...' });
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle form submission logic here
      console.log('Form submitted:', formData);
      
      // Success state
      setFormStatus({ 
        status: 'success', 
        message: 'Thank you! Your message has been sent successfully. We will get back to you soon.' 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({ 
        status: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again later.' 
      });
    }
  };

  const contactDetails = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Club Location",
      content: "San Lorenzo Park, 137 Dakota Ave, Santa Cruz, CA 95060",
      link: "https://maps.google.com/?q=137+Dakota+Ave,+Santa+Cruz,+CA+95060"
    },
    {
      icon: "fas fa-phone",
      title: "Phone",
      content: "(831) 423-5424",
      link: "tel:+18314235424"
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      content: "membership@santacruzlawnbowls.org",
      link: "mailto:membership@santacruzlawnbowls.org"
    },
    {
      icon: "fas fa-clock",
      title: "Club Hours",
      content: "Tuesday, Thursday, Saturday, Sunday: 12:30 PM - 3:30 PM",
    },
    {
      icon: "fas fa-users",
      title: "Social Media",
      content: "Follow us on Facebook & Instagram",
      social: [
        { icon: "fab fa-facebook", link: "https://facebook.com/santacruzlawnbowls" },
        { icon: "fab fa-instagram", link: "https://instagram.com/santacruzlawnbowls" }
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-cover bg-center" style={{ backgroundImage: "url('/images/aeriel-green.jpg')" }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Have questions or want to visit? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Details Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary bg-opacity-10 rounded-full p-3 w-12 h-12 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                      <i className={item.icon}></i>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          target={item.link.startsWith('http') ? "_blank" : undefined} 
                          rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="text-gray-600 hover:text-primary transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.content}</p>
                      )}
                      
                      {item.social && (
                        <div className="flex space-x-4 mt-2">
                          {item.social.map((social, idx) => (
                            <a 
                              key={idx}
                              href={social.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:text-accent transition-colors text-xl"
                            >
                              <i className={social.icon}></i>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Club Location</h3>
                <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.412340528971!2d-122.02742192302393!3d36.974529855582295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e402c8736e36f%3A0x8f607fe4af668c20!2sSanta%20Cruz%20Lawn%20Bowls%20Club!5e0!3m2!1sen!2sus!4v1712536731258!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-8">Send Us a Message</h2>
              
              <div className="bg-background-light p-8 rounded-lg shadow-md">
                {formStatus.status === 'success' ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                    <p>{formStatus.message}</p>
                    <button
                      onClick={() => setFormStatus({ status: 'idle', message: '' })}
                      className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone (Optional)</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="Membership Inquiry">Membership Inquiry</option>
                        <option value="Visit Request">Visit Request</option>
                        <option value="Event Information">Event Information</option>
                        <option value="Equipment Question">Equipment Question</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        rows={6}
                        required
                      />
                    </div>
                    
                    {formStatus.status === 'error' && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                        {formStatus.message}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={formStatus.status === 'submitting'}
                      className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors ${
                        formStatus.status === 'submitting' 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-primary hover:bg-primary-dark'
                      }`}
                    >
                      {formStatus.status === 'submitting' ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 md:py-20 bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Visit Us</h2>
              <p className="text-lg max-w-3xl mx-auto">
                We welcome visitors who are interested in learning more about lawn bowling.
                Drop by during our open hours or schedule a personalized introduction.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-6">
                <div className="text-primary text-4xl mb-4 flex justify-center">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Open Hours</h3>
                <p className="text-gray-600 text-center">
                  Visit during our regular club hours:<br />
                  <strong>Tuesday, Thursday, Saturday, Sunday</strong><br />
                  12:30 PM - 3:30 PM
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-6">
                <div className="text-primary text-4xl mb-4 flex justify-center">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Group Visits</h3>
                <p className="text-gray-600 text-center">
                  We can accommodate group visits with advance notice. 
                  Contact us to schedule your group's introduction to lawn bowling.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-6">
                <div className="text-primary text-4xl mb-4 flex justify-center">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Free Lessons</h3>
                <p className="text-gray-600 text-center">
                  We offer free introductory lessons to newcomers. 
                  All equipment is provided - just wear flat-soled shoes.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/join" className="btn btn-primary">
              Join Our Club
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 