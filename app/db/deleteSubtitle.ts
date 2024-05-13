import { openDB } from "idb";
import { Subtitle } from "../interfaces/subtitle";

export const deleteSubtitle = async (movieId: string, subtitleId: string) => {
  try {
    const db = await openDB("subtitlesDB", 1);
    const transaction = db.transaction("subtitles", "readwrite");
    const objectStore = transaction.objectStore("subtitles");
    const storedSubtitles = await objectStore.get(movieId);

    if (storedSubtitles) {
      const subtitleIndex = storedSubtitles.subtitles.findIndex(
        (subtitle: Subtitle) => subtitle.id === subtitleId
      );

      if (subtitleIndex !== -1) {
        storedSubtitles.subtitles.splice(subtitleIndex, 1);
        await objectStore.put(storedSubtitles);
      }
    }
  } catch (error) {
    console.error("Error opening database or starting transaction: ", error);
  }
};
