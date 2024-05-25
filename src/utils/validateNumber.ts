export const validateNumber = (value: string | number, defaultValue = 0): number => {
   if (typeof value === 'number') {
      return isNaN(value) ? defaultValue : value;
   }
   if (typeof value === 'string') {
      const number = parseFloat(value);
      return isNaN(number) ? defaultValue : number;
   }
   return defaultValue;
};
