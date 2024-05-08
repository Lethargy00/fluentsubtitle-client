import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./SubtitleList.module.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

// Make an interface for the subtitles.
interface Subtitle {
  user: string;
  language: string;
  flag: JSX.Element;
  uploadDate: string;
  totalDownloads: number;
}

// Create an array with fake subtitles.
const subtitles: Subtitle[] = [
  {
    user: "Markus098",
    language: "English",
    flag: <span className="fi fi-gb"></span>,
    uploadDate: "2024-04-01",
    totalDownloads: 12000,
  },
  {
    user: "Darwin954",
    language: "Spanish",
    flag: <span className="fi fi-es"></span>,
    uploadDate: "2024-04-02",
    totalDownloads: 8500,
  },
  {
    user: "Philip546",
    language: "French",
    flag: <span className="fi fi-fr"></span>,
    uploadDate: "2024-04-03",
    totalDownloads: 5000,
  },
  {
    user: "Alice123",
    language: "German",
    flag: <span className="fi fi-de"></span>,
    uploadDate: "2024-04-04",
    totalDownloads: 7000,
  },
  {
    user: "Bob456",
    language: "Italian",
    flag: <span className="fi fi-it"></span>,
    uploadDate: "2024-04-05",
    totalDownloads: 6000,
  },
  {
    user: "Charlie789",
    language: "Portuguese",
    flag: <span className="fi fi-pt"></span>,
    uploadDate: "2024-04-06",
    totalDownloads: 4500,
  },
  {
    user: "Diana000",
    language: "Russian",
    flag: <span className="fi fi-ru"></span>,
    uploadDate: "2024-04-07",
    totalDownloads: 3000,
  },
  {
    user: "Eva999",
    language: "Chinese",
    flag: <span className="fi fi-cn"></span>,
    uploadDate: "2024-04-08",
    totalDownloads: 2500,
  },
  {
    user: "Frank888",
    language: "Japanese",
    flag: <span className="fi fi-jp"></span>,
    uploadDate: "2024-04-09",
    totalDownloads: 2000,
  },
  {
    user: "Grace666",
    language: "Korean",
    flag: <span className="fi fi-kr"></span>,
    uploadDate: "2024-04-10",
    totalDownloads: 1500,
  },
];

function renderSubtitles(subtitles: Subtitle[]) {
  return subtitles.map((subtitle, index) => (
    <div key={index} className={styles.individualContainer}>
      <div>
        <span>
          <FontAwesomeIcon icon={faUser} /> {subtitle.user}
        </span>
        <span>
          {subtitle.uploadDate} <FontAwesomeIcon icon={faCalendarAlt} />
        </span>
      </div>
      <div>
        <span>
          {subtitle.flag} {subtitle.language}
        </span>
        <span className={styles.download}>
          {subtitle.totalDownloads} <FontAwesomeIcon icon={faDownload} />
        </span>
      </div>
    </div>
  ));
}

const SubtitleList = () => {
  return <div className={styles.container}>{renderSubtitles(subtitles)}</div>;
};

export default SubtitleList;
