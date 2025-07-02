import { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = 'text', 
  placeholder = '', 
  className = '', 
  error = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 bg-surface border rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";
  
  const stateClasses = error 
    ? "border-error focus:border-error focus:ring-error" 
    : "border-gray-600 focus:border-primary focus:ring-primary hover:border-gray-500";

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={`${baseClasses} ${stateClasses} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;