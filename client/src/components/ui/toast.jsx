
import React, { useEffect } from 'react';

export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-accent' : 'bg-secondary';

  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-lg min-w-[200px] text-center`}>
      {message}
    </div>
  );
}
