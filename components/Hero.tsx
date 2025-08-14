
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-center py-16 md:py-24">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
        YouTube Popularity Predictor
      </h1>
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
        Analyze key video metrics to forecast potential viewership and refine your content strategy.
      </p>
    </section>
  );
};

export default Hero;
