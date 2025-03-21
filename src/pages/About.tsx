
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedElement from '@/components/AnimatedElement';
import { Users, Lightbulb, Heart, Zap, Globe, Shield } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sazvida-100 rounded-full blur-3xl opacity-60 -z-10" />
          
          <div className="container mx-auto px-6">
            <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-sazvida-100 text-sazvida-800 rounded-full mb-4">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Transforming Healthcare Through Technology
              </h1>
              <p className="text-lg text-gray-600">
                At Sazvida Solutions, we're passionate about improving healthcare delivery through 
                innovative software solutions. Our team combines deep healthcare expertise with 
                cutting-edge technology to solve complex industry challenges.
              </p>
            </AnimatedElement>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <AnimatedElement delay={100}>
                <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
                    alt="Sazvida team collaborating" 
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </AnimatedElement>
              
              <AnimatedElement delay={200} className="space-y-6">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-gray-700">
                  Founded in 2015 by a team of healthcare professionals and software engineers, 
                  Sazvida Solutions was born from a simple observation: healthcare institutions 
                  were struggling with outdated software that wasn't designed for their specific needs.
                </p>
                <p className="text-gray-700">
                  Our founders set out to create intuitive, specialized solutions that address the 
                  unique challenges of the healthcare industry. Since then, we've grown to serve 
                  over 500 healthcare institutions nationwide, from small private practices to 
                  large hospital networks.
                </p>
                <p className="text-gray-700">
                  Today, we remain committed to our founding mission: empowering healthcare professionals 
                  with tools that reduce administrative burden, enhance compliance, and ultimately 
                  improve patient care.
                </p>
              </AnimatedElement>
            </div>
            
            <AnimatedElement>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                <p className="text-gray-700">
                  These core principles guide our work and relationships with clients, partners, and each other.
                </p>
              </div>
            </AnimatedElement>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatedElement delay={100} className="glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-sazvida-100 flex items-center justify-center mb-4 text-sazvida-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Client-Centered</h3>
                <p className="text-gray-600">
                  We design our solutions based on deep understanding of our clients' needs, 
                  workflows, and challenges. Your success is our success.
                </p>
              </AnimatedElement>
              
              <AnimatedElement delay={200} className="glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-sazvida-100 flex items-center justify-center mb-4 text-sazvida-600">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously explore new technologies and approaches to solve healthcare's 
                  most pressing challenges with creative, effective solutions.
                </p>
              </AnimatedElement>
              
              <AnimatedElement delay={300} className="glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-sazvida-100 flex items-center justify-center mb-4 text-sazvida-600">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Compassion</h3>
                <p className="text-gray-600">
                  We recognize that behind every healthcare workflow is a human being. Our solutions 
                  aim to reduce stress and improve experiences for all.
                </p>
              </AnimatedElement>
              
              <AnimatedElement delay={400} className="glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-sazvida-100 flex items-center justify-center mb-4 text-sazvida-600">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We hold ourselves to the highest standards in everything we do, from code quality 
                  to client service, ensuring our products exceed expectations.
                </p>
              </AnimatedElement>
              
              <AnimatedElement delay={500} className="glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-sazvida-100 flex items-center justify-center mb-4 text-sazvida-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We operate with transparency, honesty, and ethical behavior in all our interactions, 
                  building trust with clients and within our team.
                </p>
              </AnimatedElement>
              
              <AnimatedElement delay={600} className="glass-card p-6 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-sazvida-100 flex items-center justify-center mb-4 text-sazvida-600">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Security</h3>
                <p className="text-gray-600">
                  We prioritize the security and privacy of sensitive healthcare data, implementing 
                  robust protections that exceed industry standards.
                </p>
              </AnimatedElement>
            </div>
            
            <AnimatedElement className="mt-20">
              <div className="glass-card p-8 md:p-12 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
                    <p className="text-gray-700 mb-6">
                      We're always looking for talented individuals who are passionate about 
                      healthcare technology to join our growing team. Whether you're a developer, 
                      designer, healthcare expert, or customer success specialist, we'd love to hear from you.
                    </p>
                    <a 
                      href="#" 
                      className="inline-block px-6 py-3 bg-sazvida-600 text-white rounded-lg hover:bg-sazvida-700 transition-colors"
                    >
                      View Open Positions
                    </a>
                  </div>
                  
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600" 
                      alt="Sazvida team at work" 
                      className="rounded-xl shadow-lg"
                      loading="lazy"
                    />
                  </div>
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

export default About;
