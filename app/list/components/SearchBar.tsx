// "use client" directive indicates that this component should be treated as a Client Component in Next.js.
"use client";

// Importing necessary React hooks and components.
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { usePerformSearch } from "../../api/search";
import Select from "react-select";
import styles from "./SearchBar.module.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

// Defining an interface for the language options.
interface Language {
  code: string; // Language code.
  label: string; // Language Label.
  flag: JSX.Element; // Emoji representing the language.
}

// Array of languages with their codes, labels, and emojis.
const languages: Language[] = [
  { code: "en", label: "English", flag: <span className="fi fi-gb"></span> },
  { code: "se", label: "Swedish", flag: <span className="fi fi-se"></span> },
  { code: "es", label: "Spanish", flag: <span className="fi fi-es"></span> },
  { code: "fr", label: "French", flag: <span className="fi fi-fr"></span> },
  { code: "de", label: "German", flag: <span className="fi fi-de"></span> },
  { code: "it", label: "Italian", flag: <span className="fi fi-it"></span> },
  { code: "ru", label: "Russian", flag: <span className="fi fi-ru"></span> },
  { code: "zh", label: "Chinese", flag: <span className="fi fi-cn"></span> },
  { code: "ja", label: "Japanese", flag: <span className="fi fi-jp"></span> },
  { code: "ko", label: "Korean", flag: <span className="fi fi-kr"></span> },
  { code: "ar", label: "Arabic", flag: <span className="fi fi-sa"></span> },
  { code: "sw", label: "Swahili", flag: <span className="fi fi-tz"></span> },
  {
    code: "pt",
    label: "Portuguese",
    flag: <span className="fi fi-pt"></span>,
  },
  { code: "nl", label: "Dutch", flag: <span className="fi fi-nl"></span> },
  { code: "hi", label: "Hindi", flag: <span className="fi fi-in"></span> },
  { code: "bn", label: "Bengali", flag: <span className="fi fi-bn"></span> },
];

// Mapping the languages array to the format expected by the Select component.
const languageOptions = languages.map((lang) => ({
  value: lang.code, // Value used by the Select component.
  label: lang.flag, // Label displayed in the dropdown.
}));

// SearchBar component definition.
const SearchBar: React.FC = () => {
  // useState hooks
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
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
    setSearchQuery(event.target.value); // Updates the search query state.
  };

  const { performSearch } = usePerformSearch(
    searchQuery,
    selectedLanguage.value
  );

  // Rendering the SearchBar component.
  return (
    <div className={styles.searchBar}>
      {/* Select component for choosing a language. */}
      <Select
        value={selectedLanguage} // Current selected language.
        options={languageOptions} // Options to choose from.
        onChange={handleLanguageChange} // Handler for when the selection changes.
        className={styles.dropDown} // CSS class for styling.
        isSearchable={false} // Removes search function.
        components={customComponents} // Override the DropdownIndicator to remove the arrow.
      />

      {/* Input field for search. */}
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput} // CSS class for styling.
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      {/* Icon for the search input. */}
      <button onClick={performSearch} className={styles.searchIcon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

// Exporting the SearchBar component.
export default SearchBar;
