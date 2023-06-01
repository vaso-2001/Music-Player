import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay , faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'
import { playAudio } from '../data'
const Player=({setSongs,setCurrentSong,songs,currentSong,isPlaying,setIsPlaying,audioRef, setSongInfo,songInfo})=> {
  const activeLibraryHandler=(nextPrev)=>{
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }
  const playSongHandler=()=>{
    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(!isPlaying)
    }else{
      audioRef.current.play();
      setIsPlaying(!isPlaying)
    }
  }
  const getTime=(time)=>{
    return(
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    )
  }
  const dragHandler = (e)=>{
    audioRef.current.currentTime = e.target.value
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  const skipTrackHandler=(direction)=>{
    let currentIndex = songs.findIndex((song)=>song.id === currentSong.id)
    if(direction === 'skip-forward'){
      setCurrentSong(songs[(currentIndex + 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    }
    if(direction === 'skip-back'){
      if((currentIndex - 1) % songs.length === -1){
        setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1])
        playAudio(isPlaying,audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
    }
    playAudio(isPlaying,audioRef)
  }

  return (
    <div className='player'>
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
            <p>{songInfo.duration ? getTime(songInfo.duration): '0:00'}</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-back')} size='2x' className='skip-back' icon={faAngleLeft}/>
            <FontAwesomeIcon onClick={playSongHandler} size='2x' className='play' icon={isPlaying ? faPause : faPlay}/>
            <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-forward')} size='2x' className='skip-forward' icon={faAngleRight}/>
        </div>
        
    </div>
  )
}

export default Player