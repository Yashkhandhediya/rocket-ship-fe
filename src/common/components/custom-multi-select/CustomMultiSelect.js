import Select, { components } from 'react-select';

const CustomMultiSelect = ({
  onChange,
  id,
  isMulti = true,
  options,
  label,
  placeholder,
  isSearchable = false,
  value,
  displayValuesAsStrings,
  displayCountAsValue,
  displayCountAsValueLabel,
  renderCustomDisplayValue,
  selected,
  menuPlacement = 'auto',
  CustomDropdownIndicator,
  closeMenuOnSelect = false,
}) => {
  const renderCustomValue = (props) => {
    return <components.SingleValue {...props}>{renderCustomDisplayValue(selected)}</components.SingleValue>;
  };
  const renderCustomIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>{<CustomDropdownIndicator />}</components.DropdownIndicator>
    );
  };

  return (
    <>
      <label className="mb-2 flex items-center  text-xs font-medium text-gray-600">{label}</label>
      <Select
        isMulti={isMulti}
        id={id}
        isSearchable={isSearchable}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={placeholder}
        options={options}
        value={value}
        menuPlacement={menuPlacement}
        onChange={(select) => (isMulti ? onChange(select.map((obj) => obj.value)) : onChange(select.value))}
        components={{
          IndicatorSeparator: null,
          ...(displayValuesAsStrings ? { MultiValueContainer: () => selected?.join(', ') } : {}),
          ...(displayCountAsValue
            ? { MultiValueContainer: () => `${selected?.length} ${displayCountAsValueLabel}` }
            : {}),
          ...(renderCustomDisplayValue ? { SingleValue: renderCustomValue } : {}),
          ...(CustomDropdownIndicator ? { DropdownIndicator: renderCustomIndicator } : {}),
        }}
        styles={{
          control: (styles) => ({
            ...styles,
            fontSize: '12px',
          }),
          option: (styles) => ({
            ...styles,
            fontSize: '12px',
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
