"use client";

import React, { useEffect, useRef, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { song } from "@/generated/prisma";
import SongList from "@/components/SongList";
import Player from "@/components/Player";

const Home = () => {
  const [songs, setSongs] = useState<song[]>([]);
  const [selectSong, setSelectSong] = useState<song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);

  // state progress
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api");
        const data = await res.json();
        setSongs(data.songs);
      } catch (err) {
        console.log("error: " + err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (audioRef.current && selectSong) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [selectSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioData = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioData);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, [selectSong]);

  // progress bar
  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  const handleClick = (song: song) => {
    if (!audioRef.current) return;

    if (selectSong?.id === song.id) {
      handleAudio();
    } else {
      setSelectSong(song);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 0);
    }
  };

  const handleVolume = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    setVolume(value);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen bg-background">
        <SidebarTrigger className="text-white bg-black fixed top-0" />
        <div className="max-w-screen-lg mx-auto">
          <div className="mx-2 text-white py-2 w-full overflow-y-auto bg-foreground min-h-screen">
            <SongList songs={songs} songState={{ value: selectSong, set: setSelectSong }} isPlaying={isPlaying} handleClick={handleClick} />
          </div>
          <div className={`mx-2 text-white fixed bottom-0 w-screen bg-background max-w-screen-lg py-2 ${selectSong ? "grid grid-cols-3" : "hidden"}`}>
            <Player selectSong={selectSong} handleAudio={handleAudio} isPlaying={isPlaying} duration={duration} currentTime={currentTime} handleSeek={handleSeek} handleVolume={handleVolume} volume={volume} />
          </div>
        </div>
      </main>
      <audio ref={audioRef} src={selectSong?.audio} />
    </SidebarProvider>
  );
};

export default Home;
