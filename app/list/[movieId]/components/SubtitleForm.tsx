// Import necessary modules and components.
import Select from "react-select";
import style from "./SubtitleForm.module.css";
import { languages } from "@/app/constants/languages";
import { Subtitle } from "@/app/interfaces/subtitle";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Define the props interface for the SubtitleForm component.
interface SubtitleFormProps {
  onFormClose: () => void;
  movieId: string;
  addSubtitleHandler: (newSubtitle: Subtitle) => void;
}

// Define the SubtitleForm component.
const SubtitleForm: React.FC<SubtitleFormProps> = ({
  onFormClose,
  addSubtitleHandler,
}) => {
  // State variables for form inputs.
  const [uploaderName, setUploaderName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isForHearingImpaired, setIsForHearingImpaired] = useState(false);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    uploaderName: "",
    subtitleFile: "",
    general: "",
  });

  // Handle language selection change.
  const handleLanguageChange = (selectedOption: any) => {
    setSelectedLanguage(selectedOption);
  };

  // Validate form inputs.
  const validateForm = () => {
    let newErrors: {
      uploaderName: string;
      subtitleFile: string;
      general: string;
    } = {
      uploaderName: "",
      subtitleFile: "",
      general: "",
    };

    if (uploaderName.trim() === "") {
      newErrors.uploaderName = "Username is required";
    }

    if (!subtitleFile) {
      newErrors.subtitleFile = "Subtitle file is required";
    } else {
      const fileSizeLimit = 10 * 1024 * 1024; // 10 MB
      if (subtitleFile.size > fileSizeLimit) {
        newErrors.subtitleFile =
          "Subtitle file size exceeds the limit of 10 MB";
      }

      const fileNameLengthLimit = 255;
      if (subtitleFile.name.length > fileNameLengthLimit) {
        newErrors.subtitleFile = "Subtitle file name is too long";
      }
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  // Handle subtitle file selection.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSubtitleFile(e.target.files[0]);
    } else {
      setSubtitleFile(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      if (subtitleFile) {
        const formData = new FormData();
        formData.append("subtitleFile", subtitleFile);

        try {
          const fileExtension = subtitleFile.name.split(".").pop();
          if (fileExtension !== "srt") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              subtitleFile: "Invalid file format. Only.srt files are allowed.",
            }));
            return;
          }

          const subtitleId = `${uuidv4()}`;

          // Create a new subtitle object.
          const subtitleData: Subtitle = {
            id: subtitleId,
            uploaderName: uploaderName,
            language: selectedLanguage.value,
            isForHearingImpaired: isForHearingImpaired,
            uploadedDate: new Date().toISOString(),
            downloadCount: 0,
            subtitleFile: subtitleFile,
            subtitleFileName: subtitleFile.name,
            subtitleFileSize: subtitleFile.size,
            subtitleFileType: fileExtension || "",
          };

          // Call the addSubtitleHandler function with the new subtitle data.
          addSubtitleHandler(subtitleData);

          // Close the form.
          onFormClose();
        } catch (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "An error occurred while saving the subtitle data.",
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          subtitleFile: "Subtitle file is required",
        }));
      }
    }
  };

  // Render the form.
  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <h2 className={style.headerText}>Upload subtitle</h2>
      {errors.general && <p className={style.error}>{errors.uploaderName}</p>}
      {errors.uploaderName && (
        <p className={style.error}>{errors.uploaderName}</p>
      )}
      <input
        type="text"
        placeholder="Username"
        className={style.uploaderName}
        value={uploaderName}
        onChange={(e) => setUploaderName(e.target.value)}
        aria-label="Enter your username"
      />

      <Select
        value={selectedLanguage}
        className={style.dropDown}
        options={languages}
        onChange={handleLanguageChange}
        isSearchable={false}
        aria-label="Select the language of the subtitle"
      />
      <label>
        <input
          type="checkbox"
          checked={isForHearingImpaired}
          onChange={(e) => setIsForHearingImpaired(e.target.checked)}
          aria-label="Check this box if the subtitle is for hearing impaired"
        />
        For Hearing Impaired
      </label>

      {errors.subtitleFile && (
        <p className={style.error}>{errors.subtitleFile}</p>
      )}

      <input
        type="file"
        accept=".srt"
        onChange={handleFileChange}
        aria-label="Select the subtitle file"
      />
      <div className={style.buttonContainer}>
        <button
          type="submit"
          className={style.upload}
          aria-label="Submit the form"
        >
          Upload
        </button>
        <button type="button" onClick={onFormClose} aria-label="Close the form">
          Cancel
        </button>
      </div>
    </form>
  );
};

// Export the SubtitleForm component.
export default SubtitleForm;
