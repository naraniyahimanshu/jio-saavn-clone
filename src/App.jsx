import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import NotFound from "./pages/NotFound";
import MusicContext from "./context/MusicContext";
import { useEffect, useState } from "react";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchedSongs,setSearchedSongs] = useState([])
;
  const playMusic = async (music, name, duration, image, id, primaryArtist) => {
    if (currentSong && currentSong.id === id) {
      if (isPlaying) {
        setIsPlaying(false);
        currentSong.audio.pause();
      } else {
        setIsPlaying(true);
        await currentSong.audio.play();
      }
    } else {
      if (currentSong) {
        currentSong.audio.pause();
        setIsPlaying(false);
      }
      const newAudio = new Audio(music[4].link);
      setCurrentSong({
        name,
        duration,
        image: image[2].link,
        id,
        audio: newAudio,
        primaryArtist,
      });
      setIsPlaying(true);
      console.log(currentSong);
      await newAudio.play();
    }
  };

  const nextSong = () => {
    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);
      if (index === songs.length - 1) {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[0];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      } else {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[index + 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      }
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);
      if (index === 0) {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[songs.length - 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      } else {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[index - 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      }
    }
  };
  return (
    <MusicContext.Provider
      value={{
        songs,
        setSongs,
        playMusic,
        isPlaying,
        currentSong,
        nextSong,
        prevSong,
        setSearchedSongs,
        searchedSongs
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums/:id" element={<AlbumDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MusicContext.Provider>
  );
}
