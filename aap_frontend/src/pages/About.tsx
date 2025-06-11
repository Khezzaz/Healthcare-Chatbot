
import React from "react";
import FloatingNavbar from "@/components/ui/floating-navbar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Features", link: "/features" },
];

const About = () => {
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
          <h1 className="text-3xl font-bold text-foreground mb-6">About AvicennAI</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-sina-800">Our Inspiration</h2>
              <p className="text-muted-foreground">
                AvicennAI is named after Ibn AvicennAI (Avicenna), the legendary Persian polymath who lived from 980 to 1037 and revolutionized medicine with his encyclopedic "Canon of Medicine." Like its namesake, SinaAI aims to make medical knowledge accessible and beneficial to all.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-sina-800">Our Mission</h2>
              <p className="text-muted-foreground">
                We're committed to democratizing access to reliable medical information through the power of artificial intelligence. AvicennAI provides educational health information to help users better understand their health concerns and make informed decisions.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-sina-800">How It Works</h2>
              <p className="text-muted-foreground">
                AvicennAI utilizes advanced natural language processing to understand your health questions and provide relevant, evidence-based information. Our system is continuously learning and improving to deliver the most accurate and helpful responses possible.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-sina-800">Important Disclaimer</h2>
              <p className="text-muted-foreground">
                AvicennAI is designed to provide general health information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center animate-fade-in-up">
          <Link 
            to="/chat" 
            className="px-6 py-3 rounded-lg bg-sina-500 text-white font-medium transition-all hover:bg-sina-600 shadow-sm hover:shadow"
          >
            Start Chatting with AvicennAI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
