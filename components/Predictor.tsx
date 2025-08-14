import React, { useState, FormEvent } from 'react';
import { ThumbsUpIcon, MessageIcon, ClockIcon, CalendarIcon, CategoryIcon, UserIcon, TagIcon } from '../constants';
import { YOUTUBE_CATEGORIES, DAYS_OF_WEEK } from '../constants';
import type { FormData } from '../types';
import GlassCard from './GlassCard';
import Spinner from './Spinner';

// These are the new mapping objects to translate form data for your API
const YOUTUBE_CATEGORY_MAP: { [key: string]: number } = {
  "Film & Animation": 1,
  "Autos & Vehicles": 2,
  "Music": 10,
  "Pets & Animals": 15,
  "Sports": 17,
  "Travel & Events": 19,
  "Gaming": 20,
  "People & Blogs": 22,
  "Comedy": 23,
  "Entertainment": 24,
  "News & Politics": 25,
  "Howto & Style": 26,
  "Education": 27,
  "Science & Technology": 28,
  "Nonprofits & Activism": 29,
};

const DAY_OF_WEEK_MAP: { [key: string]: number } = {
  "Monday": 0,
  "Tuesday": 1,
  "Wednesday": 2,
  "Thursday": 3,
  "Friday": 4,
  "Saturday": 5,
  "Sunday": 6,
};

// Moved InputField outside of the Predictor component to prevent re-mounting on every render
const InputField = ({ icon, name, placeholder, value, onChange, type = "number" }: { icon: React.ReactNode; name: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min="0"
      className="w-full pl-10 pr-3 py-2 bg-black/20 border border-glass-border rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition"
      required
    />
  </div>
);

const Predictor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    likes: '',
    comments: '',
    duration: '',
    publishHour: '12',
    category: YOUTUBE_CATEGORIES[0],
    channelTitle: '',
    dayOfWeek: DAYS_OF_WEEK[0],
    tagCount: '',
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, publishHour: e.target.value }));
  };

  // This is the new, updated handleSubmit function with the real API call
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null);
    setError(null);

    // --- This is the URL of your AWS API ---
    const apiEndpoint = 'https://3bd5z76vu0.execute-api.us-east-1.amazonaws.com/v1/predict';

    try {
      // 1. Validate and convert form data
      const { likes, comments, duration, publishHour, category, channelTitle, dayOfWeek, tagCount } = formData;
      if (!likes || !comments || !duration || !channelTitle || !tagCount || !category || !dayOfWeek) {
          throw new Error("Please fill in all fields.");
      }
      
      const payload = {
        like_count: parseInt(likes),
        comment_count: parseInt(comments),
        duration_seconds: parseInt(duration),
        tag_count: parseInt(tagCount),
        category_id: YOUTUBE_CATEGORY_MAP[category],
        publish_hour: parseInt(publishHour),
        publish_day_of_week: DAY_OF_WEEK_MAP[dayOfWeek],
        channel_title: channelTitle,
      };

      // Check for any invalid number conversions
      for (const [key, value] of Object.entries(payload)) {
        if (typeof value === 'number' && isNaN(value)) {
          throw new Error(`Invalid number provided for ${key}.`);
        }
      }

      // 2. Make the REAL API call using fetch
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Handle HTTP errors like 404 or 500
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const result = await response.json();

      // 3. Set the prediction from the API response
      // Note: Adjust 'predicted_view_count' if your API returns a different key
      setPrediction(result.predicted_view_count);

    } catch (err) {
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError("An unknown error occurred during prediction.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="predictor" className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard>
          <h2 className="text-2xl font-bold mb-6">Video Metrics</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField icon={<UserIcon className="w-5 h-5" />} name="channelTitle" placeholder="Channel Title (e.g., Tech Visionary)" value={formData.channelTitle} onChange={handleInputChange} type="text" />
            <InputField icon={<ThumbsUpIcon className="w-5 h-5" />} name="likes" placeholder="Like Count (e.g., 15000)" value={formData.likes} onChange={handleInputChange} />
            <InputField icon={<MessageIcon className="w-5 h-5" />} name="comments" placeholder="Comment Count (e.g., 2000)" value={formData.comments} onChange={handleInputChange} />
            <InputField icon={<ClockIcon className="w-5 h-5" />} name="duration" placeholder="Video Duration (seconds, e.g., 600)" value={formData.duration} onChange={handleInputChange} />
            <InputField icon={<TagIcon className="w-5 h-5" />} name="tagCount" placeholder="Tag Count (e.g., 15)" value={formData.tagCount} onChange={handleInputChange} />
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 bg-black/20 border border-glass-border rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition appearance-none">
                {DAYS_OF_WEEK.map(day => <option key={day} className="bg-dark-bg text-gray-200">{day}</option>)}
              </select>
            </div>

            <div>
              <label className="flex items-center text-gray-300 mb-2">
                <ClockIcon className="w-5 h-5 mr-3" />
                Publish Hour ({formData.publishHour.padStart(2, '0')}:00)
              </label>
              <input type="range" min="0" max="23" name="publishHour" value={formData.publishHour} onChange={handleSliderChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-500" />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <CategoryIcon className="w-5 h-5" />
              </div>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 bg-black/20 border border-glass-border rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition appearance-none">
                {YOUTUBE_CATEGORIES.map(cat => <option key={cat} className="bg-dark-bg text-gray-200">{cat}</option>)}
              </select>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
              {isLoading ? 'Analyzing...' : 'Predict Views'}
            </button>
          </form>
        </GlassCard>

        <GlassCard>
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                {isLoading && <Spinner />}
                {!isLoading && !prediction && !error && (
                    <div className="text-center text-gray-400">
                        <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-gray-500 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                        <h3 className="text-xl font-semibold">Awaiting Analysis</h3>
                        <p>Prediction results will appear here.</p>
                    </div>
                )}
                {!isLoading && prediction !== null && (
                    <div className="text-center">
                        <p className="text-lg text-gray-300 mb-2">Predicted View Count</p>
                        <p className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent animate-fade-in">
                            {prediction.toLocaleString()}
                        </p>
                    </div>
                )}
                 {!isLoading && error && (
                    <div className="text-center text-red-400">
                         <svg xmlns="http://www.w.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h3 className="text-xl font-semibold">Analysis Failed</h3>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default Predictor;