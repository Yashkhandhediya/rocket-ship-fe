import { useEffect } from 'react';
import { infoIcon } from '../../icons';
import { CustomTooltip } from '../custom-tooltip';

const TextArea = ({
    name,
    label,
    placeHolder = '',
    note = '',
    id,
    value,
    onChange,
    onBlur,
    triggerValidation = false,
    required,
    isDisabled,
    maxLength,
    minLength,
    maxDate,
    showOptional = false,
    labelClassNames = '',
    inputClassNames = '',
    lableAddOn = '',
    leftAddOn = '',
    rightAddOn = '',
    counterField,
    tooltip,
    rows = 3
}) => {
    useEffect(() => {
        if (triggerValidation && onBlur) {
            onBlur();
        }
    }, [triggerValidation, value]);

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
                        <CustomTooltip text={tooltip}>
                            <img src={infoIcon} className="ms-2" />
                        </CustomTooltip>
                    )}
                </label>
            )}
            <div className="flex ">
                <textarea
                    name={name || id}
                    id={id}
                    value={value}
                    onChange={onChange}
                    disabled={isDisabled}
                    onWheel={(e) => e.target.blur()}
                    className={`block min-h-[36px] w-full rounded-md border 
          ${leftAddOn && 'rounded-l-none rounded-r-md'} ${rightAddOn && 'rounded-l-md rounded-r-none'} ${counterField && 'rounded-none text-center'
                        } border-gray-300 px-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 disabled:bg-neutral-300 ${inputClassNames} `}
                    placeholder={placeHolder}
                    required={required}
                    onBlur={onBlur}
                    max={maxDate || ''}
                    maxLength={maxLength}
                    minLength={minLength}
                    rows={rows}
                />
            </div>
            {note && <p className="mt-1 whitespace-pre-wrap text-[10px] leading-4 text-gray-400">{note}</p>}
        </div>
    );
};

export default TextArea;
