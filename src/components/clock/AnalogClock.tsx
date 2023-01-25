import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
//import 'react-clock/dist/Clock.css';

export default function AnalogClock(model: { size:number }) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return (
    <div>
      <Clock 
      size={model.size}
      value={value} />
    </div>
  );
}