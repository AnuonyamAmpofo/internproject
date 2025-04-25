import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import TimeWheel from '@/components/TimeWheel';
import AlarmToggle from '@/components/AlarmToggle';
import { defaultAlarms } from '@/lib/types';
import { ChevronRight } from 'lucide-react';

const EditAlarmView = () => {
  const [, navigate] = useLocation();
  const params = useParams();
  const alarmId = parseInt(params.id, 10);

  const [alarm, setAlarm] = useState(null);
  const [time, setTime] = useState({
    hour: '01',
    minute: '01',
    period: 'AM'
  });
  const [snooze, setSnooze] = useState(true);
  const [label, setLabel] = useState('');
  const [sound, setSound] = useState('');
  const [repeat, setRepeat] = useState('Never');

  // Listen for sound and repeat selection
  useEffect(() => {
    const handleStorage = () => {
      const selectedSound = localStorage.getItem('selectedSound');
      if (selectedSound) {
        setSound(selectedSound);
        localStorage.removeItem('selectedSound');
        
        // Update alarms in localStorage for sound
        const savedAlarms = localStorage.getItem('alarms');
        const currentAlarms = savedAlarms ? JSON.parse(savedAlarms) : defaultAlarms;
        const updatedAlarms = currentAlarms.map(a => 
          a.id === alarmId ? { ...a, sound: selectedSound } : a
        );
        localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
      }

      const selectedRepeat = localStorage.getItem('selectedRepeat');
      if (selectedRepeat) {
        setRepeat(selectedRepeat);
        localStorage.removeItem('selectedRepeat');
        
        // Update alarms in localStorage for repeat
        const savedAlarms = localStorage.getItem('alarms');
        const currentAlarms = savedAlarms ? JSON.parse(savedAlarms) : defaultAlarms;
        const updatedAlarms = currentAlarms.map(a => 
          a.id === alarmId ? { ...a, repeat: selectedRepeat } : a
        );
        localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
      }
    };

    window.addEventListener('storage', handleStorage);
    handleStorage(); // Check on mount

    return () => window.removeEventListener('storage', handleStorage);
  }, [alarmId]);

  useEffect(() => {
    const savedAlarms = localStorage.getItem('alarms');
    const currentAlarms = savedAlarms ? JSON.parse(savedAlarms) : defaultAlarms;
    const foundAlarm = currentAlarms.find(a => a.id === alarmId);
    
    if (foundAlarm) {
      setAlarm(foundAlarm);

      // Parse time into components
      const timeParts = foundAlarm.time.split(' ');
      const [hour, minute] = timeParts[0].split(':');
      setTime({
        hour: hour.padStart(2, '0'),
        minute: minute.padStart(2, '0'),
        period: timeParts[1]
      });

      setSnooze(foundAlarm.snooze);
      setLabel(foundAlarm.label);
      setSound(foundAlarm.sound);
      setRepeat(foundAlarm.repeat);
    }
  }, [alarmId]);

  const handleCancel = () => {
    navigate('/');
  };

  const handleSave = () => {
    const updatedAlarms = defaultAlarms.map(a => {
      if (a.id === alarmId) {
        return {
          ...a,
          time: `${time.hour}:${time.minute} ${time.period}`,
          label,
          sound,
          snooze
        };
      }
      return a;
    });
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
    navigate('/');
  };

  const handleDelete = () => {
    const updatedAlarms = defaultAlarms.filter(a => a.id !== alarmId);
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
    window.showToast('Alarm deleted successfully', 'success');
    navigate('/');
  };

  const navigateToSounds = () => {
    navigate(`/sounds/${params.id}`);
  };

  const navigateToRepeat = () => {
    navigate(`/repeat/${alarmId}`);
  };

  if (!alarm) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen pt-6">
      {/* Header */}
      <div className="px-4 py-4 flex justify-between items-center">
        <button 
          className="text-primary font-semibold"
          onClick={handleCancel}
        >
          Back
        </button>
        <h1 className="text-xl font-medium">Edit Alarm</h1>
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
              onChange={(newHour) => setTime({ ...time, hour: newHour })}
            />

            <div className="text-5xl font-light mx-2">:</div>

            <TimeWheel
              type="minute"
              value={time.minute}
              onChange={(newMinute) => setTime({ ...time, minute: newMinute })}
            />

            <TimeWheel
              type="period"
              value={time.period}
              onChange={(newPeriod) => setTime({ ...time, period: newPeriod })}
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

      {/* Delete Button */}
      <div className="px-4 py-6 mt-4">
        <button 
          className="w-full py-3 bg-[#121212] rounded-lg text-[#FF3B30] font-medium"
          onClick={handleDelete}
        >
          Delete Alarm
        </button>
      </div>
    </div>
  );
};

export default EditAlarmView;