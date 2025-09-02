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
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [selectSong]);

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

  return (
    <div className="flex flex-row justify-center gap-10 h-screen">
      <div className="w-1/6">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
      <div className="w-5/6 flex flex-col h-full items-center bg-foreground max-w-screen-xl">
        <div className="text-white m-2 w-full h-5/6 p-6 overflow-y-auto">
          <SongList songs={songs} selectSong={setSelectSong} isPlaying={isPlaying} />
        </div>
        <div className={`text-white mt-2 bg-background w-full h-1/6 ${selectSong ? "grid grid-cols-3" : "hidden"}`}>
          <Player selectSong={selectSong} handleAudio={handleAudio} isPlaying={isPlaying} />
        </div>
      </div>
      <audio ref={audioRef} src="https://tqoqayi8vh.ufs.sh/f/byHVJUMzAjzLUmmiU72A5KhTaCJmvFE71UVSQHswNPWefd4n" />
    </div>
  );
};

export default Home;
