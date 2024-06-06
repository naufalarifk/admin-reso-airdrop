import { cn } from '@/utils';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface NumberInputProps {
   value?: number;
   onChange: (value: number) => void;
   placeholder?: string;
   className?: string;
}

export const NumberInput = ({
   onChange,
   placeholder = '0.0',
   value,
   className,
   ...props
}: NumberInputProps) => {
   const [inputValue, setInputValue] = useState(value ? value.toString() : '');

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      if (/^-?\d*\.?\d*$/.test(newValue)) {
         setInputValue(newValue);
         if (onChange) {
            onChange(parseFloat(newValue));
         }
      }
   };

   return (
      <div {...props}>
         <input
            type="text"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className={cn(className)}
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
         />
      </div>
   );
};
