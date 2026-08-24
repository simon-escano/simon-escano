import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-8 h-8', size }) => {
  return (
    <svg
      width={size || 30}
      height={size ? (size * 29) / 30 : 29}
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="29.8095" height="28.9998" rx="7" fill="#3845C9" />
      <path
        d="M13.834 11.4336L8.14177 12.3412V11.2619C8.14177 10.666 8.62173 10.1065 9.21372 10.012L20.5958 8.19754C21.1878 8.10307 21.6677 8.50982 21.6677 9.10569V10.1847L15.9758 11.0919V17.5678L23.8095 16.3188V14.163L18.1176 15.0706V12.9064L23.8095 11.9992V8.73605C23.7952 6.99201 22.4065 5.79722 20.6789 6.02865L9.13019 7.86985C7.41176 8.18768 6.02885 9.80893 6 11.5474V14.8383L11.6923 13.9307V16.0949L6 17.0025V19.1583L13.834 17.9094V11.4336Z"
        fill="white"
      />
      <path
        d="M23.6259 18.5056C23.1847 19.8323 21.9945 20.9215 20.5954 21.1445L9.21408 22.959C7.81496 23.182 6.62476 22.472 6.18362 21.2863L23.6259 18.5056Z"
        fill="white"
      />
    </svg>
  );
};

export default Logo;
