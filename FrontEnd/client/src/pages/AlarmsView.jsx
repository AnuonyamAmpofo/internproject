import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import AlarmToggle from '@/src/components/AlarmToggle';
import ClockIcon from '@/src/components/ClockIcon';
import PlusIcon from '@/src/components/PlusIcon';
import AlarmPopup from '@/src/components/AlarmPopup';
import { defaultAlarms } from '@/src/lib/types';

const AlarmsView = () => {
  const [alarms, setAlarms] = useState(() => {
    const savedAlarms = localStorage.getItem('alarms');
    return savedAlarms ? JSON.parse(savedAlarms) : defaultAlarms;
  });
  const [, navigate] = useLocation();
  const [showPopup, setShowPopup] = useState(false); // State for the popup
  const [activeAlarm, setActiveAlarm] = useState(null); // State for the active alarm

  useEffect(() => {
    // Simulate checking for alarms that should ring
    const now = new Date();
    const ringingAlarm = alarms.find(alarm => alarm.isActive && alarm.time === now.toLocaleTimeString());
    if (ringingAlarm) {
      setShowPopup(true);
      setActiveAlarm(ringingAlarm);
    }
  }, [alarms]);

  const toggleAlarm = (id) => {
    setAlarms(prevAlarms => {
      const newAlarms = prevAlarms.map(alarm =>
        alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
      );
      localStorage.setItem('alarms', JSON.stringify(newAlarms));
      return newAlarms;
    });
  };

  const handleAddAlarm = () => {
    navigate('/add');
  };

  const handleEditAlarm = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDismissPopup = () => {
    setShowPopup(false);
    setActiveAlarm(null); //Added to clear active alarm
  };


  return (
    <div className="flex flex-col min-h-screen pt-6">
      {/* Header */}
      <div className="px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Alarms</h1>
        <button
          className="text-primary p-3 flex items-center justify-center"
          onClick={handleAddAlarm}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Alarm List */}
      <div className="px-4 flex-1 pb-24">
        {alarms.map(alarm => (
          <div
            key={alarm.id}
            className="flex items-center justify-between py-4 border-b border-[#333333]"
            onClick={() => handleEditAlarm(alarm.id)}
          >
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-4xl font-light mr-2">
                  {alarm.time.split(' ')[0]}
                </span>
                <span className="text-xl">
                  {alarm.time.split(' ')[1]}
                </span>
              </div>
              <div className="text-sm text-[#8E8E93]">
                {alarm.label}
                {alarm.repeat && alarm.repeat !== 'Never' && <span> - {alarm.repeat}</span>}
              </div>
            </div>
            <AlarmToggle
              isOn={alarm.isActive}
              onToggle={(e) => {
                e.stopPropagation();
                toggleAlarm(alarm.id);
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background pt-4 pb-8 flex justify-center">
        <button className="p-2">
          <ClockIcon />
        </button>
      </div>
      {showPopup && <AlarmPopup alarm={activeAlarm} onDismiss={handleDismissPopup} />} {/*Added Alarm Popup*/}
    </div>
  );
};

export default AlarmsView;