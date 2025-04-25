import React from 'react';

const StatusBar = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).split(' ')[0]; // Extract just the time part
  
  return (
    <div className="status-bar flex justify-between items-center h-11 px-4">
      <div className="text-base font-semibold">{currentTime}</div>
      <div className="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 4v0a2 2 0 01-2 2H4a2 2 0 01-2-2v0a2 2 0 012-2h16a2 2 0 012 2z" />
        </svg>
      </div>
    </div>
  );
};

export default StatusBar;