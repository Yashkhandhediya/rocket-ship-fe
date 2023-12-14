import { useEffect } from 'react';

const Field = ({
  name,
  label,
  placeHolder = '',
  note = '',
  type = 'text',
  id,
  value,
  onChange,
  onBlur,
  triggerValidation = false,
  required,
  maxLength,
  minLength,
  showOptional = false,
  labelClassNames = '',
  inputClassNames = '',
}) => {
  useEffect(() => {
    if (triggerValidation && onBlur) {
      onBlur();
    }
  }, [triggerValidation]);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`dark:text-white mb-2 block text-sm font-medium text-gray-600 ${labelClassNames}`}>
          {label}
          {showOptional && (
            <span className="pl-1 text-[10px] text-gray-400">{'(Optional)'}</span>
          )}
        </label>
      )}
      <input
        type={type}
        name={name || id}
        id={id}
        value={value}
        onChange={onChange}
        className={`dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 block min-h-[36px] w-full rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${inputClassNames}`}
        placeholder={placeHolder}
        required={required}
        onBlur={onBlur}
        maxLength={maxLength}
        minLength={minLength}
      />
      {note && (
        <p className="mt-1 whitespace-pre-wrap text-[10px] leading-4 text-gray-400">
          {note}
        </p>
      )}
    </div>
  );
};

export default Field;
