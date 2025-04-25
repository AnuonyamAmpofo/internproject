
import React, { useState } from 'react';

const TimeWheel = ({ type, value, onChange }) => {
  const [startY, setStartY] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);

  const getValues = () => {
    if (type === 'hour') {
      return Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    } else if (type === 'minute') {
      return Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
    } else {
      return ['AM', 'PM'];
    }
  };

  const values = getValues();
  const currentIndex = values.indexOf(value);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (startY === null) return;
    
    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;
    setCurrentOffset(diff);

    if (Math.abs(diff) > 20) {
      const direction = diff > 0 ? 1 : -1;
      let newIndex = (currentIndex + direction + values.length) % values.length;
      onChange(values[newIndex]);
      setStartY(currentY);
      setCurrentOffset(0);
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
    setCurrentOffset(0);
  };

  const handleWheel = (e) => {
    const direction = e.deltaY > 0 ? 1 : -1;
    let newIndex = (currentIndex + direction + values.length) % values.length;
    onChange(values[newIndex]);
  };

  const getWidth = () => {
    if (type === 'period') return 'w-16';
    return 'w-16';
  };

  const getPrevValue = () => {
    const prevIndex = (currentIndex - 1 + values.length) % values.length;
    return values[prevIndex];
  };

  const getNextValue = () => {
    const nextIndex = (currentIndex + 1) % values.length;
    return values[nextIndex];
  };

  const transform = `translateY(${currentOffset}px)`;

  return (
    <div 
      className={`time-wheel ${getWidth()} text-center`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div className="time-wheel-middle"></div>
      <div className="absolute inset-0 flex flex-col justify-center" style={{ transform }}>
        <div className="time-picker-item text-gray-500">{getPrevValue()}</div>
        <div className="time-picker-item text-5xl font-light">{value}</div>
        <div className="time-picker-item text-gray-500">{getNextValue()}</div>
      </div>
    </div>
  );
};

export default TimeWheel;
