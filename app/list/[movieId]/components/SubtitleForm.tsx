import { useState } from "react";
import Select from "react-select";
import { languages } from "@/app/constants/languages";
import { Subtitle } from "@/app/interfaces/subtitle";
import { addSubtitle } from "@/app/db/addSubtitle";

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
  const [uploaderName, setUploaderName] = useState("Unknown");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isForHearingImpaired, setIsForHearingImpaired] = useState(false);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);

  const handleLanguageChange = (selectedOption: any) => {
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
          id: Date.now().toString(), // Generate a unique ID for the subtitle
          uploaderName: uploaderName,
          language: selectedLanguage.value,
          isForHearingImpaired: isForHearingImpaired,
          uploadedDate: new Date().toISOString(),
          subtitleFileName: subtitleFile.name,
          subtitleFileSize: subtitleFile.size,
          subtitleFileType: fileExtension || "",
        };
        await addSubtitle(movieId, subtitleData); // Use the addSubtitle function

        addSubtitleHandler(subtitleData);

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
