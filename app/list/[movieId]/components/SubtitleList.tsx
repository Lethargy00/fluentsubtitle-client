import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './SubtitleList.module.css';

// Make an interface for the subtitles.
interface Subtitle {
    user: string;
    language: string;
    emoji: string;
    uploadDate: string;
    totalDownloads: number;
}   

// Create an array with fake subtitles.
const subtitles: Subtitle[] = [
{
    user: "Markus098",
    language: "English",
    emoji: "🇬🇧",
    uploadDate: "2024-04-01",
    totalDownloads: 12000,
},
{
    user: "Darwin954",
    language: "Spanish",
    emoji: "🇪🇸",
    uploadDate: "2024-04-02",
    totalDownloads: 8500,
},
{
    user: "Philip546",
    language: "French",
    emoji: "🇫🇷",
    uploadDate: "2024-04-03",
    totalDownloads: 5000,
},
{
    user: "Alice123",
    language: "German",
    emoji: "🇩🇪",
    uploadDate: "2024-04-04",
    totalDownloads: 7000,
},
{
    user: "Bob456",
    language: "Italian",
    emoji: "🇮🇹",
    uploadDate: "2024-04-05",
    totalDownloads: 6000,
},
{
    user: "Charlie789",
    language: "Portuguese",
    emoji: "🇵🇹",
    uploadDate: "2024-04-06",
    totalDownloads: 4500,
},
{
    user: "Diana000",
    language: "Russian",
    emoji: "🇷🇺",
    uploadDate: "2024-04-07",
    totalDownloads: 3000,
},
{
    user: "Eva999",
    language: "Chinese",
    emoji: "🇨🇳",
    uploadDate: "2024-04-08",
    totalDownloads: 2500,
},
{
    user: "Frank888",
    language: "Japanese",
    emoji: "🇯🇵",
    uploadDate: "2024-04-09",
    totalDownloads: 2000,
},
{
    user: "Grace666",
    language: "Korean",
    emoji: "🇰🇷",
    uploadDate: "2024-04-10",
    totalDownloads: 1500,
},
];
   
function renderSubtitles(subtitles: Subtitle[]) {
    return subtitles.map((subtitle, index) => (
        <div key={index} className={styles.individualContainer}>
            <div>                
                <span><FontAwesomeIcon icon={faUser} /> {subtitle.user}</span>
                <span>{subtitle.uploadDate} <FontAwesomeIcon icon={faCalendarAlt} /></span>
            </div>
            <div>
                <span>{subtitle.emoji} {subtitle.language}</span>
                <span className={styles.download}>{subtitle.totalDownloads} <FontAwesomeIcon icon={faDownload} /></span>
            </div>
        </div>
    ));
}
   
const SubtitleList = () => {
  return (
    <div className={styles.container}>
        {renderSubtitles(subtitles)}
    </div>
  )
}

export default SubtitleList