import React from 'react';
import DateTimeDisplay from './dateTimeDisplay';

interface ShowCounterProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const ShowCounter: React.FC<ShowCounterProps> = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter">
            <a
                href="https://tapasadhikary.com"
                target="_blank"
                rel="noopener noreferrer"
                className="countdown-link"
            >
                <DateTimeDisplay value={days} type="Days" isDanger={days <= 3} />
                <p>:</p>
                <DateTimeDisplay value={hours} type="Hours" isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={minutes} type="Mins" isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type="Seconds" isDanger={false} />
            </a>
        </div>
    );
};

export default ShowCounter;
