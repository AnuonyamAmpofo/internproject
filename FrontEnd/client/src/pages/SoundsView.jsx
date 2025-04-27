
import React, { useState } from 'react';
import { useLocation, useParams } from 'wouter';
import ClockIcon from '@/src/components/ClockIcon';
import { soundOptions } from '@/src/lib/types';

const SoundsView = () => {
  const [, navigate] = useLocation();
  const [selectedSound, setSelectedSound] = useState("Dreamer");

  const params = useParams();

  const handleBack = () => {
    navigate(params.id ? `/edit/${params.id}` : '/add');
  };

  const handleSelectSound = (soundName) => {
    setSelectedSound(soundName);
    // Store selected sound in localStorage
    localStorage.setItem('selectedSound', soundName);
    // Trigger storage event for parent components
    window.dispatchEvent(new Event('storage'));
    navigate(params.id ? `/edit/${params.id}` : '/add');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-4 py-4 flex justify-between items-center">
        <button 
          className="text-primary font-semibold"
          onClick={handleBack}
        >
          Back
        </button>
        <h1 className="text-xl font-medium">Sounds</h1>
        <div className="w-12"></div>
      </div>
      
      {/* Sound List */}
      <div className="px-4 flex-1">
        {soundOptions.map((sound, index) => (
          <div 
            key={index}
            className="flex justify-between items-center py-4 border-b border-[#333333]"
            onClick={() => handleSelectSound(sound.name)}
          >
            <span>{sound.name}</span>
            {sound.isDefault && <span className="text-[#8E8E93]">Default</span>}
          </div>
        ))}
      </div>
      
      {/* Bottom Navigation */}
      <div className="mt-auto pt-4 pb-8 flex justify-center">
        <button className="p-2">
          <ClockIcon />
        </button>
      </div>
    </div>
  );
};

export default SoundsView;
