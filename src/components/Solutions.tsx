import React, { useEffect, useRef } from 'react';
import { Shield, Users, Award, BookOpen, BarChart, CheckCircle, Brain, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  aiFeature?: string;
}

const SolutionCard = ({ title, description, icon, delay, aiFeature }: SolutionCardProps) => (
  <div 
    className="glass-card p-6 rounded-xl hover-lift cursor-pointer relative overflow-hidden group"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-lg bg-sazvida-100 flex items-center justify-center mb-4 text-sazvida-600">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    
    {aiFeature && (
      <div className="flex items-center gap-2 text-sm text-sazvida-600">
        <Brain className="h-4 w-4" />
        <span>{aiFeature}</span>
      </div>
    )}
    
    <div className="absolute top-0 right-0 w-32 h-32 bg-sazvida-100/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
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
      icon: <Shield className="h-6 w-6" />,
      aiFeature: "Predictive renewal alerts"
    },
    {
      title: "Quality Management",
      description: "Comprehensive tools for quality assurance, auditing, and continuous improvement in healthcare settings.",
      icon: <Award className="h-6 w-6" />,
      aiFeature: "Automated compliance checks"
    },
    {
      title: "User Management",
      description: "Secure role-based access control system designed specifically for healthcare organizations.",
      icon: <Users className="h-6 w-6" />,
      aiFeature: "Smart role suggestions"
    },
    {
      title: "Medical Education Platform",
      description: "Interactive learning environment for medical professionals with certification tracking.",
      icon: <BookOpen className="h-6 w-6" />,
      aiFeature: "Personalized learning paths"
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time insights and reporting tools to make data-driven decisions in healthcare operations.",
      icon: <BarChart className="h-6 w-6" />,
      aiFeature: "Predictive analytics"
    },
    {
      title: "AI Assistant",
      description: "Intelligent support for daily tasks, documentation, and decision-making processes.",
      icon: <Zap className="h-6 w-6" />,
      aiFeature: "Natural language processing"
    }
  ];

  return (
    <section id="solutions" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-up" ref={sectionRef}>
          <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-sazvida-100 text-sazvida-800 rounded-full mb-4">
            <Brain className="h-4 w-4" />
            <span>AI-Powered Solutions</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Intelligent Healthcare Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our suite of AI-enhanced software solutions designed specifically for healthcare 
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
              aiFeature={solution.aiFeature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;