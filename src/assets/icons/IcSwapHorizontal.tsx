export const IcSwapHorizontal = ({
   color = '#F23F5D',
   width = '16',
   height = '16',
}: {
   color?: string;
   width?: string;
   height?: string;
}) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={width}
         height={height}
         viewBox="0 0 24 24"
         fill="none">
         <path
            d="M4 7L9 2L14 7L12.575 8.4L10 5.825L10 13L8 13L8 5.825L5.425 8.4L4 7ZM10 17L11.425 15.6L14 18.175L14 11L16 11L16 18.175L18.575 15.6L20 17L15 22L10 17Z"
            fill={color}
         />
      </svg>
   );
};
