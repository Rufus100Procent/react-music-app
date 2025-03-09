import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import AudioContainer from "./AudioContainer";
import SongTable from "./SongTable";
import { LIST_ALL_SONGS, GET_SONG_FILE } from "./config";

function App() {
  const [songs, setSongs] = useState([]);
  // currentSong: { id, fileUrl }
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);

  // Fetch the list of songs once at mount.
  const fetchSongs = () => {
    fetch(LIST_ALL_SONGS)
      .then((response) => response.json())
      .then((data) => {
        // Map backend artistName to artist for our UI.
        const mappedData = data.map((item) => ({
          ...item,
          artist: item.artistName,
        }));
        setSongs(mappedData);
      })
      .catch((error) => console.error("Error fetching songs:", error));
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Utility: fetch and return a URL for a given song's file.
  const fetchSongFile = (songId) => {
    const url = GET_SONG_FILE.replace("{id}", songId);
    return fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch song file");
        return response.blob();
      })
      .then((blob) => URL.createObjectURL(blob));
  };

  // Global play/pause handler.
  // When songId is null, simply pause.
  // Otherwise, if a new song is selected, fetch its file and update global state.
  const handlePlayPause = (songId, fileUrl) => {
    if (songId === null) {
      setIsPlaying(false);
    } else {
      if (!currentSong || currentSong.id !== songId) {
        const index = songs.findIndex((s) => s.id === songId);
        setCurrentIndex(index);
        if (fileUrl) {
          setCurrentSong({ id: songId, fileUrl });
          setIsPlaying(true);
        } else {
          // Fetch file if not already available.
          fetchSongFile(songId)
            .then((objectUrl) => {
              setCurrentSong({ id: songId, fileUrl: objectUrl });
              setIsPlaying(true);
            })
            .catch((error) => console.error("Error fetching song file:", error));
        }
      } else {
        // Toggle play/pause for the same song.
        setIsPlaying((prev) => !prev);
      }
    }
  };

  // Callback from AudioContainer (e.g. play/pause button in audio controls).
  const handleTogglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Handle next/previous: determine next index, fetch its file, update global state.
  const handleNextSong = () => {
    if (songs.length === 0) return;
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentIndex + 1) % songs.length;
    }
    const nextSong = songs[nextIndex];
    setCurrentIndex(nextIndex);
    fetchSongFile(nextSong.id)
      .then((objectUrl) => {
        setCurrentSong({ id: nextSong.id, fileUrl: objectUrl });
        setIsPlaying(true);
      })
      .catch((error) => console.error("Error fetching next song:", error));
  };

  const handlePrevSong = () => {
    if (songs.length === 0) return;
    let prevIndex;
    if (shuffle) {
      prevIndex = Math.floor(Math.random() * songs.length);
    } else {
      prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    }
    const prevSong = songs[prevIndex];
    setCurrentIndex(prevIndex);
    fetchSongFile(prevSong.id)
      .then((objectUrl) => {
        setCurrentSong({ id: prevSong.id, fileUrl: objectUrl });
        setIsPlaying(true);
      })
      .catch((error) => console.error("Error fetching previous song:", error));
  };

  const handleToggleShuffle = () => setShuffle((prev) => !prev);
  const handleToggleRepeat = () => setRepeatMode((prev) => (prev + 1) % 3);

  return (
    <div className="app-container">
      <Sidebar onSongsClick={fetchSongs} onClearSongs={() => setSongs([])} />
      <div className="main-content">
        <SongTable
          songs={songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      </div>
      <AudioContainer
        currentSong={currentSong}
        isPlaying={isPlaying}
        fileUrl={currentSong ? currentSong.fileUrl : null}
        onTogglePlayPause={handleTogglePlayPause}
        onNextSong={handleNextSong}
        onPrevSong={handlePrevSong}
        shuffle={shuffle}
        onToggleShuffle={handleToggleShuffle}
        repeatMode={repeatMode}
        onToggleRepeat={handleToggleRepeat}
      />
    </div>
  );
}

export default App;
