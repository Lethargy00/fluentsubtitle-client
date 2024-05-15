import Select from "react-select";
import style from "./SubtitleForm.module.css";
import { languages } from "@/app/constants/languages";
import { Subtitle } from "@/app/interfaces/subtitle";
import { addSubtitle } from "@/app/db/addSubtitle";
import { useState } from "react";

interface SubtitleFormProps {
  onFormClose: () => void;
  movieId: string;
  addSubtitleHandler: (newSubtitle: Subtitle) => void;
}

const SubtitleForm: React.FC<SubtitleFormProps> = ({
  onFormClose,
  movieId,
  addSubtitleHandler,
}) => {
  const [uploaderName, setUploaderName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isForHearingImpaired, setIsForHearingImpaired] = useState(false);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    uploaderName: "",
    subtitleFile: "",
  });

  const handleLanguageChange = (selectedOption: any) => {
    setSelectedLanguage(selectedOption);
  };

  const validateForm = () => {
    let newErrors: { uploaderName: string; subtitleFile: string } = {
      uploaderName: "",
      subtitleFile: "",
    };

    if (uploaderName.trim() === "") {
      newErrors.uploaderName = "Username is required";
    }

    if (!subtitleFile) {
      newErrors.subtitleFile = "Subtitle file is required";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSubtitleFile(e.target.files[0]);
    } else {
      setSubtitleFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      if (subtitleFile) {
        const formData = new FormData();
        formData.append("subtitleFile", subtitleFile);

        try {
          console.log("File name:", subtitleFile.name); // Log the file name
          const fileExtension = subtitleFile.name.split(".").pop();
          console.log("File extension:", fileExtension); // Log the extracted file extension

          const subtitleData: Subtitle = {
            id: Date.now().toString(), // Generate a unique ID for the subtitle
            uploaderName: uploaderName,
            language: selectedLanguage.value,
            isForHearingImpaired: isForHearingImpaired,
            uploadedDate: new Date().toISOString(),
            subtitleFileName: subtitleFile.name,
            subtitleFileSize: subtitleFile.size,
            subtitleFileType: fileExtension || "",
          };

          addSubtitleHandler(subtitleData);

          onFormClose();
        } catch (error) {
          console.error("Error saving subtitle data to IndexedDB", error);
        }
      } else {
        console.error("No subtitle file selected");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <h2 className={style.headerText}>Upload subtitle</h2>
      {errors.uploaderName && (
        <p className={style.error}>{errors.uploaderName}</p>
      )}
      <input
        type="text"
        placeholder="Username"
        className={style.uploaderName}
        value={uploaderName}
        onChange={(e) => setUploaderName(e.target.value)}
      />

      <Select
        value={selectedLanguage}
        className={style.dropDown}
        options={languages}
        onChange={handleLanguageChange}
        isSearchable={false}
      />
      <label>
        <input
          type="checkbox"
          checked={isForHearingImpaired}
          onChange={(e) => setIsForHearingImpaired(e.target.checked)}
        />
        For Hearing Impaired
      </label>

      {errors.subtitleFile && (
        <p className={style.error}>{errors.subtitleFile}</p>
      )}

      <input type="file" accept=".srt" onChange={handleFileChange} />
      <div className={style.buttonContainer}>
        <button type="submit" className={style.upload}>
          Upload
        </button>
        <button type="button" onClick={onFormClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubtitleForm;
