// "use client" directive indicates that this component should be treated as a Client Component in Next.js.
"use client"

// Importing necessary React hooks and components.
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import styles from './SearchBar.module.css';

// Defining an interface for the language options.
interface Language {
  code: string; // Language code.
  label: string; // Language Label.
  emoji: string; // Emoji representing the language.
}

// Array of languages with their codes, labels, and emojis.
const languages: Language[] = [
  { code: 'en', label: 'English', emoji: '🇬🇧' },
  { code: 'se', label: 'Swedish', emoji: '🇸🇪' },
  { code: 'es', label: 'Spanish', emoji: '🇪🇸' },
  { code: 'fr', label: 'French', emoji: '🇫🇷' },
  { code: 'de', label: 'German', emoji: '🇩🇪' },
  { code: 'it', label: 'Italian', emoji: '🇮🇹' },
  { code: 'ru', label: 'Russian', emoji: '🇷🇺' },
  { code: 'zh', label: 'Chinese', emoji: '🇨🇳' },
  { code: 'ja', label: 'Japanese', emoji: '🇯🇵' },
  { code: 'ko', label: 'Korean', emoji: '🇰🇷' },
  { code: 'ar', label: 'Arabic', emoji: '🇸🇦' },
  { code: 'sw', label: 'Swahili', emoji: '🇰🇪' },
  { code: 'pt', label: 'Portuguese', emoji: '🇵🇹' },
  { code: 'nl', label: 'Dutch', emoji: '🇳🇱' },
  { code: 'hi', label: 'Hindi', emoji: '🇮🇳' },
  { code: 'bn', label: 'Bengali', emoji: '🇧🇩' },
  { code: 'es', label: 'Spanish', emoji: '🇪🇸' },
  { code: 'fr', label: 'French', emoji: '🇫🇷' },
  { code: 'de', label: 'German', emoji: '🇩🇪' },
  { code: 'it', label: 'Italian', emoji: '🇮🇹' },
  { code: 'ru', label: 'Russian', emoji: '🇷🇺' },
  { code: 'zh', label: 'Chinese', emoji: '🇨🇳' },
  { code: 'ja', label: 'Japanese', emoji: '🇯🇵' },
  { code: 'ko', label: 'Korean', emoji: '🇰🇷' },
  { code: 'ar', label: 'Arabic', emoji: '🇸🇦' },
  { code: 'sw', label: 'Swahili', emoji: '🇰🇪' },
  { code: 'pt', label: 'Portuguese', emoji: '🇵🇹' },
  { code: 'nl', label: 'Dutch', emoji: '🇳🇱' },
  { code: 'hi', label: 'Hindi', emoji: '🇮🇳' },
  { code: 'bn', label: 'Bengali', emoji: '🇧🇩' },
];

// Mapping the languages array to the format expected by the Select component.
const languageOptions = languages.map(lang => ({
  value: lang.code, // Value used by the Select component.
  label: `${lang.emoji}`, // Label displayed in the dropdown.
}));

// SearchBar component definition.
const SearchBar: React.FC = () => {
  // useState hook to manage the selected language state.
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);

  // Handler function for when the selected language changes.
  const handleLanguageChange = (newValue: any, actionMeta: any) => {
    setSelectedLanguage(newValue); // Updates the selected language state.
  };

  // Custom components to remove the dropdown arrow.
  const customComponents = {
    DropdownIndicator: () => null,
  };

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
      />
      {/* Icon for the search input. */}
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
    </div>
  );
};

// Exporting the SearchBar component.
export default SearchBar;