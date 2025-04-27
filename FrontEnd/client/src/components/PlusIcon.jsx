
import React from 'react';

const PlusIcon = () => {
  return (
    <div className="relative w-12 h-12">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle
          cx="24"
          cy="24"
          r="23"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M24 16V32M16 24H32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default PlusIcon;
