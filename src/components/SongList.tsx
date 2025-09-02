import Image from "next/image";
import React, { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";
import { Pause, Play } from "lucide-react";
import { song } from "@/generated/prisma";
import Ph from "@/images/placeholder.png";

type headerProps = {
  songs: song[];
  selectSong: Dispatch<SetStateAction<song | null>>;
  isPlaying: any;
}

const SongList = ({ songs, selectSong, isPlaying }: headerProps) => {
  return (
    <div className="grid grid-cols-6">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex flex-col items-center mb-2">
            <div className=" h-36 w-36">
              <Image
                src={Ph}
                alt="thumbnail"
                className="rounded-xs"
                priority
              />
              <div className="flex flex-row justify-between items-end">
                <div className="flex flex-col">
                  <span className="font-normal text-sm line-clamp-1" title={song.title}>{song.title}</span>
                  <span className="font-light text-xs line-clamp-1">{song.artist}</span>
                </div>
                <button onClick={() => selectSong(song)} className="bg-green-500 rounded-full p-1 cursor-pointer text-black">
                  {isPlaying ? <Pause size={14} fill="true" /> : <Play size={14} fill="true" />}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SongList;