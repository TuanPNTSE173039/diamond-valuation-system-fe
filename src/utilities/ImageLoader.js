import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebaseConfig.js";

export const loadImageByPath = async (imagePath, setLoadedImageUrl) => {
  const imageRef = ref(storage, imagePath);
  try {
    const url = await getDownloadURL(imageRef);
    setLoadedImageUrl(url);
  } catch (error) {
    console.error("Error loading image by path:", error);
  }
};
