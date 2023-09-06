import React, {useState, useEffect} from 'react';
import './App.css';

interface TemperatureProps {
  temp: number;
}

function BattStatus({ temp }: TemperatureProps) {
    const [battText, setBattText] = useState('white');
    const [textColour, setTextColour] = useState('white');

    useEffect(() => {
        setBattText(temp > 80 || temp < 20 ? 'Danger 🕷️': 'Healthy 🕷️');
    }, [temp])

    useEffect(() => {
        setTextColour(temp > 80? 'red': 'green');
    })

    return (
        <header className="status-live" style={{backgroundColor: textColour}}>
          {`${battText}`}
        </header>
    );

}

export default BattStatus