
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedElement from '@/components/AnimatedElement';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    interest: 'license-management'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will contact you shortly.",
      });
      setFormSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sazvida-200 rounded-full blur-3xl opacity-50 -z-10" />
          
          <div className="container mx-auto px-6">
            <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-sazvida-100 text-sazvida-800 rounded-full mb-4">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-gray-600">
                Have questions about our solutions? Looking for a demo? Our team is here to help. 
                Reach out to us using the form below or through our contact information.
              </p>
            </AnimatedElement>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <AnimatedElement delay={100} className="glass-card p-8 rounded-2xl">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                    <p className="text-gray-700 mb-6">
                      Your message has been successfully sent. We'll get back to you as soon as possible.
                    </p>
                    <Button 
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          message: '',
                          interest: 'license-management'
                        });
                      }}
                      className="bg-sazvida-600 hover:bg-sazvida-700"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sazvida-500 focus:border-sazvida-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sazvida-500 focus:border-sazvida-500 transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sazvida-500 focus:border-sazvida-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company/Organization
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sazvida-500 focus:border-sazvida-500 transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                        I'm interested in *
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        required
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sazvida-500 focus:border-sazvida-500 transition-colors"
                      >
                        <option value="license-management">License Management</option>
                        <option value="quality-management">Quality Management</option>
                        <option value="user-management">User Management</option>
                        <option value="teaching-platform">Medical Teaching Platform</option>
                        <option value="analytics">Analytics Dashboard</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sazvida-500 focus:border-sazvida-500 transition-colors"
                      ></textarea>
                    </div>
                    
                    <Button type="submit" className="w-full bg-sazvida-600 hover:bg-sazvida-700 py-3">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </AnimatedElement>
              
              <AnimatedElement delay={200}>
                <div className="glass-card p-8 rounded-2xl mb-8">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-sazvida-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-sazvida-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                        <p className="text-gray-700">
                          123 Healthcare Avenue<br />
                          Medical District<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-sazvida-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="h-5 w-5 text-sazvida-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                        <p className="text-gray-700">
                          Main: <a href="tel:+1234567890" className="hover:text-sazvida-600 transition-colors">+1 (234) 567-890</a><br />
                          Support: <a href="tel:+1234567899" className="hover:text-sazvida-600 transition-colors">+1 (234) 567-899</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-sazvida-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="h-5 w-5 text-sazvida-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                        <p className="text-gray-700">
                          General Inquiries: <a href="mailto:info@sazvida.com" className="hover:text-sazvida-600 transition-colors">info@sazvida.com</a><br />
                          Support: <a href="mailto:support@sazvida.com" className="hover:text-sazvida-600 transition-colors">support@sazvida.com</a><br />
                          Sales: <a href="mailto:sales@sazvida.com" className="hover:text-sazvida-600 transition-colors">sales@sazvida.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
                  
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="font-medium">Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM EST</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span>Closed</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Technical Support Hours</h3>
                    <p className="text-gray-700">
                      24/7 emergency support for critical issues.<br />
                      Regular support available during business hours.
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            </div>
            
            <AnimatedElement className="mt-16">
              <div className="glass-card p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Our Location</h2>
                <div className="rounded-xl overflow-hidden h-96 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11442.66238704037!2d-74.00673427327304!3d40.71454977258506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Manhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1689941325037!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Sazvida Solutions Location"
                  />
                </div>
              </div>
            </AnimatedElement>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
