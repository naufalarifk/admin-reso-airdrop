import type { FC } from 'react';
import type { NouisliderProps } from 'nouislider-react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import '@/styles/nouislider.css';

export const SliderPercent: FC<NouisliderProps & { length?: number }> = ({
   range,
   start,
   step,
   tooltips,
   connect,
   format,
   length,
   ...props
}) => (
   <div className="relative z-2 h-6">
      <Nouislider
         range={range}
         start={start}
         step={step}
         tooltips={tooltips}
         connect={connect}
         format={format}
         className="absolute inset-x-0 top-2.5 h-0.5 cursor-pointer bg-white"
         {...props}
      />
      <div className="pointer-events-none absolute -inset-x-2.5 flex justify-between">
         {Array.from({ length: length! }).map((_, i) => (
            <span
               key={i}
               className="size-5 rounded-full bg-darkSoft"
            />
         ))}
      </div>
   </div>
);

SliderPercent.defaultProps = {
   range: {
      min: 0,
      max: 100,
   },
   start: 0,
   step: 25,
   tooltips: true,
   connect: [true, false],
   format: {
      to: val => `${val}%`,
      from: val => +val,
   },
   length: 5,
};
