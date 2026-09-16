import React from 'react';

export default function Button({
  children,
  size = 'scb',        
  disabled = false,
  className = '', 
  ...props
}) {
  const sizes = {
    scb: "h-20 w-20 flex items-center justify-center", 
    md: "h-8 w-8 flex items-center justify-center",   
  };
  const baseStyle = "bg-transparent transition-transform active:scale-95";
  return (
    <button
      disabled={disabled}
      className={`${baseStyle} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}



