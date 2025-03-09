import { API } from "./config";

export const fetchAllSongs = async () => {
  const response = await fetch(API.allSongs);
  if (!response.ok) throw new Error("Failed to fetch songs");
  const data = await response.json();
  // Map artistName to artist for SongTable usage
  return data.map(item => ({
    ...item,
    artist: item.artistName
  }));
};
