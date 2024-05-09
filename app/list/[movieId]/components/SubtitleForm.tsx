import { openDB } from "idb";
import { useState } from "react";

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
  subtitleFile: File;
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
      subtitleFile: subtitleData.subtitleFile,
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
          subtitleFile: subtitleData.subtitleFile,
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
  const [language, setLanguage] = useState("Unknown");
  const [isForHearingImpaired, setIsForHearingImpaired] = useState(false);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (subtitleFile) {
      const formData = new FormData();
      formData.append("subtitleFile", subtitleFile);

      try {
        const subtitleData: Subtitle = {
          id: "",
          uploaderName: uploaderName,
          language: language,
          isForHearingImpaired: isForHearingImpaired,
          uploadedDate: new Date().toISOString(),
          subtitleFile: subtitleFile,
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
      <label>
        Language:
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </label>
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
