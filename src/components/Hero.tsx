
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sazvida-100 rounded-full blur-3xl opacity-60 -z-10" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sazvida-200 rounded-full blur-3xl opacity-50 -z-10" />
      
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={heroRef} className="stagger-animate">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-sazvida-100 text-sazvida-800 rounded-full mb-6">
              Healthcare Software Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Advanced Software for <span className="text-gradient">Modern Healthcare</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
              Empowering healthcare professionals with intuitive software solutions for license management, quality assurance, user management, and medical education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-sazvida-600 hover:bg-sazvida-700 button-transition">
                Explore Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-sazvida-600 text-sazvida-600 hover:bg-sazvida-50 button-transition">
                Book a Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
                  alt="Healthcare professionals using Sazvida software" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-sazvida-300/20 rounded-full blur-3xl -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
