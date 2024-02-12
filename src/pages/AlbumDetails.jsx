import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MusicContext from "../context/MusicContext";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SongsList from "../components/SongsList";
import SearchSection from "../components/SearchSection";

const AlbumDetails = () => {
  const { setSongs } = useContext(MusicContext);
  const [album, setAlbum] = useState([]);
  const [image, setImage] = useState([]);
  const { id } = useParams();

  const getAlbumDetails = async () => {
    try {
      const res = await axios.get(`https://saavn.dev/albums?id=${id}`);
      const { data } = res.data;
      console.log(data);
      setSongs(data.songs);
      setAlbum(data);
      setImage(getImg(data.image));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getImg = (image) => {
    return (image = image[2].link);
  };

  useEffect(() => {
    getAlbumDetails();
  }, []); // Empty dependency array since we want this to run only once

  return (
    <>
      <Navbar />
      <SearchSection/>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-24 h-screen my-48 lg:my-0 mx-2 lg:mx-auto">
        <div>
          <img
            src={image}
            alt={album.name}
            width={250}
            className="mx-auto mb-4 rounded-lg"
          />
          <div className="w-[250px] text-gray-600">
            <h1>{album.name}</h1>
            <p> By: {album.primaryArtists} ({album.songCount})</p>
          </div>
        </div>
        <div>
          { album.songs?.map((song) => <SongsList key={song.id} {...song} />)
          }
         
        </div>
      </div>
      <Player />
    </>
  );
};

export default AlbumDetails;
