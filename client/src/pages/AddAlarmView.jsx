import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import TimeWheel from '@/components/TimeWheel';
import AlarmToggle from '@/components/AlarmToggle';
import { ChevronRight } from 'lucide-react';
import { defaultAlarms } from '@/lib/types';

const AddAlarmView = () => {
  const [, navigate] = useLocation();
  const [time, setTime] = useState({
    hour: '01',
    minute: '01',
    period: 'AM'
  });
  const [snooze, setSnooze] = useState(true);
  const [label, setLabel] = useState('Breakfast');
  const [sound, setSound] = useState('Default');
  const [repeat, setRepeat] = useState('Never');

  // Listen for sound selection
  useEffect(() => {
    const handleStorage = () => {
      const selectedSound = localStorage.getItem('selectedSound');
      if (selectedSound) {
        setSound(selectedSound);
        localStorage.removeItem('selectedSound');
      }
    };

    window.addEventListener('storage', handleStorage);
    handleStorage(); // Check on mount

    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleCancel = () => {
    navigate('/');
  };

  const handleSave = () => {
    const savedAlarms = localStorage.getItem('alarms');
    const currentAlarms = savedAlarms ? JSON.parse(savedAlarms) : defaultAlarms;
    
    const newAlarm = {
      id: Math.max(...currentAlarms.map(a => a.id)) + 1,
      time: `${time.hour}:${time.minute} ${time.period}`,
      label,
      isActive: true,
      sound,
      snooze,
      repeat
    };
    
    const updatedAlarms = [...currentAlarms, newAlarm];
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
    window.showToast('Alarm added successfully');
    navigate('/');
  };

  const navigateToSounds = () => {
    navigate('/sounds/add');
  };

  const navigateToRepeat = () => {
    navigate('/repeat');
  };

  // Listen for returning from repeat options
  useEffect(() => {
    const handleStorage = () => {
      const selectedRepeat = localStorage.getItem('selectedRepeat');
      if (selectedRepeat) {
        setRepeat(selectedRepeat);
        localStorage.removeItem('selectedRepeat');
      }
    };

    window.addEventListener('storage', handleStorage);
    handleStorage(); // Check on mount

    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <div className="px-4 py-4 flex justify-between items-center">
        <button 
          className="text-primary font-semibold"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <h1 className="text-xl font-medium">Add Alarm</h1>
        <button 
          className="text-[#30D158] font-semibold"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      {/* Time Picker */}
      <div className="px-4 py-6">
        <div className="flex justify-center items-center relative">
          <div className="flex items-center">
            <TimeWheel
              type="hour"
              value={time.hour}
              onChange={(newValue) => setTime({ ...time, hour: newValue })}
            />

            <div className="text-5xl font-light mx-2">:</div>

            <TimeWheel
              type="minute"
              value={time.minute}
              onChange={(newValue) => setTime({ ...time, minute: newValue })}
            />

            <TimeWheel
              type="period"
              value={time.period}
              onChange={(newValue) => setTime({ ...time, period: newValue })}
            />
          </div>
        </div>
      </div>

      {/* Alarm Options */}
      <div className="px-4 py-2">
        <div className="rounded-lg overflow-hidden bg-[#121212]">
          {/* Repeat Option */}
          <div 
            className="flex justify-between items-center px-4 py-3 border-b border-[#333333]"
            onClick={navigateToRepeat}
          >
            <span>Repeat</span>
            <div className="flex items-center">
              <span className="text-[#8E8E93]">{repeat}</span>
              <ChevronRight className="h-5 w-5 ml-2 text-[#8E8E93]" />
            </div>
          </div>

          {/* Label Option */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#333333]">
            <span>Label</span>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="text-right bg-transparent text-[#8E8E93] focus:outline-none"
              placeholder="Enter label"
            />
          </div>

          {/* Sound Option */}
          <div 
            className="flex justify-between items-center px-4 py-3 border-b border-[#333333]"
            onClick={navigateToSounds}
          >
            <span>Sound</span>
            <div className="flex items-center">
              <span className="text-[#8E8E93]">{sound}</span>
              <ChevronRight className="h-5 w-5 ml-2 text-[#8E8E93]" />
            </div>
          </div>

          {/* Snooze Option */}
          <div className="flex justify-between items-center px-4 py-3">
            <span>Snooze</span>
            <AlarmToggle isOn={snooze} onToggle={() => setSnooze(!snooze)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAlarmView;