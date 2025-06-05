import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

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
            <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-sazvida-100 text-sazvida-800 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Healthcare Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Intelligent Healthcare Operations, <span className="text-gradient">Simplified</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
              One unified platform with AI-driven insights for license management, quality assurance, 
              and medical education. Reduce administrative burden by up to 40%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-sazvida-600 hover:bg-sazvida-700 button-transition">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-sazvida-600 text-sazvida-600 hover:bg-sazvida-50 button-transition">
                Watch Video
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-8">
              <div className="flex -space-x-4">
                <img 
                  src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&w=32&h=32" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="User avatar"
                />
                <img 
                  src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&w=32&h=32" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="User avatar"
                />
                <img 
                  src="https://images.pexels.com/photos/5452190/pexels-photo-5452190.jpeg?auto=compress&w=32&h=32" 
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="User avatar"
                />
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">500+ healthcare institutions</span> trust Sazvida
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=format&fit=crop&q=80&w=2000" 
                  alt="AI-powered healthcare dashboard" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time Saved</p>
                    <p className="text-lg font-bold">40% Reduction</p>
                  </div>
                </div>
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