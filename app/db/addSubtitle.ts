import { openDB } from "idb";
import { Subtitle } from "../interfaces/subtitle";

export const addSubtitle = async (movieId: string, newSubtitle: Subtitle) => {
  try {
    const db = await openDB("subtitlesDB", 1);
    const transaction = db.transaction("subtitles", "readwrite");
    const objectStore = transaction.objectStore("subtitles");
    const storedSubtitles = await objectStore.get(movieId);

    if (storedSubtitles) {
      storedSubtitles.subtitles.push(newSubtitle);
      await objectStore.put(storedSubtitles);
    } else {
      await objectStore.add({ id: movieId, subtitles: [newSubtitle] });
    }
  } catch (error) {
    console.error("Error opening database or starting transaction: ", error);
  }
};
