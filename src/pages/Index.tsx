
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import Solutions from '@/components/Solutions';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AnimatedElement from '@/components/AnimatedElement';
import { ArrowUpCircle } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Activate animations for elements initially in viewport
    const animatedElements = document.querySelectorAll('.slide-up, .stagger-animate');
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        element.classList.add('in-view');
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      <main>
        <Hero />
        
        <AnimatedElement>
          <section className="py-20 relative">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-sazvida-100 text-sazvida-800 rounded-full mb-4">
                  Why Choose Sazvida
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Trusted by Healthcare Professionals
                </h2>
                <p className="text-lg text-gray-600 mb-10">
                  Our intuitive software solutions are designed by healthcare experts for healthcare experts. 
                  We understand the unique challenges of the medical industry and provide tailored solutions 
                  that improve efficiency, compliance, and patient care.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatedElement delay={100} className="glass-card p-8 rounded-xl text-center">
                  <div className="rounded-full w-16 h-16 bg-sazvida-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-sazvida-600 text-2xl font-bold">98%</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Compliance Rate</h3>
                  <p className="text-gray-600">Institutions using our solutions maintain a near-perfect compliance record</p>
                </AnimatedElement>
                
                <AnimatedElement delay={200} className="glass-card p-8 rounded-xl text-center">
                  <div className="rounded-full w-16 h-16 bg-sazvida-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-sazvida-600 text-2xl font-bold">40%</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Time Saved</h3>
                  <p className="text-gray-600">Administrative tasks reduced by 40% with our automated workflows</p>
                </AnimatedElement>
                
                <AnimatedElement delay={300} className="glass-card p-8 rounded-xl text-center">
                  <div className="rounded-full w-16 h-16 bg-sazvida-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-sazvida-600 text-2xl font-bold">500+</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Institutions</h3>
                  <p className="text-gray-600">Trusted by over 500 healthcare institutions nationwide</p>
                </AnimatedElement>
              </div>
            </div>
          </section>
        </AnimatedElement>
        
        <Solutions />
        
        <AnimatedElement>
          <section className="py-20 relative bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-sazvida-100 text-sazvida-800 rounded-full mb-4">
                  Testimonials
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Our Clients Say
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatedElement delay={100} className="glass-card p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-sazvida-100 flex items-center justify-center mr-3">
                      <span className="text-sazvida-600 font-bold">JM</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Dr. James Miller</h4>
                      <p className="text-sm text-gray-600">Chief Medical Officer</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "Sazvida's license management system has transformed how we track and maintain our staff credentials. 
                    The automated reminders alone have saved us countless hours of administrative work."
                  </p>
                </AnimatedElement>
                
                <AnimatedElement delay={200} className="glass-card p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-sazvida-100 flex items-center justify-center mr-3">
                      <span className="text-sazvida-600 font-bold">SL</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Sarah Lopez</h4>
                      <p className="text-sm text-gray-600">Quality Assurance Director</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "The quality management suite has been instrumental in our accreditation process. 
                    The detailed reporting and analytics helped us identify improvement areas we hadn't 
                    even considered before."
                  </p>
                </AnimatedElement>
                
                <AnimatedElement delay={300} className="glass-card p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-sazvida-100 flex items-center justify-center mr-3">
                      <span className="text-sazvida-600 font-bold">RW</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Dr. Robert Williams</h4>
                      <p className="text-sm text-gray-600">Medical Education Director</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "Our staff training has improved significantly since implementing Sazvida's teaching platform. 
                    The engaging content and tracking capabilities ensure our team stays up-to-date with all required certifications."
                  </p>
                </AnimatedElement>
              </div>
            </div>
          </section>
        </AnimatedElement>
        
        <CallToAction />
      </main>
      
      <Footer />
      
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-40 hover:bg-gray-50"
        aria-label="Scroll to top"
      >
        <ArrowUpCircle className="h-8 w-8 text-sazvida-600" />
      </button>
    </div>
  );
};

export default Index;
