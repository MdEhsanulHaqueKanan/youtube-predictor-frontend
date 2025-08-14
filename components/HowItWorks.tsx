
import React from 'react';
import GlassCard from './GlassCard';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16">
      <GlassCard>
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="space-y-4 text-gray-300 max-w-4xl mx-auto text-left md:text-lg">
          <p>
            This tool uses a machine learning model trained on a real-world dataset of YouTube videos to identify patterns that lead to higher view counts.
          </p>
          <p>
            <strong className="font-semibold text-white">Backend Engine:</strong> The prediction model is a Random Forest Regressor built with Python and Scikit-learn. It is deployed as a cost-effective, serverless API using AWS Lambda and Amazon API Gateway.
          </p>
          <p>
            <strong className="font-semibold text-white">Feature-Based Prediction:</strong> It analyzes the numerical metrics you provide—like engagement, duration, and publishing time—to make its prediction. It does not analyze video titles or descriptions.
          </p>
          <p>
            <strong className="font-semibold text-white">Frontend Interface:</strong> The interface you are using is built with React and TypeScript and is hosted as a high-performance static website on Amazon S3.
          </p>
        </div>
      </GlassCard>
    </section>
  );
};

export default HowItWorks;
