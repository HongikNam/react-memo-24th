import React from 'react';

type ButtonSize = 'scb' | 'md';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: ButtonSize;
}

const SIZES: Record<ButtonSize, string> = {
  scb: "h-20 w-20 flex items-center justify-center", 
  md: "h-8 w-8 flex items-center justify-center",   
};

const BASE_STYLE = "bg-transparent transition-transform active:scale-95";

export default function Button({
  children,
  size = 'scb',        
  disabled = false,
  className = '', 
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${BASE_STYLE} ${SIZES[size]} ${className} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}


