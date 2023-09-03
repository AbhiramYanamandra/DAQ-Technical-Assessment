import React, {useState, useEffect} from 'react';
import './App.css';

interface TemperatureProps {
  temp: number;
}

function LiveValue({ temp } : TemperatureProps) {

  const [valueColour, setValueColour] = useState('white');

  useEffect(() => {
    setValueColour(temp > 80 ? 'red': 'green');
  }, [temp])

  return (
      <header className="live-value" style={{ color : valueColour }}>
        {`${temp.toString()}°C`}
      </header>
  );
}

export default LiveValue;