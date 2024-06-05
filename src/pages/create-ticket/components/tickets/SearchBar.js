import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleFocused = () => {
    setIsFocused(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
    setIsFocused(false);
  };
  return (
    <form className="my-4 flex w-1/3 items-center gap-2 rounded-lg border bg-white px-3 py-1 text-[12px]">
      <FontAwesomeIcon icon={faSearch} className=" text-gray-500" />
      <input
        type="text"
        placeholder="Search By Ticket ID, AWB, Pickup ID"
        value={searchText}
        onChange={(e) => handleSearch(e)}
        onFocus={handleFocused}
        className="text-semibold m-0 w-full border-transparent p-0 text-[12px] focus:border-transparent focus:outline-none focus:ring-0"
      />
      {isFocused && (
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer text-lg text-gray-500"
          onClick={clearSearch}
        />
      )}
    </form>
  );
}

export default SearchBar;
