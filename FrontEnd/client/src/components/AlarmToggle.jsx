import React from 'react';

const AlarmToggle = ({ isOn, onToggle }) => {
  return (
    <div 
      className={`w-12 h-7 rounded-full transition-colors relative ${isOn ? 'bg-primary' : 'bg-muted'}`}
      onClick={onToggle}
    >
      <div 
        className={`absolute w-6 h-6 rounded-full bg-white top-0.5 transition-all transform ${isOn ? 'left-[22px]' : 'left-0.5'}`}
      ></div>
    </div>
  );
};

export default AlarmToggle;