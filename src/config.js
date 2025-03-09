export const SONG_BASE_URL = "http://localhost:8080/api/v1/songs";
export const LIKED_BASE_URL = "http://localhost:8080/api/v0/liked";
export const PLAYLIST_BASE_URL = "http://localhost:8080/api/v0/playlists";


export const LIST_ALL_SONGS = `${SONG_BASE_URL}`;
export const GET_SONG_FILE = `${SONG_BASE_URL}/{id}/file`;
export const DELETE_SONG = `${SONG_BASE_URL}/{id}`; //  -- not used
export const EDIT_SONG = `${SONG_BASE_URL}/{id}/edit`;  //  -- not used
export const UPLOAD_SONG = `${SONG_BASE_URL}/{id}/upload`; // -- not used
export const DOWNLOAD_SONG = `${SONG_BASE_URL}/{id}/download`;


// un used API
export const GET_ALL_PLAYLIST = `${PLAYLIST_BASE_URL}`; // GET
export const CREATE_NEW_PLAYLIST = `${PLAYLIST_BASE_URL}`; // POST
export const ADD_SONG_TO_PLAYLIST = `${PLAYLIST_BASE_URL}/{playlistId}/songs/{songId}`; // POST
export const REMOVE_SONG_FROM_PLAYLIST = `${PLAYLIST_BASE_URL}/{playlistId}/songs/{songId}`;  //DELETE
export const LIST_SONGS_IN_PLAYLIST = `${PLAYLIST_BASE_URL}/{playlistId}/songs`; // GET


export const LIKE_SONG = `${LIKED_BASE_URL}/{songId}`; // POST
export const UNLIKE_SONG = `${LIKED_BASE_URL}/{songId}`; // DELETE
export const LIST_LIKED_SONGS = `${LIKED_BASE_URL}/{playlistId}/songs/{songId}`; // POST -- not used

