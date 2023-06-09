import React, { useState,useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import './styles/app.scss'
import data from './util'
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {

  const audioRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })
  const [libraryStatus,setLibraryStatus] = useState(false)

  const timeUpdateHandler=(e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo,currentTime: current, duration})
  }
  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Library libraryStatus={libraryStatus}  setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} />
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} ></audio>
    </div>
  );
}

export default App;
