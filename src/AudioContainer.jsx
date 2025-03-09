import React, { useRef, useState, useEffect } from "react";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./AudioContainer.css";

function AudioContainer({
  currentSong,
  isPlaying,
  fileUrl,
  onTogglePlayPause,
  onNextSong,
  onPrevSong,
  shuffle,
  onToggleShuffle,
  repeatMode,
  onToggleRepeat
}) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [liked, setLiked] = useState(false);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update audio source and playback when fileUrl or isPlaying change.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && fileUrl) {
      if (audio.src !== fileUrl) {
        audio.src = fileUrl;
      }
      if (isPlaying) {
        audio.play().catch(err => console.error("Playback error:", err));
      } else {
        audio.pause();
      }
    }
  }, [fileUrl, isPlaying]);

  // Automatically play next song when current song ends.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      if (onNextSong) onNextSong();
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [onNextSong]);

  const updateProgress = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));

  const volumeIcon = () => {
    if (volume === 0) return <VolumeOffIcon />;
    if (volume < 0.5) return <VolumeDownIcon />;
    return <VolumeUpIcon />;
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.error("Playback error:", err));
    }
    onTogglePlayPause();
  };

  return (
    <div className="audio-container">
      <audio
        ref={audioRef}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={handleLoadedMetadata}
        loop={repeatMode === 2}
      />
      <div className="playback-controls">
        <div className="left-section">
          <button onClick={() => setLiked(!liked)} className="control-btn-like-btn">
            {liked ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
          </button>
        </div>
        <div className="center-section">
          <button onClick={onToggleShuffle} className={`control-btn ${shuffle ? "active" : ""}`}>
            <ShuffleIcon />
          </button>
          <button onClick={onPrevSong} className="control-btn">
            <SkipPreviousIcon />
          </button>
          <button onClick={togglePlayPause} className="control-btn play-btn">
            {isPlaying ? <PauseCircleIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </button>
          <button onClick={onNextSong} className="control-btn">
            <SkipNextIcon />
          </button>
          <button onClick={onToggleRepeat} className="control-btn">
            {repeatMode === 0 ? (
              <RepeatIcon />
            ) : repeatMode === 1 ? (
              <RepeatIcon color="primary" />
            ) : (
              <RepeatOneIcon color="primary" />
            )}
          </button>
        </div>
        <div className="right-section">
          <div className="volume-control">
            <div className="volume-icon">{volumeIcon()}</div>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
      <div className="progress-container">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          className="progress-bar"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => {
            const audio = audioRef.current;
            if (audio) {
              audio.currentTime = (parseFloat(e.target.value) / 100) * duration;
            }
          }}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default AudioContainer;
