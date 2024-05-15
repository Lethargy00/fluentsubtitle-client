// Import required modules
import { openDB } from "idb";
import { Subtitle } from "../interfaces/subtitle";

// Function to delete a subtitle from IndexedDB
export const deleteSubtitle = async (movieId: string, subtitleId: string) => {
  try {
    // Open a connection to the IndexedDB database
    const db = await openDB("subtitlesDB", 1);

    // Start a readwrite transaction on the 'subtitles' object store
    const transaction = db.transaction("subtitles", "readwrite");

    // Get the object store
    const objectStore = transaction.objectStore("subtitles");

    // Get the stored subtitles for the given movieId
    const storedSubtitles = await objectStore.get(movieId);

    // If subtitles exist for the movieId
    if (storedSubtitles) {
      // Find the index of the subtitle to be deleted
      const subtitleIndex = storedSubtitles.subtitles.findIndex(
        (subtitle: Subtitle) => subtitle.id === subtitleId
      );

      // If the subtitle exists in the stored subtitles
      if (subtitleIndex !== -1) {
        // Remove the subtitle from the stored subtitles
        storedSubtitles.subtitles.splice(subtitleIndex, 1);

        // Update the stored subtitles in the object store
        await objectStore.put(storedSubtitles);
      }
    }
  } catch (error) {
    // Log any errors that occur during database operations
    console.error("Error opening database or starting transaction: ", error);
  }
};
