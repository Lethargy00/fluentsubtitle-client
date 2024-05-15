// Import required modules
import { openDB } from "idb";
import { Subtitle } from "../interfaces/subtitle";

// Function to add a new subtitle to a movie in IndexedDB
export const addSubtitle = async (movieId: string, newSubtitle: Subtitle) => {
  try {
    // Open a connection to the IndexedDB database
    const db = await openDB("subtitlesDB", 1);

    // Start a readwrite transaction on the 'ubtitles' object store
    const transaction = db.transaction("subtitles", "readwrite");

    // Get the object store
    const objectStore = transaction.objectStore("subtitles");

    // Retrieve the existing subtitles for the given movieId
    const storedSubtitles = await objectStore.get(movieId);

    // If subtitles exist for the movieId, add the new subtitle and update the object store
    if (storedSubtitles) {
      storedSubtitles.subtitles.push(newSubtitle);
      await objectStore.put(storedSubtitles);
    }
    // If no subtitles exist for the movieId, create a new entry with the new subtitle
    else {
      await objectStore.add({ id: movieId, subtitles: [newSubtitle] });
    }
  } catch (error) {
    // Log any errors that occur during database operations
    console.error("Error opening database or starting transaction: ", error);
  }
};
