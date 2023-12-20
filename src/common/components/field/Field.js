import { useEffect } from 'react';
import { infoIcon } from '../../icons';
import { Tooltip } from '../tooltip';

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
  isDisabled,
  maxLength,
  minLength,
  showOptional = false,
  labelClassNames = '',
  inputClassNames = '',
  lableAddOn = '',
  leftAddOn = '',
  rightAddOn = '',
  counterField,
  onIncrease,
  onDecrease,
  tooltip,
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
          className={`mb-2 flex items-center  text-sm font-medium text-gray-600 ${labelClassNames}`}>
          {label}
          {showOptional && <span className="pl-1 text-[10px] text-gray-400">{'(Optional)'}</span>}
          {Boolean(lableAddOn) && lableAddOn}
          {tooltip && (
            <Tooltip text={tooltip}>
              <img src={infoIcon} className="ms-2" />
            </Tooltip>
          )}
        </label>
      )}
      <div className="flex">
        {leftAddOn && (
          <button
            className="z-1 inline-flex flex-shrink-0 items-center rounded-s-md border border-r-0 border-gray-300 bg-[#f3f7fe] px-2.5 py-1.5 text-center text-sm font-medium text-gray-400"
            type="button">
            {leftAddOn}
          </button>
        )}
        {counterField && onDecrease && (
          <button
            type="button"
            className="rounded-s-lg border border-gray-300 bg-[#f3f7fe] px-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
            disabled={value < 1}
            onClick={onDecrease}>
            -
          </button>
        )}
        <input
          type={type}
          name={name || id}
          id={id}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          className={`block min-h-[36px] w-full rounded-md border 
          ${leftAddOn && 'rounded-l-none rounded-r-md'} ${rightAddOn && 'rounded-l-md rounded-r-none'} ${
            counterField && 'rounded-none text-center'
          } border-gray-300 px-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-neutral-300 ${inputClassNames} ${
             type === 'number'
               ? '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
               : ''
           }`}
          placeholder={placeHolder}
          required={required}
          onBlur={onBlur}
          maxLength={maxLength}
          minLength={minLength}
        />
        {counterField && onIncrease && (
          <button
            type="button"
            className="rounded-e-lg border border-gray-300 bg-[#f3f7fe] px-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
            onClick={onIncrease}>
            +
          </button>
        )}
        {rightAddOn && (
          <button
            className="z-1 inline-flex flex-shrink-0 items-center rounded-e-md border border-l-0 border-gray-300 bg-[#f3f7fe] px-2.5 py-1.5 text-center text-sm font-medium text-gray-400"
            type="button">
            {rightAddOn}
          </button>
        )}
      </div>
      {note && <p className="mt-1 whitespace-pre-wrap text-[10px] leading-4 text-gray-400">{note}</p>}
    </div>
  );
};

export default Field;
