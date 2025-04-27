import React from 'react';

const ClockIcon = ({ className = "h-7 w-7 text-primary" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"></circle>
      <path strokeLinecap="round" strokeWidth="2" d="M12 8v4l3 3"></path>
    </svg>
  );
};

export default ClockIcon;