
import React from 'react';

const AlarmPopup = ({ alarm, onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#121212] p-6 rounded-lg w-[80%] max-w-md">
        <div className="text-4xl font-light text-center mb-4">{alarm.time}</div>
        <div className="text-xl text-center mb-6">{alarm.label}</div>
        <button 
          onClick={onDismiss}
          className="w-full py-3 bg-primary rounded-lg text-white font-medium"
        >
          Stop Alarm
        </button>
      </div>
    </div>
  );
};

export default AlarmPopup;
