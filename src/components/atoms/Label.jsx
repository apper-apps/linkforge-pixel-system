const Label = ({ children, htmlFor, required = false, className = '' }) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-200 mb-2 ${className}`}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
};

export default Label;