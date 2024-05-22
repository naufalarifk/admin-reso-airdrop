export const IcArrowBottom = ({ color = '#90A3BF' }: { color?: string }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="16"
         height="16"
         viewBox="0 0 24 24"
         fill="none">
         <path
            d="M5.707 18H17.707V20H5.707V18ZM10.707 4V12.586L6.414 8.293L5 9.707L11.707 16.414L18.414 9.707L17 8.293L12.707 12.586V4H10.707Z"
            fill={color}
         />
      </svg>
   );
};
