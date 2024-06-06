import React, { useState, useEffect } from 'react';

export const CountdownTime: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
   const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeft = {
         days: 0,
         hours: 0,
         minutes: 0,
         seconds: 0,
      };

      if (difference > 0) {
         timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
         };
      }

      return timeLeft;
   };

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

   useEffect(() => {
      const timer = setTimeout(() => {
         const timeLeft = calculateTimeLeft();
         if (
            timeLeft.days === 0 &&
            timeLeft.hours === 0 &&
            timeLeft.minutes === 0 &&
            timeLeft.seconds === 0
         ) {
            clearTimeout(timer);
         } else {
            setTimeLeft(timeLeft);
         }
      }, 1000);

      return () => clearTimeout(timer);
   });

   const addLeadingZeros = (value: number) => {
      if (value < 10) {
         return `0${value}`;
      }
      return value;
   };

   return (
      <div>
         <span className="text-2xl font-bold">
            {addLeadingZeros(timeLeft.days)} <span className="text-soft">D</span> :
         </span>
         <span className="text-2xl font-bold">
            {addLeadingZeros(timeLeft.hours)} <span className="text-soft">H</span> :
         </span>
         <span className="text-2xl font-bold">
            {addLeadingZeros(timeLeft.minutes)} <span className="text-soft">M</span> :
         </span>
         <span className="text-2xl font-bold">
            {addLeadingZeros(timeLeft.seconds)} <span className="text-soft">S</span>{' '}
         </span>
      </div>
   );
};
