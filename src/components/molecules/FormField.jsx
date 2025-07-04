import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';

const FormField = ({ 
  label, 
  id, 
  required = false, 
  error, 
  className = '', 
  ...inputProps 
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <Input id={id} error={!!error} {...inputProps} />
      {error && (
        <p className="text-error text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;