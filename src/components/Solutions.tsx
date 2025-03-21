
import React, { useEffect, useRef } from 'react';
import { Shield, Users, Award, BookOpen, BarChart, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const SolutionCard = ({ title, description, icon, delay }: SolutionCardProps) => (
  <div 
    className="glass-card p-6 rounded-xl hover-lift cursor-pointer"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-lg bg-sazvida-100 flex items-center justify-center mb-4 text-sazvida-600">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Solutions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const solutions = [
    {
      title: "License Management",
      description: "Streamline healthcare licensing processes with automated tracking, renewals, and compliance monitoring.",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Quality Management",
      description: "Comprehensive tools for quality assurance, auditing, and continuous improvement in healthcare settings.",
      icon: <Award className="h-6 w-6" />
    },
    {
      title: "User Management",
      description: "Secure role-based access control system designed specifically for healthcare organizations.",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Medical Education Platform",
      description: "Interactive learning environment for medical professionals with certification tracking.",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time insights and reporting tools to make data-driven decisions in healthcare operations.",
      icon: <BarChart className="h-6 w-6" />
    },
    {
      title: "Compliance Suite",
      description: "Stay compliant with healthcare regulations through automated monitoring and documentation.",
      icon: <CheckCircle className="h-6 w-6" />
    }
  ];

  return (
    <section id="solutions" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-up" ref={sectionRef}>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-sazvida-100 text-sazvida-800 rounded-full mb-4">
            Our Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Healthcare Software Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our suite of advanced software solutions designed specifically for healthcare 
            professionals and institutions, streamlining operations and improving patient care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animate" ref={sectionRef}>
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              title={solution.title}
              description={solution.description}
              icon={solution.icon}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
