
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Stethoscope, Heart, Clipboard } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative pt-28 min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated background blobs */}
      <div className="blob bg-sina-200/40 w-96 h-96 top-0 -left-48"></div>
      <div className="blob bg-sina-100/30 w-80 h-80 bottom-0 right-0 animation-delay-2000"></div>
      
      {/* Small badge */}
      <div className="glass mb-6 px-4 py-2 rounded-full text-sm text-sina-800 max-w-fit animate-fade-in-up" style={{animationDelay: "0.1s"}}>
        <span className="font-medium">Inspired by Ibn Sina</span>
      </div>
      
      {/* Main heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight mb-6 max-w-3xl animate-fade-in-up" style={{animationDelay: "0.2s"}}>
        Your Personal <span className="text-sina-600">Medical Assistant</span> Powered by AI
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg md:text-xl text-muted-foreground text-center max-w-xl mb-10 animate-fade-in-up" style={{animationDelay: "0.3s"}}>
        AvicennAI combines cutting-edge artificial intelligence with medical knowledge to provide reliable health information and guidance.
      </p>
      
      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
        <button 
          onClick={() => navigate("/chat")}
          className="px-6 py-3 rounded-lg bg-sina-500 text-white font-medium flex items-center justify-center gap-2 transition-all hover:bg-sina-600 shadow-sm hover:shadow"
        >
          Start Chatting <ArrowRight size={18} />
        </button>
        <button 
          onClick={() => navigate("/about")}
          className="px-6 py-3 rounded-lg bg-white text-sina-800 font-medium flex items-center justify-center gap-2 border border-sina-100 transition-all hover:bg-sina-50 shadow-sm hover:shadow"
        >
          Learn More
        </button>
      </div>
      
      {/* Features highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-4xl animate-fade-in-up" style={{animationDelay: "0.5s"}}>
        <div className="glass p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-sina-100 flex items-center justify-center mb-4">
            <Stethoscope className="text-sina-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Medical Guidance</h3>
          <p className="text-muted-foreground text-sm">Get reliable information about symptoms, conditions, and general health topics.</p>
        </div>
        
        <div className="glass p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-sina-100 flex items-center justify-center mb-4">
            <Heart className="text-sina-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Health Education</h3>
          <p className="text-muted-foreground text-sm">Learn about preventive care, wellness tips, and healthy lifestyle choices.</p>
        </div>
        
        <div className="glass p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-sina-100 flex items-center justify-center mb-4">
            <Clipboard className="text-sina-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Medical Reference</h3>
          <p className="text-muted-foreground text-sm">Access information about medications, treatments, and medical procedures.</p>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-16 text-sm text-muted-foreground text-center max-w-lg animate-fade-in-up" style={{animationDelay: "0.6s"}}>
        <p>AvicennAI provides information for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
      </div>
    </section>
  );
};

export default HeroSection;
