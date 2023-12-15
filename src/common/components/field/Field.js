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
  leftAddOn = '',
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
      <div className="flex">
        {leftAddOn && (
          <button
            id="dropdown-phone-button"
            data-dropdown-toggle="dropdown-phone"
            className="z-10 inline-flex flex-shrink-0 items-center rounded-s-md border border-r-0 border-gray-300 bg-[#f3f7fe] px-2.5 py-1.5 text-center text-sm font-medium text-gray-400"
            type="button">
            ₹
          </button>
        )}
        <input
          type={type}
          name={name || id}
          id={id}
          value={value}
          onChange={onChange}
          className={`block min-h-[36px] w-full border ${
            leftAddOn ? 'rounded-r-md' : 'rounded-md '
          } border-gray-300 bg-white px-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${inputClassNames}`}
          placeholder={placeHolder}
          required={required}
          onBlur={onBlur}
          maxLength={maxLength}
          minLength={minLength}
        />
      </div>
      {note && (
        <p className="mt-1 whitespace-pre-wrap text-[10px] leading-4 text-gray-400">
          {note}
        </p>
      )}
    </div>
  );
};

export default Field;
