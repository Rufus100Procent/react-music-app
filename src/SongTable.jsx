import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { LIKE_SONG, GET_SONG_FILE, DOWNLOAD_SONG } from "./config";
import "./SongTable.css";

function SongRow({ song, currentSong, isPlaying, onPlayPause, onShowPopup, onShowConfirm }) {
  const [liked, setLiked] = useState(song.liked);
  const [processing, setProcessing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  React.useEffect(() => {
    setLiked(song.liked);
  }, [song.liked]);

  const isThisRowPlaying = currentSong && currentSong.id === song.id && isPlaying;

  const handlePlayPauseClick = () => {
    if (isThisRowPlaying) {
      onPlayPause(null, fileUrl); // pause playback
    } else {
      if (!fileUrl) {
        const url = GET_SONG_FILE.replace("{id}", song.id);
        fetch(url)
          .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch song file");
            return response.blob();
          })
          .then((blob) => {
            const objectUrl = URL.createObjectURL(blob);
            setFileUrl(objectUrl);
            onPlayPause(song.id, objectUrl);
          })
          .catch((error) => {
            onShowPopup(`Error playing ${song.songName}: ${error.message}`, 2000);
          });
      } else {
        onPlayPause(song.id, fileUrl);
      }
    }
  };

  const handleToggleLike = () => {
    if (processing) return;
    const newLiked = !liked;
    setProcessing(true);
    const url = LIKE_SONG.replace("{songId}", song.id);
    const method = newLiked ? "POST" : "DELETE";
    fetch(url, { method })
      .then((res) => {
        if (res.ok) {
          setLiked(newLiked);
          onShowPopup(newLiked ? `Liked ${song.songName}` : `Removed like from ${song.songName}`, 1000);
        } else {
          onShowPopup(`Failed to update like for ${song.songName}`, 1000);
        }
      })
      .catch(() => onShowPopup(`Error updating like for ${song.songName}`, 1000))
      .finally(() => setProcessing(false));
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDownload = () => {
    const downloadSong = () => {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = `${song.songName}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onShowPopup(`Downloaded ${song.songName}`, 2000);
    };
    if (!fileUrl) {
      const url = GET_SONG_FILE.replace("{id}", song.id);
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch song file for download");
          return response.blob();
        })
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          setFileUrl(objectUrl);
          downloadSong();
        })
        .catch((error) => {
          onShowPopup(`Error downloading ${song.songName}: ${error.message}`, 2000);
        });
    } else {
      downloadSong();
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    onShowConfirm(song, () => onShowPopup(`Deleted ${song.songName}`, 1500));
    handleMenuClose();
  };

  return (
    <tr className={`song-row ${isThisRowPlaying ? "playing" : ""}`}>
      <td className="controls-cell">
        <IconButton onClick={handlePlayPauseClick} size="large">
          {isThisRowPlaying ? (
            <PauseCircleIcon style={{ color: "#fff", fontSize: "2.5rem" }} />
          ) : (
            <PlayCircleIcon style={{ color: "#fff", fontSize: "2.5rem" }} />
          )}
        </IconButton>
        <IconButton onClick={handleToggleLike} sx={{ ml: 5 }}>
          {liked ? (
            <FavoriteIcon style={{ fontSize: "2rem", color: "red" }} />
          ) : (
            <FavoriteBorderIcon style={{ fontSize: "2rem" }} />
          )}
        </IconButton>
      </td>
      <td>{song.songName}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
      <td>{song.genre}</td>
      <td>{song.releaseYear}</td>
      <td className="options-cell">
        <IconButton onClick={handleMenuClick} size="large">
          <MoreVertIcon style={{ fontSize: "1.8rem" }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleDownload}>
          Download
            <DownloadIcon />
          </MenuItem>
          <MenuItem onClick={handleDelete}>
          Delete  <BackspaceIcon />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onShowPopup(`Edit ${song.songName}`, 1500);
            }}
          >
          Edit  <EditIcon />
          </MenuItem>
        </Menu>
      </td>
    </tr>
  );
}

function SongTable({ songs, currentSong, isPlaying, onPlayPause }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [popup, setPopup] = useState({ visible: false, message: "" });
  const [confirm, setConfirm] = useState({ visible: false, song: null, callback: null });

  const filteredSongs = songs.filter(
    (song) =>
      song.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onShowPopup = (message, duration) => {
    setPopup({ visible: true, message });
    setTimeout(() => setPopup({ visible: false, message: "" }), duration);
  };

  const onShowConfirm = (song, callback) => {
    setConfirm({ visible: true, song, callback });
  };

  const handleConfirmYes = () => {
    if (confirm.callback) confirm.callback();
    setConfirm({ visible: false, song: null, callback: null });
  };

  const handleConfirmNo = () => setConfirm({ visible: false, song: null, callback: null });

  return (
    <div className="song-table-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">
          <SearchIcon />
        </button>
      </div>
      <div className="table-container">
        <table id="songTable">
          <thead>
            <tr>
              <th>Controls</th>
              <th>Song Name</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song, index) => (
                <SongRow
                  key={song.id || index}
                  song={song}
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onPlayPause={onPlayPause}
                  onShowPopup={onShowPopup}
                  onShowConfirm={onShowConfirm}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No songs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {popup.visible && (
        <div className="popup-overlay">
          <div className="popup-message">{popup.message}</div>
        </div>
      )}
      {confirm.visible && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete {confirm.song.songName}?</p>
            <div className="confirm-actions">
              <button onClick={handleConfirmYes}>Yes</button>
              <button onClick={handleConfirmNo}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SongTable;
