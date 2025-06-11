
import React from "react";
import FloatingNavbar from "@/components/ui/floating-navbar";
import { ArrowLeft, ArrowRight, Stethoscope, Heart, Clipboard, Search, Info, Clock, MessageCircle, Languages, Mic, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Features", link: "/features" },
];

const Features = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingNavbar navItems={navItems} />
      
      <div className="container max-w-4xl mx-auto py-24 px-4">
        <div className="mb-6 animate-fade-in-up">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="glass p-8 rounded-2xl mb-8 animate-fade-in-up">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">AvicennAI Features</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how AvicennAI can assist you with reliable medical information and guidance through its advanced capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              icon={<MessageCircle size={24} />}
              title="Natural Conversations"
              description="Engage in natural, human-like conversations about your health concerns and medical questions."
            />
            
            <FeatureCard 
              icon={<Stethoscope size={24} />}
              title="Symptom Information"
              description="Learn about potential causes of symptoms and when you should consider seeking professional medical care."
            />
            
            <FeatureCard 
              icon={<Search size={24} />}
              title="Medical Knowledge Base"
              description="Access information about diseases, conditions, treatments, and medications from reliable sources."
            />
            
            <FeatureCard 
              icon={<Languages size={24} />}
              title="Multilingual Support"
              description="Communicate in your preferred language with support for English, French, and Arabic to make healthcare information accessible to all."
            />
            
            <FeatureCard 
              icon={<Mic size={24} />}
              title="Voice Input"
              description="Speak directly to AvicennAI with voice recognition capabilities, making it easier to describe symptoms or ask questions hands-free."
            />
            
            <FeatureCard 
              icon={<Volume2 size={24} />}
              title="Audio Responses"
              description="Listen to AvicennAI's responses through clear voice output, perfect for accessibility or when you're unable to read the screen."
            />
            
            <FeatureCard 
              icon={<Heart size={24} />}
              title="Wellness Guidance"
              description="Get advice on preventive care, nutrition, exercise, and general wellness practices."
            />
            
            <FeatureCard 
              icon={<Clipboard size={24} />}
              title="Medical Terminology"
              description="Understand complex medical terms and concepts explained in simple, accessible language."
            />
            
            <FeatureCard 
              icon={<Info size={24} />}
              title="Healthcare Navigation"
              description="Learn about different medical specialties and when to consult specific healthcare professionals."
            />
            
            <FeatureCard 
              icon={<Clock size={24} />}
              title="24/7 Availability"
              description="Access medical information whenever you need it, day or night, without waiting."
            />
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl text-center animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-3">Ready to experience AvicennAI?</h2>
          <p className="text-muted-foreground mb-6">
            Start a conversation with AvicennAI now and discover how it can help with your medical questions.
          </p>
          <Link 
            to="/chat" 
            className="px-6 py-3 rounded-lg bg-sina-500 text-white font-medium flex items-center justify-center gap-2 transition-all hover:bg-sina-600 shadow-sm hover:shadow max-w-xs mx-auto"
          >
            Chat with AvicennAI <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="glass p-6 rounded-xl transition-all hover:shadow-md">
      <div className="w-12 h-12 rounded-full bg-sina-100 flex items-center justify-center mb-4">
        <div className="text-sina-600">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default Features;
