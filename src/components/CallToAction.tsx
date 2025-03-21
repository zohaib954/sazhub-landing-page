
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sazvida-700 to-sazvida-900 -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sazvida-500 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sazvida-400 rounded-full blur-3xl opacity-20 -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join leading healthcare institutions that trust Sazvida Solutions to enhance 
            their operations, improve compliance, and deliver better patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-sazvida-800 hover:bg-white/90 button-transition">
              Schedule a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 button-transition">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
