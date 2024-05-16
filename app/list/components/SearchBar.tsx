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

// SearchBar component
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

  // Handler function for when the search query changes.
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value); // Update the search query.
  };

  // Handler function for when the search button is clicked.
  const handleSearch = () => {
    onSearch(searchQuery); // Calls the onSearch prop function with the search query.
  };

  // Rendering the SearchBar component.
  return (
    <form className={style.searchBar} aria-label="Search for movie form">
      {/* Select component for choosing a language. */}
      <Select
        aria-label="Select language"
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
        aria-label="Search input for movie"
        className={style.searchInput} // CSS class for styling.
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch(); // Calls the handleSearch function when the enter key is pressed.
          }
        }}
      />
      {/* Icon for the search input. */}
      <button
        onClick={handleSearch}
        className={style.searchIcon}
        aria-label="Start search"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

// Exporting the SearchBar component.
export default SearchBar;
