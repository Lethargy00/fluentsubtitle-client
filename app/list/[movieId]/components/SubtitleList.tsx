// Import necessary modules and components.
import style from "./SubtitleList.module.css";
import SubtitleForm from "./SubtitleForm";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faXmark,
  faDownload,
  faCalendarAlt,
  faPlus,
  faDeaf,
} from "@fortawesome/free-solid-svg-icons";
import { openDB } from "idb";
import { languages } from "@/app/constants/languages";
import { Subtitle } from "@/app/interfaces/subtitle";
import { addSubtitle } from "@/app/db/addSubtitle";
import { deleteSubtitle } from "@/app/db/deleteSubtitle";
import "/node_modules/flag-icons/css/flag-icons.min.css";

// Define the props interface for SubtitleList component.
interface SubtitleListProps {
  movieId: string;
}

// Function to get language info based on language code.
const getLanguageInfo = (languageCode: string) => {
  const language = languages.find((lang) => lang.value === languageCode);
  if (language) {
    return {
      flag: language.label,
      value: language.value,
      label: language.language,
    };
  } else {
    return {
      flag: null,
      value: "",
      label: "",
    };
  }
};

// SubtitleList component.
const SubtitleList: React.FC<SubtitleListProps> = ({ movieId }) => {
  // State variables.
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [showSubtitleForm, setShowSubtitleForm] = useState(false);

  // Fetch subtitles from IndexedDB when component mounts.
  useEffect(() => {
    const fetchSubtitles = async () => {
      try {
        const db = await openDB("subtitlesDB", 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("subtitles")) {
              db.createObjectStore("subtitles", { keyPath: "id" });
            }
          },
        });
        const storedSubtitles = await db.get("subtitles", movieId);
        if (storedSubtitles) {
          setSubtitles(storedSubtitles.subtitles);
        }
      } catch (error) {
        console.error("Error fetching subtitles:", error);
      }
    };

    fetchSubtitles();
  }, [movieId]);

  // Handler for adding a new subtitle.
  const addSubtitleHandler = async (newSubtitle: Subtitle) => {
    try {
      await addSubtitle(movieId, newSubtitle);
      const updatedSubtitles = [...subtitles, newSubtitle];
      setSubtitles(updatedSubtitles);
    } catch (error) {
      console.error("Error adding subtitle:", error);
    }
  };

  // Handler for deleting a subtitle.
  const deleteSubtitleHandler = async (subtitleId: string) => {
    try {
      await deleteSubtitle(movieId, subtitleId);
      const updatedSubtitles = subtitles.filter(
        (subtitle) => subtitle.id !== subtitleId
      );
      setSubtitles(updatedSubtitles);
    } catch (error) {
      console.error("Error deleting subtitle:", error);
    }
  };

  // Handler for downloading a subtitle.
  const downloadSubtitleHandler = async (subtitleId: string) => {
    try {
      const db = await openDB("subtitlesDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("subtitles")) {
            db.createObjectStore("subtitles", { keyPath: "id" });
          }
        },
      });

      // Retrieve the subtitle from IndexedDB.
      const storedSubtitles = await db.get("subtitles", movieId);
      if (storedSubtitles) {
        const subtitle = storedSubtitles.subtitles.find(
          (sub: Subtitle) => sub.id === subtitleId
        );
        if (subtitle) {
          // Increment the download count.
          subtitle.downloadCount++;

          // Update the subtitle record in IndexedDB.
          await db.put("subtitles", {
            ...storedSubtitles,
            subtitles: storedSubtitles.subtitles.map((sub: Subtitle) =>
              sub.id === subtitleId ? subtitle : sub
            ),
          });

          // Create a new Blob object from the subtitle file data.
          const blob = new Blob([subtitle.subtitleFile], {
            type: subtitle.subtitleFileType,
          });

          // Generate a download link for the subtitle file.
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = subtitle.subtitleFileName;
          link.click();
        }
      }
    } catch (error) {
      console.error("Error downloading subtitle:", error);
    }
  };

  // Calculate class for subtitle container based on showSubtitleForm state.
  const subtitleContainerClass = showSubtitleForm
    ? `${style.subtitleContainer} ${style.dimmed}`
    : style.subtitleContainer;

  // Render the component.
  return (
    <div className={style.container}>
      <button
        title="Add subtitle"
        onClick={() => setShowSubtitleForm(true)}
        className={style.addButton}
        aria-label="Add Subtitle"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <div className={style.formContainer}>
        {showSubtitleForm && (
          <SubtitleForm
            onFormClose={() => setShowSubtitleForm(false)}
            movieId={movieId}
            addSubtitleHandler={addSubtitleHandler}
          />
        )}
      </div>
      <div className={subtitleContainerClass}>
        {subtitles.map((subtitle, index) => (
          <div key={index} className={style.individualContainer}>
            <div>
              <span aria-label="Username">
                <FontAwesomeIcon icon={faUser} /> {subtitle.uploaderName}
              </span>
              <span aria-label="Upload date">
                {subtitle.uploadedDate.slice(0, 10)}{" "}
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
              <span
                title="Delete subtitle"
                className={style.delete}
                onClick={() => deleteSubtitleHandler(subtitle.id)}
                aria-label="Delete subtitle"
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
            <div className={style.fileInfo}>
              <span>{Math.round(subtitle.subtitleFileSize * 0.000125)} KB</span>
              <span>.{subtitle.subtitleFileType.toLowerCase()}</span>
            </div>
            <div>
              <span>
                {getLanguageInfo(subtitle.language).flag}{" "}
                {subtitle.isForHearingImpaired && (
                  <span
                    title="Is for hearing impaired"
                    className={style.hearingImpaired}
                    aria-label="Is for hearing impaired"
                  >
                    <FontAwesomeIcon icon={faDeaf} />
                  </span>
                )}
                {getLanguageInfo(subtitle.language).label}
              </span>

              <span
                title="Download subtitle"
                className={style.download}
                onClick={() => downloadSubtitleHandler(subtitle.id)}
                aria-label="Download subtitle"
              >
                {subtitle.downloadCount} <FontAwesomeIcon icon={faDownload} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SubtitleList;
