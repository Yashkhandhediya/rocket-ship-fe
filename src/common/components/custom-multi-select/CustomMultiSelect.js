import { Checkbox } from 'flowbite-react';
import Select, { components } from 'react-select';
import { CustomTooltip } from '../custom-tooltip';
import { infoIcon } from '../../icons';
const CustomMultiSelect = ({
  onChange,
  id,
  tooltip,
  isMulti = true,
  options,
  label,
  placeholder,
  isSearchable = false,
  hideSelectedOptions = false,
  displayValuesAsStrings,
  displayCountAsValue,
  displayCountAsValueLabel,
  renderSingleCustomDisplayValue,
  withCheckbox,
  selectAllEnabled,
  selected,
  menuPlacement = 'auto',
  CustomDropdownIndicator,
  closeMenuOnSelect = false,
}) => {
  const selectAllOption = {
    label: 'Select all',
    value: 'selectAll',
  };

  const OptionWithCheckbox = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <Checkbox
            color={'indigo'}
            className={`mr-3 ${props.isDisabled ? 'opacity-60' : ''}`}
            checked={props.isSelected}
            disabled={props.isDisabled}
            onChange={() => null}
          />
          {props.children}
        </components.Option>
      </div>
    );
  };

  const renderCustomSingleValue = (props) => {
    return (
      <components.SingleValue {...props}>{renderSingleCustomDisplayValue(selected)}</components.SingleValue>
    );
  };

  const renderCustomIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>{<CustomDropdownIndicator />}</components.DropdownIndicator>
    );
  };

  const renderDisplayCountAsValue = (props) => {
    const label = `${props.getValue()?.length} ${displayCountAsValueLabel}`;
    return props.index === 0 ? <div>{label}</div> : null;
  };

  const renderDisplayValuesAsStrings = (props) => {
    const valuesSeparator =
      props.selectProps.value.length === props.children?.[0]?._owner.index + 1 ? '' : ',';
    return (
      <components.MultiValueContainer
        {...props}>{`${props.data.label}${valuesSeparator} `}</components.MultiValueContainer>
    );
  };

  const handleSelectChange = (selectedOption, event) => {
    console.log("OPTIONSSSSSSS",selectedOption)
    if (isMulti && withCheckbox) {
      if (selectedOption !== null && selectedOption.length > 0) {
        if (selectedOption[selectedOption.length - 1].value === selectAllOption.value) {
          return onChange(
            isMulti
              ? onChange([selectAllOption, ...options].map((obj) => obj.value))
              : onChange(selectedOption.value),
          );
        }

        let result = [];
        if (selectedOption.length === options.length) {
          if (selectedOption.find((option) => option.value === selectAllOption.value)) {
            result = selectedOption.filter((option) => option.value !== selectAllOption.value);
          } else if (event.action === 'select-option') {
            result = [selectAllOption, ...options];
          }
          return onChange(isMulti ? onChange(result.map((obj) => obj.value)) : onChange(result?.[0].value));
        }
        else{
          result = [selectAllOption, ...options];
          return onChange(isMulti ? onChange(result.map((obj) => obj.value)) : onChange(result?.[0].value));
        }
      }
    }

    return isMulti ? onChange(selectedOption.map((obj) => obj.value)) : onChange(selectedOption.value);
  };

  const checkboxOptionStyles = (state) => {
    if (state.isFocused) {
      return {
        background: '#B2D4FF',
        color: 'inherit',
        ':active': {
          background: 'inherit',
        },
      };
    }

    if (state.isSelected && !state.isDisabled) {
      return {
        background: 'transparent',
        color: 'inherit',
        ':active': {
          background: 'inherit',
        },
      };
    }
    if (state.isSelected && state.isDisabled) {
      return {
        background: 'transparent',
        ':active': {
          background: 'inherit',
        },
      };
    }
    return {};
  };

  return (
    <>
      <label className="mb-2 flex items-center  text-xs font-medium text-gray-600">
        {label}
        {tooltip && (
          <CustomTooltip text={tooltip}>
            <img src={infoIcon} className="ms-2" />
          </CustomTooltip>
        )}
      </label>
      <Select
        isMulti={isMulti}
        id={id}
        isSearchable={isSearchable}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={placeholder}
        options={selectAllEnabled ? [selectAllOption, ...options] : options}
        value={selected}
        hideSelectedOptions={hideSelectedOptions}
        menuPlacement={menuPlacement}
        onChange={handleSelectChange}
        // onChange={(select) => (isMulti ? onChange(select.map((obj) => obj.value)) : onChange(select.value))}
        components={{
          IndicatorSeparator: null,
          ...(withCheckbox ? { Option: OptionWithCheckbox } : {}),
          ...(displayValuesAsStrings ? { MultiValueContainer: renderDisplayValuesAsStrings } : {}),
          ...(displayCountAsValue ? { MultiValue: renderDisplayCountAsValue } : {}),
          ...(renderSingleCustomDisplayValue ? { SingleValue: renderCustomSingleValue } : {}),
          ...(CustomDropdownIndicator ? { DropdownIndicator: renderCustomIndicator } : {}),
        }}
        styles={{
          control: (styles) => ({
            ...styles,
            fontSize: '12px',
          }),
          option: (styles, state) => ({
            ...styles,
            fontSize: '12px',
            ...(withCheckbox ? checkboxOptionStyles(state) : {}),
          }),
          input: (styles) => ({
            ...styles,
            fontSize: '12px',
            width: '0',
          }),
          valueContainer: (styles) => ({
            ...styles,
            fontSize: '12px',
          }),
          multiValue: (styles) => ({
            ...styles,
            ...(displayValuesAsStrings ? { background: 'transparent' } : {}),
          }),
          noOptionsMessage: (styles) => ({
            ...styles,
            fontSize: '12px',
          }),
        }}
      />
    </>
  );
};

export default CustomMultiSelect;
