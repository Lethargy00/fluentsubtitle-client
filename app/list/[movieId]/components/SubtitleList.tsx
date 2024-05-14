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
} from "@fortawesome/free-solid-svg-icons";
import { openDB } from "idb";
import { languages } from "@/app/constants/languages";
import { Subtitle } from "@/app/interfaces/subtitle";
import { addSubtitle } from "@/app/db/addSubtitle";
import { deleteSubtitle } from "@/app/db/deleteSubtitle";
import "/node_modules/flag-icons/css/flag-icons.min.css";

interface SubtitleListProps {
  movieId: string;
}

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

const SubtitleList: React.FC<SubtitleListProps> = ({ movieId }) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [showSubtitleForm, setShowSubtitleForm] = useState(false);

  useEffect(() => {
    console.log("meow");
    const fetchSubtitles = async () => {
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
    };

    fetchSubtitles();
  }, [movieId]);

  const addSubtitleHandler = async (newSubtitle: Subtitle) => {
    await addSubtitle(movieId, newSubtitle);
    const updatedSubtitles = [...subtitles, newSubtitle];
    setSubtitles(updatedSubtitles);
  };

  const deleteSubtitleHandler = async (subtitleId: string) => {
    await deleteSubtitle(movieId, subtitleId);
    const updatedSubtitles = subtitles.filter(
      (subtitle) => subtitle.id !== subtitleId
    );
    setSubtitles(updatedSubtitles);
  };

  return (
    <div className={style.container}>
      <button
        onClick={() => setShowSubtitleForm(true)}
        className={style.addButton}
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
      <div className={style.subtitleContainer}>
        {subtitles.map((subtitle, index) => (
          <div key={index} className={style.individualContainer}>
            <div>
              <span>
                <FontAwesomeIcon icon={faUser} /> {subtitle.uploaderName}
              </span>
              <span>
                {subtitle.uploadedDate.slice(0, 10)}{" "}
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
              <span
                className={style.delete}
                onClick={() => deleteSubtitleHandler(subtitle.id)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
            <div>
              <span>
                {getLanguageInfo(subtitle.language).flag}{" "}
                {getLanguageInfo(subtitle.language).label}
              </span>
              <span className={style.download}>
                0 <FontAwesomeIcon icon={faDownload} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SubtitleList;
