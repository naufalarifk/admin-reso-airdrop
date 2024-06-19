import React from 'react';
import { useCountdown } from '@/hooks';
import ExpiredNotice from './expiredNotice';
import ShowCounter from './showCounter';

interface CountdownProps {
    targetDate: string | number | Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};
