import { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
  required = false,
  name,
  id,
  'aria-label': ariaLabel,
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      aria-label={ariaLabel}
    />
  );
});

export default Input;

