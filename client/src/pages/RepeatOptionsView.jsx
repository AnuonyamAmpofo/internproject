import React, { useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { repeatOptions } from '@/lib/types';

const RepeatOptionsView = () => {
  const [, navigate] = useLocation();
  const [selectedRepeat, setSelectedRepeat] = useState("Never");
  const [showCustom, setShowCustom] = useState(false);
  const params = useParams();

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSelectRepeat = (option) => {
    if (option === 'Custom') {
      setShowCustom(true);
      setSelectedRepeat(option);
      return;
    }

    setSelectedRepeat(option);
    localStorage.setItem('selectedRepeat', option);
    navigate(params.id ? `/edit/${params.id}` : '/add');
    // Trigger storage event for parent components
    window.dispatchEvent(new Event('storage'));
  };

  const toggleDay = (day) => {
    setSelectedDays(prev => {
      const newDays = prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day];
      return newDays;
    });
  };

  const handleSaveCustom = () => {
    const customRepeat = selectedDays.length > 0 
      ? `Every ${selectedDays.join(', ')}`
      : 'Never';
    localStorage.setItem('selectedRepeat', customRepeat);
    navigate(params.id ? `/edit/${params.id}` : '/add');
    window.dispatchEvent(new Event('storage'));
  };

  const handleBack = () => {
    navigate(params.id ? `/edit/${params.id}` : '/add');
  };

  return (
    <div className="flex flex-col min-h-screen pt-6">
      {/* Header */}
      <div className="px-4 py-4 flex items-center border-b border-[#333333]">
        <button 
          className="text-primary font-semibold mr-4"
          onClick={showCustom ? () => setShowCustom(false) : handleBack}
        >
          {showCustom ? 'Cancel' : 'Back'}
        </button>
        <h1 className="text-xl font-medium">Repeat</h1>
        {showCustom && (
          <button 
            className="text-primary font-semibold ml-auto"
            onClick={handleSaveCustom}
          >
            Save
          </button>
        )}
      </div>

      {!showCustom ? (
        /* Repeat Options List */
        <div className="px-4 pt-4">
          <div className="space-y-2">
            {repeatOptions.map((option, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-[#121212] rounded-lg"
                onClick={() => handleSelectRepeat(option)}
              >
                <span className="text-base">{option}</span>
                {selectedRepeat === option && (
                  <div className="text-primary">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Custom Repeat Interface */
        <div className="px-4 pt-4">
          <div className="space-y-2">
            {weekDays.map((day, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-[#121212] rounded-lg"
                onClick={() => toggleDay(day)}
              >
                <span className="text-base">{day}</span>
                {selectedDays.includes(day) && (
                  <div className="text-primary">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RepeatOptionsView;