import React, { useState, useEffect } from 'react';
import RadioIcon from '@mui/icons-material/Radio';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import RestoreIcon from '@mui/icons-material/Restore';
import './Sidebar.css';

function DesktopSidebar({
  handleUploadClick,
  handleFileChange,
  playlists,
  creatingPlaylist,
  newPlaylistName,
  setNewPlaylistName,
  handleCreatePlaylist,
  handleNewPlaylistSubmit,
  onSongsClick,
  onClearSongs
}) {
  return (
    <div className="sidebar desktop">
      <div className="sidebar-header">
        <h2>
          Rift <span>Radio </span> <RadioIcon/> 
        </h2>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-buttons">
          <button className="sidebar-btn" onClick={handleUploadClick}>
            <FileUploadIcon />
            <span>Upload</span>
          </button>
          <input
            type="file"
            id="file-upload-input"
            accept=".mp3,audio/mp3"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="sidebar-btn" onClick={onSongsClick}>
            <LibraryMusicIcon />
            <span>Songs</span>
          </button>
          <button className="sidebar-btn" onClick={onClearSongs}>
            <RestoreIcon />
            <span>Recently Played</span>
          </button>
          <button className="sidebar-btn" onClick={onClearSongs}>
            <FavoriteIcon />
            <span>Liked Songs</span>
          </button>
        </div>
        <div className="playlist-section">
          <div className="playlist-header">
            <span>Playlists</span>
            <button
              className="create-playlist-btn"
              onClick={() => {
                handleCreatePlaylist();
                onClearSongs();
              }}
              title="Create new playlist"
            >
              <CreateIcon />
            </button>
          </div>
          {creatingPlaylist && (
            <form className="create-playlist-form" onSubmit={handleNewPlaylistSubmit}>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="New playlist name"
              />
              <button type="submit">Add</button>
            </form>
          )}
          <div className="playlist-list">
            {playlists.map((playlist, index) => (
              <button key={index} className="playlist-btn">
                {playlist}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSidebar({
  handleUploadClick,
  handleFileChange,
  playlists,
  creatingPlaylist,
  newPlaylistName,
  setNewPlaylistName,
  handleCreatePlaylist,
  handleNewPlaylistSubmit,
  onSongsClick,
  onClearSongs
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(prev => !prev);

  // Wrap an action so that after it runs, the sidebar closes.
  const handleMobileClick = (action) => {
    if (action) action();
    toggle();
  };

  return (
    <>
      <div className="mobile-header">
        <button className="menu-btn" onClick={toggle}>
          <MenuIcon />
        </button>
        <div className="header-title">
          <h2>
            Rift <span>Radio</span>
          </h2>
        </div>
      </div>
      {open && (
        <>
          <div className="mobile-sidebar-overlay" onClick={toggle}></div>
          <div className="mobile-sidebar">
            <div className="sidebar-buttons">
              <button className="sidebar-btn" onClick={() => handleMobileClick(handleUploadClick)}>
                <FileUploadIcon />
                <span>Upload</span>
              </button>
              <input
                type="file"
                id="file-upload-input"
                accept=".mp3,audio/mp3"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button className="sidebar-btn" onClick={() => handleMobileClick(onSongsClick)}>
                <LibraryMusicIcon />
                <span>Songs</span>
              </button>
              <button className="sidebar-btn" onClick={() => handleMobileClick(onClearSongs)}>
                <RestoreIcon />
                <span>Recently Played</span>
              </button>
              <button className="sidebar-btn" onClick={() => handleMobileClick(onClearSongs)}>
                <FavoriteIcon />
                <span>Liked Songs</span>
              </button>
            </div>
            <div className="playlist-section">
              <div className="playlist-header">
                <span>Playlists</span>
                <button
                  className="create-playlist-btn"
                  onClick={() => {
                    handleCreatePlaylist();
                    onClearSongs();
                  }}
                  title="Create new playlist"
                >
                  <CreateIcon />
                </button>
              </div>
              {creatingPlaylist && (
                <form className="create-playlist-form" onSubmit={handleNewPlaylistSubmit}>
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="New playlist name"
                  />
                  <button type="submit">Add</button>
                </form>
              )}
              <div className="playlist-list">
                {playlists.map((playlist, index) => (
                  <button key={index} className="playlist-btn" onClick={toggle}>
                    {playlist}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Sidebar({ onSongsClick, onClearSongs }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [playlists, setPlaylists] = useState([]);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUploadClick = () => {
    document.getElementById('file-upload-input')?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'audio/mpeg') {
      console.log('File selected:', file);
      // Process file as needed.
    } else {
      console.log('Invalid file type');
    }
  };

  const handleCreatePlaylist = () => {
    setCreatingPlaylist(true);
  };

  const handleNewPlaylistSubmit = (e) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      setPlaylists([...playlists, newPlaylistName.trim()]);
      setNewPlaylistName('');
      setCreatingPlaylist(false);
    }
  };

  return isMobile ? (
    <MobileSidebar
      handleUploadClick={handleUploadClick}
      handleFileChange={handleFileChange}
      playlists={playlists}
      creatingPlaylist={creatingPlaylist}
      newPlaylistName={newPlaylistName}
      setNewPlaylistName={setNewPlaylistName}
      handleCreatePlaylist={handleCreatePlaylist}
      handleNewPlaylistSubmit={handleNewPlaylistSubmit}
      onSongsClick={onSongsClick}
      onClearSongs={onClearSongs}
    />
  ) : (
    <DesktopSidebar
      handleUploadClick={handleUploadClick}
      handleFileChange={handleFileChange}
      playlists={playlists}
      creatingPlaylist={creatingPlaylist}
      newPlaylistName={newPlaylistName}
      setNewPlaylistName={setNewPlaylistName}
      handleCreatePlaylist={handleCreatePlaylist}
      handleNewPlaylistSubmit={handleNewPlaylistSubmit}
      onSongsClick={onSongsClick}
      onClearSongs={onClearSongs}
    />
  );
}

export default Sidebar;
