"use client";

import React, { useEffect, useRef, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { song } from "@/generated/prisma";
import SongList from "@/components/SongList";
import Player from "@/components/Player";

const Home = () => {
  const [songs, setSongs] = useState<song[]>([]);
  const [selectSong, setSelectSong] = useState<song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
    <div className="flex flex-row justify-center gap-10 h-screen">
      <div className="w-1/6">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
      <div className="w-5/6 flex flex-col h-full items-center bg-foreground max-w-screen-xl">
        <div className="text-white m-2 w-full h-5/6 p-6 overflow-y-auto">
          <SongList songs={songs} songState={{ value: selectSong, set: setSelectSong }} isPlaying={isPlaying} handleClick={handleClick} />
        </div>
        <div className={`text-white mt-2 bg-background w-full h-1/6 ${selectSong ? "grid grid-cols-3" : "hidden"}`}>
          <Player selectSong={selectSong} handleAudio={handleAudio} isPlaying={isPlaying} duration={duration} currentTime={currentTime} handleSeek={handleSeek} />
        </div>
      </div>
      <audio ref={audioRef} src={selectSong?.audio} />
    </div>
  );
};

export default Home;
