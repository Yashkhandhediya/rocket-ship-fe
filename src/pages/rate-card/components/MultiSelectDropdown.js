// src/MultiSelectDropdown.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const MultiSelectDropdown = ({
  options,
  selectedOptions,
  setSelectedOptions,
  selectName,
  fetchFilteredData,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  let [tempSelectedOptions, setTempSelectedOptions] = useState([...selectedOptions]);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    if (tempSelectedOptions.includes(option)) {
      setTempSelectedOptions(tempSelectedOptions.filter((item) => item !== option));
    } else {
      setTempSelectedOptions([...tempSelectedOptions, option]);
    }
  };

  const handleClear = () => {
    setTempSelectedOptions([]);
    setSelectedOptions([]);
    fetchFilteredData(type, (tempSelectedOptions = []));
    setIsOpen(false);
  };

  console.log(tempSelectedOptions);
  const handleApply = () => {
    setSelectedOptions(tempSelectedOptions);
    fetchFilteredData(type, tempSelectedOptions);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-52`}>
      <button
        className="no-wrap hide-scrollbar flex w-full items-center justify-between overflow-hidden  rounded-sm bg-white px-2.5 py-1.5 text-sm"
        onClick={toggleDropdown}>
        <div className="flex h-5 w-full">
          {tempSelectedOptions.length <= 0
            ? selectName
            : tempSelectedOptions.map((option, index) => {
                return index <= 1 ? (
                  <span className="h-full" key={option.id}>
                    {option.type},
                  </span>
                ) : (
                  ''
                );
              })}
        </div>
        <FontAwesomeIcon icon={faCaretDown} className="justify-end" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 h-52 w-full overflow-hidden overflow-y-auto rounded-lg bg-white">
          {options.map((option) => (
            <div key={option.id} className="flex gap-2 px-2 py-2 text-[12px] font-semibold">
              <input
                type="checkbox"
                id={option.id}
                checked={tempSelectedOptions.map((option) => option.type).includes(option.type)}
                onChange={() => handleOptionClick(option)}
              />

              <label htmlFor={option.type}>{option.type}</label>
            </div>
          ))}
          <div className="sticky bottom-0 left-0 z-20 flex justify-end gap-2 border-t bg-white px-2 py-2 text-[13px] font-semibold text-white">
            <button className="rounded-lg bg-blue-400 px-2 py-1 shadow " onClick={handleClear}>
              Clear
            </button>
            <button className="rounded-lg bg-blue-400 px-2 py-1 shadow" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
