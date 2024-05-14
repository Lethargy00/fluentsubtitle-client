"use client";

import Select from "react-select";
import style from "./SearchBar.module.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { languages } from "@/app/constants/languages";
import "/node_modules/flag-icons/css/flag-icons.min.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

// SearchBar component definition.
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // useState hooks
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Handler function for when the selected language changes.
  const handleLanguageChange = (newValue: any, actionMeta: any) => {
    setSelectedLanguage(newValue); // Updates the selected language state.
  };

  // Custom components to remove the dropdown arrow.
  const customComponents = {
    DropdownIndicator: () => null,
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  // Rendering the SearchBar component.
  return (
    <div className={style.searchBar}>
      {/* Select component for choosing a language. */}
      <Select
        value={selectedLanguage} // Current selected language.
        options={languages} // Options to choose from.
        onChange={handleLanguageChange} // Handler for when the selection changes.
        className={style.dropDown} // CSS class for styling.
        isSearchable={false} // Removes search function.
        components={customComponents} // Override the DropdownIndicator to remove the arrow.
      />

      {/* Input field for search. */}
      <input
        type="text"
        placeholder="Search..."
        className={style.searchInput} // CSS class for styling.
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }} // Handler for when the enter key is pressed.
      />
      {/* Icon for the search input. */}
      <button onClick={handleSearch} className={style.searchIcon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

// Exporting the SearchBar component.
export default SearchBar;
