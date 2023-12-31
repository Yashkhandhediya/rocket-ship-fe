import Select from 'react-select';

const CustomMultiSelect = ({
  onChange,
  id,
  options,
  label,
  placeholder,
  displayValuesAsStrings,
  displayCountAsValue,
  displayCountAsValueLabel,
  selected = [],
}) => {

  return (
    <>
      <label className="mb-2 flex items-center  text-xs font-medium text-gray-600">{label}</label>
      <Select
        isMulti
        id={id}
        closeMenuOnSelect={false}
        placeholder={placeholder}
        options={options}
        onChange={(select) => onChange(select.map((obj) => obj.value))}
        components={{
          IndicatorSeparator: null,
          ...(displayValuesAsStrings ? { MultiValueContainer: () => selected?.join(', ') } : {}),
          ...(displayCountAsValue
            ? { MultiValueContainer: () => `${selected?.length} ${displayCountAsValueLabel}` }
            : {}),
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
