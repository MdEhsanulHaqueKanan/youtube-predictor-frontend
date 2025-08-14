import React from 'react';
import { YouTubeIcon, CodeIcon } from '../constants'; // InfoIcon is no longer needed

const Header: React.FC = () => {

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-6 py-3 bg-black/30 backdrop-blur-lg border-b border-glass-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <YouTubeIcon className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold tracking-tight">Popularity Predictor</span>
          </div>
          <div className="flex items-center space-x-6">
            {/* --- CHANGE 1: Link to the BACKEND code --- */}
            <a 
              href="https://github.com/MdEhsanulHaqueKanan/aws-serverless-youtube-predictor" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <CodeIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Backend Code</span>
            </a>
            
            {/* --- CHANGE 2: Link to the FRONTEND code (with a placeholder URL) --- */}
            {/* IMPORTANT: Remember to create this repo and replace the href link later! */}
            <a 
              href="https://github.com/MdEhsanulHaqueKanan/youtube-predictor-frontend" // <-- REPLACE THIS PLACEHOLDER URL LATER
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <CodeIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Frontend Code</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;