import { openDB } from "idb";
import { useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Select from "react-select";

// Defining an interface for the language options.
interface Language {
  value: string; // Language code.
  language: string; // Flag representing the language.
  label: JSX.Element; // Language Label.
}

// Array of languages with their codes, labels, and emojis.
const languages: Language[] = [
  {
    value: "en",
    language: "English",
    label: <span className="fi fi-gb"></span>,
  },
  {
    value: "se",
    language: "Swedish",
    label: <span className="fi fi-se"></span>,
  },
  {
    value: "es",
    language: "Spanish",
    label: <span className="fi fi-es"></span>,
  },
  {
    value: "fr",
    language: "French",
    label: <span className="fi fi-fr"></span>,
  },
  {
    value: "de",
    language: "German",
    label: <span className="fi fi-de"></span>,
  },
  {
    value: "it",
    language: "Italian",
    label: <span className="fi fi-it"></span>,
  },
  {
    value: "ru",
    language: "Russian",
    label: <span className="fi fi-ru"></span>,
  },
  {
    value: "zh",
    language: "Chinese",
    label: <span className="fi fi-cn"></span>,
  },
  {
    value: "ja",
    language: "Japanese",
    label: <span className="fi fi-jp"></span>,
  },
  {
    value: "ko",
    language: "Korean",
    label: <span className="fi fi-kr"></span>,
  },
  {
    value: "ar",
    language: "Arabic",
    label: <span className="fi fi-sa"></span>,
  },
  {
    value: "sw",
    language: "Swahili",
    label: <span className="fi fi-tz"></span>,
  },
  {
    value: "pt",
    language: "Portuguese",
    label: <span className="fi fi-pt"></span>,
  },
  {
    value: "nl",
    language: "Dutch",
    label: <span className="fi fi-nl"></span>,
  },
  {
    value: "hi",
    language: "Hindi",
    label: <span className="fi fi-in"></span>,
  },
  {
    value: "bn",
    language: "Bengali",
    label: <span className="fi fi-bn"></span>,
  },
];

interface SubtitleFormProps {
  onFormClose: () => void;
  movieId: string;
}

interface Subtitle {
  id: string;
  uploaderName: string;
  language: string;
  isForHearingImpaired: boolean;
  uploadedDate: string;
  subtitleFileName: string;
  subtitleFileSize: number;
  subtitleFileType: string;
}

interface Movie {
  id: string;
  subtitles: Subtitle[];
}

const saveSubtitleInIndexedDB = async (
  movieId: string,
  subtitleData: Subtitle
) => {
  const db = await openDB("subtitlesDB", 1, {
    upgrade(db) {
      db.createObjectStore("subtitles", { keyPath: "id" });
    },
  });

  const currentDate = new Date().toISOString();

  const existingMovie: Movie | undefined = await db.get("subtitles", movieId);

  if (existingMovie) {
    const subtitleId = `${movieId}-${existingMovie.subtitles.length + 1}`;
    existingMovie.subtitles.push({
      id: subtitleId,
      uploaderName: subtitleData.uploaderName,
      language: subtitleData.language,
      isForHearingImpaired: subtitleData.isForHearingImpaired,
      uploadedDate: currentDate,
      subtitleFileName: subtitleData.subtitleFileName,
      subtitleFileSize: subtitleData.subtitleFileSize,
      subtitleFileType: subtitleData.subtitleFileType,
    });
    await db.put("subtitles", existingMovie);
  } else {
    await db.add("subtitles", {
      id: movieId,
      subtitles: [
        {
          id: `${movieId}-1`,
          uploaderName: subtitleData.uploaderName,
          language: subtitleData.language,
          isForHearingImpaired: subtitleData.isForHearingImpaired,
          uploadedDate: currentDate,
          subtitleFileName: subtitleData.subtitleFileName,
          subtitleFileSize: subtitleData.subtitleFileSize,
          subtitleFileType: subtitleData.subtitleFileType,
        },
      ],
    });
  }
};

const SubtitleForm: React.FC<SubtitleFormProps> = ({
  onFormClose,
  movieId,
}) => {
  const [uploaderName, setUploaderName] = useState("Unknown");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isForHearingImpaired, setIsForHearingImpaired] = useState(false);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);

  const handleLanguageChange = (selectedOption: any, actionMeta: any) => {
    setSelectedLanguage(selectedOption);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (subtitleFile) {
      const formData = new FormData();
      formData.append("subtitleFile", subtitleFile);

      try {
        console.log("File name:", subtitleFile.name); // Log the file name
        const fileExtension = subtitleFile.name.split(".").pop();
        console.log("File extension:", fileExtension); // Log the extracted file extension

        const subtitleData: Subtitle = {
          id: "",
          uploaderName: uploaderName,
          language: selectedLanguage.value,
          isForHearingImpaired: isForHearingImpaired,
          uploadedDate: new Date().toISOString(),
          subtitleFileName: subtitleFile.name,
          subtitleFileSize: subtitleFile.size,
          subtitleFileType: fileExtension || "",
        };
        saveSubtitleInIndexedDB(movieId, subtitleData);
        onFormClose();
      } catch (error) {
        console.error("Error saving subtitle data to IndexedDB", error);
      }
    } else {
      console.error("No subtitle file selected");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Uploader Name:
        <input
          type="text"
          value={uploaderName}
          onChange={(e) => setUploaderName(e.target.value)}
        />
      </label>
      <Select
        value={selectedLanguage} // Current selected language.
        options={languages} // Options to choose from.
        onChange={handleLanguageChange} // Handler for when the selection changes.
        isSearchable={false} // Removes search function.
      />
      <label>
        For Hearing Impaired:
        <input
          type="checkbox"
          checked={isForHearingImpaired}
          onChange={(e) => setIsForHearingImpaired(e.target.checked)}
        />
      </label>
      <label>
        Subtitle File:
        <input
          type="file"
          accept=".srt"
          onChange={(e) => setSubtitleFile(e.target.files![0])}
        />
      </label>
      <button type="submit">Upload Subtitle</button>
      <button type="button" onClick={onFormClose}>
        Cancel
      </button>
    </form>
  );
};

export default SubtitleForm;
