
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Predictor from './components/Predictor';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/seed/youtube-bg/1920/1080')"}}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-dark-bg/80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24 flex-grow">
          <Hero />
          <Predictor />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;